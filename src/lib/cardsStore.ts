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

declare global {
  // eslint-disable-next-line no-var
  var __ripple_cards__: Map<string, VirtualCard> | undefined;
}

// Preserve cards in memory across Next.js module reloads
const cardsMap: Map<string, VirtualCard> =
  globalThis.__ripple_cards__ ?? new Map<string, VirtualCard>();
globalThis.__ripple_cards__ = cardsMap;

// Helper to generate a unique last-4 digit ending for each card
function generateUniqueLast4(): string {
  const existingLast4s = new Set(Array.from(cardsMap.values()).map((c) => c.last4));
  let candidate = "";
  do {
    candidate = Math.floor(1000 + Math.random() * 9000).toString();
  } while (existingLast4s.has(candidate));
  return candidate;
}

export function issueCard(label: string, startingBalance: number): VirtualCard {
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

// Initialize default demonstration card if store is empty
if (cardsMap.size === 0) {
  issueCard("Marketing Campaigns", 1200);
}

export function fundCard(
  cardId: string,
  amount: number
): { success: boolean; card?: VirtualCard; error?: string; previousBalance?: number; newBalance?: number } {
  const card = cardsMap.get(cardId);
  if (!card) {
    return { success: false, error: `Card with ID '${cardId}' not found.` };
  }

  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return { success: false, error: "Funding amount must be a positive number." };
  }

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
  const numericAmount = Number(amount);
  const card = cardId ? cardsMap.get(cardId) : Array.from(cardsMap.values())[0];

  if (!card) {
    return {
      cardId: undefined,
      amount: numericAmount,
      averageTransaction: null,
      threshold: null,
      multiplier: 5,
      decision: "unusual",
      flagged: true,
      isFirstTransaction: false,
      priorTransactionCount: 0,
      reason: "No card found for this transaction check. Please issue a card first.",
    };
  }

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
