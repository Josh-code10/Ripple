export interface Transaction {
  id: string;
  type?: "purchase" | "topup";
  amount: number;
  merchant: string;
  timestamp: string;
  status: "approved" | "unusual";
}

export interface VirtualCard {
  id: string;
  label: string;
  maskedCardNumber: string;
  last4: string;
  expiry: string;
  brand: "Visa";
  balance: number;
  currency: "USD";
  status: "active" | "frozen";
  createdAt: string;
  transactions: Transaction[];
}

export const COOKIE_NAME = "ripple_cards_session";

// Deterministic seed cards present across all serverless instances
export const DEFAULT_CARDS: VirtualCard[] = [
  {
    id: "card_marketing_demo",
    label: "Marketing Campaigns",
    maskedCardNumber: "4242 •••• •••• 4242",
    last4: "4242",
    expiry: "12/29",
    brand: "Visa",
    balance: 1200,
    currency: "USD",
    status: "active",
    createdAt: "2026-09-01T00:00:00.000Z",
    transactions: [],
  },
  {
    id: "card_operations_demo",
    label: "Cloud & SaaS Tooling",
    maskedCardNumber: "4242 •••• •••• 8821",
    last4: "8821",
    expiry: "08/28",
    brand: "Visa",
    balance: 2450,
    currency: "USD",
    status: "active",
    createdAt: "2026-09-05T00:00:00.000Z",
    transactions: [],
  },
];

declare global {
  // eslint-disable-next-line no-var
  var __ripple_cards__: Map<string, VirtualCard> | undefined;
}

// Global in-memory map per serverless process
const cardsMap: Map<string, VirtualCard> =
  globalThis.__ripple_cards__ ?? new Map<string, VirtualCard>();
globalThis.__ripple_cards__ = cardsMap;

// Helper to reseed defaults if empty
function ensureSeedCards() {
  if (cardsMap.size === 0) {
    for (const card of DEFAULT_CARDS) {
      cardsMap.set(card.id, { ...card, transactions: [...card.transactions] });
    }
  }
}

// Initial seed
ensureSeedCards();

// Helper to generate a unique last-4 digit ending
function generateUniqueLast4(): string {
  const existingLast4s = new Set(Array.from(cardsMap.values()).map((c) => c.last4));
  let candidate = "";
  do {
    candidate = Math.floor(1000 + Math.random() * 9000).toString();
  } while (existingLast4s.has(candidate));
  return candidate;
}

/**
 * Compact serialization for cookie storage across ephemeral serverless lambdas
 */
export function serializeCards(cards: VirtualCard[]): string {
  try {
    const compact = cards.map((c) => ({
      id: c.id,
      label: c.label,
      maskedCardNumber: c.maskedCardNumber,
      last4: c.last4,
      expiry: c.expiry,
      brand: c.brand,
      balance: c.balance,
      currency: c.currency,
      status: c.status,
      createdAt: c.createdAt,
      // limit stored transactions to latest 5 to ensure cookie fits within 4KB
      transactions: (c.transactions || []).slice(-5),
    }));
    return Buffer.from(JSON.stringify(compact)).toString("base64");
  } catch {
    return "";
  }
}

/**
 * Safely deserialize cards from cookie value
 */
export function deserializeCards(cookieValue?: string): VirtualCard[] {
  if (!cookieValue) return [];
  try {
    const json = Buffer.from(cookieValue, "base64").toString("utf-8");
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => ({
        id: String(item.id || ""),
        label: String(item.label || "Virtual Card"),
        maskedCardNumber: String(item.maskedCardNumber || "4242 •••• •••• 4242"),
        last4: String(item.last4 || "4242"),
        expiry: String(item.expiry || "12/29"),
        brand: "Visa" as const,
        balance: Number(item.balance) || 0,
        currency: "USD" as const,
        status: (item.status === "frozen" ? "frozen" : "active") as "active" | "frozen",
        createdAt: String(item.createdAt || new Date().toISOString()),
        transactions: Array.isArray(item.transactions) ? item.transactions : [],
      })).filter((c) => Boolean(c.id));
    }
  } catch {
    // Ignore parse errors and fallback
  }
  return [];
}

/**
 * Syncs incoming cookie state into memory so any serverless lambda has the user's latest cards
 */
export function syncCardsFromCookie(cookieValue?: string): void {
  ensureSeedCards();
  const cookieCards = deserializeCards(cookieValue);
  if (cookieCards.length > 0) {
    for (const card of cookieCards) {
      cardsMap.set(card.id, card);
    }
  }
}

/**
 * Graceful card retriever: If a card was generated in another lambda or session,
 * auto-instantiate/restore it so calls to fund or check transactions NEVER fail with a 404.
 */
export function getOrCreateCard(cardId: string, fallbackLabel?: string): VirtualCard {
  ensureSeedCards();

  const existing = cardsMap.get(cardId);
  if (existing) {
    return existing;
  }

  // Derive last4 from cardId or generate
  const cleanLast4 = cardId.replace(/[^0-9]/g, "").slice(-4) || "4242";
  const newCard: VirtualCard = {
    id: cardId,
    label: fallbackLabel || "Virtual Card",
    maskedCardNumber: `4242 •••• •••• ${cleanLast4}`,
    last4: cleanLast4,
    expiry: "12/29",
    brand: "Visa",
    balance: 1200,
    currency: "USD",
    status: "active",
    createdAt: new Date().toISOString(),
    transactions: [],
  };

  cardsMap.set(cardId, newCard);
  return newCard;
}

export function issueCard(label: string, startingBalance: number): VirtualCard {
  ensureSeedCards();
  const cardId = `card_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
  const last4 = generateUniqueLast4();
  const masked = `4242 •••• •••• ${last4}`;
  const safeBalance = Math.max(0, Number(startingBalance) || 0);

  const card: VirtualCard = {
    id: cardId,
    label: label.trim() || "Virtual Card",
    maskedCardNumber: masked,
    last4,
    expiry: "12/29",
    brand: "Visa",
    balance: Math.round(safeBalance * 100) / 100,
    currency: "USD",
    status: "active",
    createdAt: new Date().toISOString(),
    transactions: [],
  };

  cardsMap.set(cardId, card);
  return card;
}

export function fundCard(
  cardId: string,
  amount: number
): { success: boolean; card?: VirtualCard; error?: string; previousBalance?: number; newBalance?: number } {
  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return { success: false, error: "Funding amount must be a positive number." };
  }

  // Auto-recover card if running on a new serverless container
  const card = getOrCreateCard(cardId);

  const previousBalance = card.balance;
  card.balance = Math.round((card.balance + numericAmount) * 100) / 100;

  // Record funding event explicitly as a 'topup' transaction so it is NEVER
  // counted into the card's purchase spending history when computing average transaction.
  card.transactions.push({
    id: `topup_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 5)}`,
    type: "topup",
    amount: numericAmount,
    merchant: "Card Balance Top-Up",
    timestamp: new Date().toISOString(),
    status: "approved",
  });

  return {
    success: true,
    card,
    previousBalance,
    newBalance: card.balance,
  };
}

export function getAllCards(): VirtualCard[] {
  ensureSeedCards();
  return Array.from(cardsMap.values());
}

export function getCardById(cardId: string): VirtualCard | undefined {
  return cardsMap.get(cardId);
}

export function checkTransactionForCard(
  amount: number,
  cardId?: string,
  merchant?: string
): {
  cardId?: string;
  amount: number;
  averageTransaction: number | null;
  threshold: number | null;
  multiplier: number;
  decision: "approved" | "unusual";
  flagged: boolean;
  isFirstTransaction: boolean;
  priorTransactionCount: number;
  reason: string;
} {
  ensureSeedCards();
  const numericAmount = Number(amount);
  const card = cardId ? getOrCreateCard(cardId) : Array.from(cardsMap.values())[0];

  // Filter ONLY approved purchase transactions. Top-ups/funding are strictly excluded
  // from the spending baseline calculation.
  const approvedPurchases = card.transactions.filter(
    (tx) => tx.status === "approved" && tx.type !== "topup"
  );

  // SAFEGUARD 1: Zero-history cards (brand new or newly funded with zero prior purchases)
  if (approvedPurchases.length === 0) {
    // Check if the requested transaction exceeds available balance
    if (numericAmount > card.balance) {
      card.transactions.push({
        id: `tx_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 5)}`,
        type: "purchase",
        amount: numericAmount,
        merchant: merchant || "Online Merchant",
        timestamp: new Date().toISOString(),
        status: "unusual",
      });

      return {
        cardId: card.id,
        amount: numericAmount,
        averageTransaction: null,
        threshold: null,
        multiplier: 5,
        decision: "unusual",
        flagged: true,
        isFirstTransaction: true,
        priorTransactionCount: 0,
        reason: `Transaction amount ($${numericAmount.toFixed(2)}) exceeds available card balance ($${card.balance.toFixed(2)}). Card has no prior purchase history to establish baseline.`,
      };
    }

    // Auto-approve first purchase and establish initial baseline
    card.transactions.push({
      id: `tx_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 5)}`,
      type: "purchase",
      amount: numericAmount,
      merchant: merchant || "Online Merchant",
      timestamp: new Date().toISOString(),
      status: "approved",
    });

    card.balance = Math.round((card.balance - numericAmount) * 100) / 100;

    const initialAverage = numericAmount;
    const initialThreshold = Math.round(initialAverage * 5 * 100) / 100;

    return {
      cardId: card.id,
      amount: numericAmount,
      averageTransaction: initialAverage,
      threshold: initialThreshold,
      multiplier: 5,
      decision: "approved",
      flagged: false,
      isFirstTransaction: true,
      priorTransactionCount: 0,
      reason: `First purchase on this card ($${numericAmount.toFixed(2)}) auto-approved and establishes the baseline average. Future transactions > 5x ($${initialThreshold.toFixed(2)}) will trigger an anomaly flag.`,
    };
  }

  // SAFEGUARD 2 & 3: Integer-cents calculation to prevent floating-point boundary anomalies
  const totalSpendCents = approvedPurchases.reduce(
    (sum, tx) => sum + Math.round(tx.amount * 100),
    0
  );
  const count = approvedPurchases.length;
  const averageCents = Math.round(totalSpendCents / count);
  const realAverage = averageCents / 100;

  const thresholdCents = averageCents * 5;
  const threshold = thresholdCents / 100;

  const amountCents = Math.round(numericAmount * 100);
  const isOverThreshold = amountCents > thresholdCents;
  const isOverBalance = numericAmount > card.balance;
  const isUnusual = isOverThreshold || isOverBalance;

  let reason = "";
  if (isOverThreshold && isOverBalance) {
    reason = `Transaction amount ($${numericAmount.toFixed(2)}) exceeds both 5x the card's historical average ($${realAverage.toFixed(2)}, threshold: $${threshold.toFixed(2)}) and available balance ($${card.balance.toFixed(2)}).`;
  } else if (isOverThreshold) {
    reason = `Transaction amount ($${numericAmount.toFixed(2)}) exceeds 5x the card's historical average ($${realAverage.toFixed(2)}, threshold: $${threshold.toFixed(2)}) calculated from ${count} past purchase(s).`;
  } else if (isOverBalance) {
    reason = `Transaction amount ($${numericAmount.toFixed(2)}) exceeds available card balance ($${card.balance.toFixed(2)}).`;
  } else {
    reason = `Transaction amount ($${numericAmount.toFixed(2)}) is within 5x the card's historical average ($${realAverage.toFixed(2)}, threshold: $${threshold.toFixed(2)}) calculated from ${count} past purchase(s).`;
  }

  // Record this purchase attempt
  card.transactions.push({
    id: `tx_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 5)}`,
    type: "purchase",
    amount: numericAmount,
    merchant: merchant || "Online Merchant",
    timestamp: new Date().toISOString(),
    status: isUnusual ? "unusual" : "approved",
  });

  // Deduct from balance only if approved
  if (!isUnusual) {
    card.balance = Math.round((card.balance - numericAmount) * 100) / 100;
  }

  return {
    cardId: card.id,
    amount: numericAmount,
    averageTransaction: realAverage,
    threshold,
    multiplier: 5,
    decision: isUnusual ? ("unusual" as const) : ("approved" as const),
    flagged: isUnusual,
    isFirstTransaction: false,
    priorTransactionCount: count,
    reason,
  };
}
