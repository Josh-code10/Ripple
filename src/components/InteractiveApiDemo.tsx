"use client";

import { useState, useEffect } from "react";

interface VirtualCardItem {
  id: string;
  label: string;
  maskedCardNumber: string;
  last4: string;
  balance: number;
  currency: string;
  status: string;
  expiry: string;
  transactionCount?: number;
}

interface FraudCheckData {
  cardId?: string;
  amount: number;
  averageTransaction: number | null;
  threshold: number | null;
  multiplier: number;
  decision: "approved" | "unusual";
  flagged: boolean;
  reason: string;
  isFirstTransaction?: boolean;
}

const INITIAL_DEMO_CARDS: VirtualCardItem[] = [
  {
    id: "card_marketing_demo",
    label: "Marketing Campaigns",
    maskedCardNumber: "4242 •••• •••• 4242",
    last4: "4242",
    balance: 1200,
    currency: "USD",
    status: "active",
    expiry: "12/29",
  },
  {
    id: "card_operations_demo",
    label: "Cloud & SaaS Tooling",
    maskedCardNumber: "4242 •••• •••• 8821",
    last4: "8821",
    balance: 2450,
    currency: "USD",
    status: "active",
    expiry: "08/28",
  },
];

export default function InteractiveApiDemo() {
  const [cards, setCards] = useState<VirtualCardItem[]>(INITIAL_DEMO_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string>("card_marketing_demo");
  const [activeTab, setActiveTab] = useState<"issue" | "fund" | "fraud">("issue");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form states
  const [issueLabel, setIssueLabel] = useState("Marketing Campaigns");
  const [issueBalance, setIssueBalance] = useState("1200");
  const [fundAmount, setFundAmount] = useState("350");
  const [testAmount, setTestAmount] = useState("75");
  const [testMerchant, setTestMerchant] = useState("Google Ads");

  // Output states
  const [fraudResult, setFraudResult] = useState<FraudCheckData | null>(null);
  const [messageBanner, setMessageBanner] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load cards on mount
  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    try {
      const res = await fetch("/api/cards");
      const data = await res.json();
      if (data.cards && Array.isArray(data.cards) && data.cards.length > 0) {
        setCards(data.cards);
        setSelectedCardId((currentId) => {
          const exists = data.cards.some((c: VirtualCardItem) => c.id === currentId);
          return exists ? currentId : data.cards[0].id;
        });
      }
    } catch {
      // silently fallback
    }
  }

  async function handleIssueCard(e: React.FormEvent) {
    e.preventDefault();
    if (!issueLabel.trim()) return;
    setIsLoading(true);
    setMessageBanner(null);

    try {
      const res = await fetch("/api/issue-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: issueLabel.trim(),
          startingBalance: Number(issueBalance) || 0,
        }),
      });

      const data = await res.json();

      if (res.ok && data.card) {
        setCards((prev) => [data.card, ...prev]);
        setSelectedCardId(data.card.id);
        setMessageBanner({
          type: "success",
          text: `Virtual card '${data.card.label}' successfully issued with $${data.card.balance.toFixed(2)} balance!`,
        });
      } else {
        setMessageBanner({ type: "error", text: data.error || "Failed to issue card." });
      }
    } catch {
      setMessageBanner({ type: "error", text: "Network request failed." });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFundCard(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCardId) {
      setMessageBanner({ type: "error", text: "Please select or issue a virtual card first." });
      return;
    }

    const numAmount = Number(fundAmount);
    if (!numAmount || numAmount <= 0) {
      setMessageBanner({ type: "error", text: "Please enter a valid funding amount." });
      return;
    }

    setIsLoading(true);
    setMessageBanner(null);

    try {
      const res = await fetch("/api/fund-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: selectedCardId, amount: numAmount }),
      });

      const data = await res.json();

      if (res.ok) {
        setCards((prev) =>
          prev.map((c) => (c.id === selectedCardId ? { ...c, balance: data.newBalance } : c))
        );
        setMessageBanner({
          type: "success",
          text: `Added $${numAmount.toFixed(2)} to card. New balance: $${data.newBalance.toFixed(2)}.`,
        });
      } else {
        setMessageBanner({ type: "error", text: data.error || "Failed to fund card." });
      }
    } catch {
      setMessageBanner({ type: "error", text: "Network request failed." });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCheckTransaction(e?: React.FormEvent, customAmount?: number) {
    if (e) e.preventDefault();
    const amountToCheck = customAmount !== undefined ? customAmount : Number(testAmount);

    if (!amountToCheck || amountToCheck <= 0) {
      setMessageBanner({ type: "error", text: "Please enter a valid transaction amount." });
      return;
    }

    setIsLoading(true);
    setMessageBanner(null);
    setFraudResult(null);

    try {
      const res = await fetch("/api/check-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId: selectedCardId || (cards.length > 0 ? cards[0].id : undefined),
          amount: amountToCheck,
          merchant: testMerchant,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setFraudResult(data);
        // refresh cards to reflect any balance deductions
        fetchCards();
      } else {
        setMessageBanner({ type: "error", text: data.error || "Transaction check failed." });
      }
    } catch {
      setMessageBanner({ type: "error", text: "Network request failed." });
    } finally {
      setIsLoading(false);
    }
  }

  const selectedCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  return (
    <div className="w-full">
      {/* Feedback Banner */}
      {messageBanner && (
        <div
          className={`mb-6 rounded-2xl p-4 text-sm font-medium transition-all ${
            messageBanner.type === "success"
              ? "bg-[#e2fbe8] text-[#0b8043] border border-[#25ce7b]/40"
              : "bg-[#ffe4db] text-[#ff6608] border border-[#ff8058]/40"
          }`}
        >
          {messageBanner.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Controls & Interactive Tabs (7 cols) */}
        <div className="lg:col-span-7 rounded-[24px] border border-[#d8dce2] bg-white p-6 sm:p-8 shadow-sm">
          {/* Sub-Header Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-[#f8f8f9] border border-[#e6ecf2] mb-8">
            <button
              type="button"
              onClick={() => setActiveTab("issue")}
              className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === "issue"
                  ? "bg-[#002444] text-white shadow-sm"
                  : "text-[#1b507e] hover:text-[#002444]"
              }`}
            >
              1. Issue Card
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("fund")}
              className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === "fund"
                  ? "bg-[#002444] text-white shadow-sm"
                  : "text-[#1b507e] hover:text-[#002444]"
              }`}
            >
              2. Fund Balance
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("fraud")}
              className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === "fraud"
                  ? "bg-[#002444] text-white shadow-sm"
                  : "text-[#1b507e] hover:text-[#002444]"
              }`}
            >
              3. Test Fraud Check
            </button>
          </div>

          {/* TAB 1: Issue Card */}
          {activeTab === "issue" && (
            <form onSubmit={handleIssueCard} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002444] mb-2">
                  Card Label / Purpose
                </label>
                <input
                  type="text"
                  value={issueLabel}
                  onChange={(e) => setIssueLabel(e.target.value)}
                  placeholder="e.g. Marketing Ads, AWS Cloud, Dev Team"
                  className="w-full rounded-xl border border-[#d8dce2] bg-[#f8f8f9] px-4 py-3 text-sm font-medium text-[#002444] outline-none transition-colors focus:border-[#30C0CF] focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002444] mb-2">
                  Starting Balance (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-sm font-bold text-[#1b507e]">$</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={issueBalance}
                    onChange={(e) => setIssueBalance(e.target.value)}
                    className="w-full rounded-xl border border-[#d8dce2] bg-[#f8f8f9] pl-8 pr-4 py-3 text-sm font-medium text-[#002444] outline-none transition-colors focus:border-[#30C0CF] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center rounded-full bg-[#002444] py-3.5 px-6 text-sm font-bold text-white shadow-md shadow-[#002444]/15 transition-all hover:bg-[#7580ef] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isLoading ? "Issuing..." : "Issue Virtual Card"}
                </button>
              </div>

              <p className="text-xs text-[#1b507e] leading-relaxed">
                Generates a simulated Visa virtual card with a unique card number and clean transaction history.
              </p>
            </form>
          )}

          {/* TAB 2: Fund Card */}
          {activeTab === "fund" && (
            <form onSubmit={handleFundCard} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002444] mb-2">
                  Select Card to Top Up
                </label>
                {cards.length === 0 ? (
                  <p className="text-sm text-[#ff8058] p-3 rounded-xl bg-[#ffe4db]">
                    No virtual cards issued yet. Please issue a card in Step 1 first!
                  </p>
                ) : (
                  <select
                    value={selectedCardId}
                    onChange={(e) => setSelectedCardId(e.target.value)}
                    className="w-full rounded-xl border border-[#d8dce2] bg-[#f8f8f9] px-4 py-3 text-sm font-medium text-[#002444] outline-none transition-colors focus:border-[#30C0CF] focus:bg-white"
                  >
                    {cards.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label} ({c.maskedCardNumber}) — Balance: ${c.balance.toFixed(2)}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002444] mb-2">
                  Funding Amount ($)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-sm font-bold text-[#1b507e]">$</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    className="w-full rounded-xl border border-[#d8dce2] bg-[#f8f8f9] pl-8 pr-4 py-3 text-sm font-medium text-[#002444] outline-none transition-colors focus:border-[#30C0CF] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading || cards.length === 0}
                  className="w-full inline-flex items-center justify-center rounded-full bg-[#002444] py-3.5 px-6 text-sm font-bold text-white shadow-md shadow-[#002444]/15 transition-all hover:bg-[#7580ef] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "Add Funds to Card"}
                </button>
              </div>

              <p className="text-xs text-[#1b507e] leading-relaxed">
                Dynamically replenishes the chosen card&apos;s balance in real time.
              </p>
            </form>
          )}

          {/* TAB 3: Test Fraud Check */}
          {activeTab === "fraud" && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002444] mb-2">
                  Target Card for Authorization
                </label>
                {cards.length === 0 ? (
                  <p className="text-sm text-[#ff8058] p-3 rounded-xl bg-[#ffe4db]">
                    No virtual cards issued yet. Please issue a card in Step 1 first!
                  </p>
                ) : (
                  <select
                    value={selectedCardId}
                    onChange={(e) => setSelectedCardId(e.target.value)}
                    className="w-full rounded-xl border border-[#d8dce2] bg-[#f8f8f9] px-4 py-3 text-sm font-medium text-[#002444] outline-none transition-colors focus:border-[#30C0CF] focus:bg-white"
                  >
                    {cards.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label} ({c.maskedCardNumber}) — Balance: ${c.balance.toFixed(2)}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#002444] mb-2">
                    Merchant Name
                  </label>
                  <input
                    type="text"
                    value={testMerchant}
                    onChange={(e) => setTestMerchant(e.target.value)}
                    placeholder="e.g. AWS, Meta, Stripe"
                    className="w-full rounded-xl border border-[#d8dce2] bg-[#f8f8f9] px-4 py-3 text-sm font-medium text-[#002444] outline-none transition-colors focus:border-[#30C0CF] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#002444] mb-2">
                    Transaction Amount ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-sm font-bold text-[#1b507e]">$</span>
                    <input
                      type="number"
                      min="1"
                      value={testAmount}
                      onChange={(e) => setTestAmount(e.target.value)}
                      className="w-full rounded-xl border border-[#d8dce2] bg-[#f8f8f9] pl-8 pr-4 py-3 text-sm font-medium text-[#002444] outline-none transition-colors focus:border-[#30C0CF] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Preset Buttons for Evaluator Testing */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="text-xs text-[#1b507e] font-semibold">Test Presets:</span>
                <button
                  type="button"
                  onClick={() => {
                    setTestAmount("65");
                    handleCheckTransaction(undefined, 65);
                  }}
                  className="rounded-full bg-[#e2fbe8] border border-[#25ce7b]/30 px-3.5 py-1 text-xs font-bold text-[#0b8043] transition-all hover:scale-105"
                >
                  ✓ Normal Charge ($65)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTestAmount("1500");
                    handleCheckTransaction(undefined, 1500);
                  }}
                  className="rounded-full bg-[#ffe4db] border border-[#ff8058]/30 px-3.5 py-1 text-xs font-bold text-[#ff6608] transition-all hover:scale-105"
                >
                  ⚠ Large Charge ($1,500)
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleCheckTransaction()}
                  disabled={isLoading || cards.length === 0}
                  className="w-full inline-flex items-center justify-center rounded-full bg-[#002444] py-3.5 px-6 text-sm font-bold text-white shadow-md shadow-[#002444]/15 transition-all hover:bg-[#7580ef] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isLoading ? "Analyzing..." : "Submit Transaction for Verification"}
                </button>
              </div>

              {/* Fraud Check Result Display */}
              {fraudResult && (
                <div
                  className={`mt-4 rounded-2xl p-5 border transition-all ${
                    fraudResult.flagged
                      ? "bg-[#fff2ee] border-[#ff8058]/60 text-[#002444]"
                      : fraudResult.isFirstTransaction
                      ? "bg-[#eef8ff] border-[#30c0cf]/60 text-[#002444]"
                      : "bg-[#f2fdf5] border-[#25ce7b]/60 text-[#002444]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        fraudResult.flagged
                          ? "bg-[#ff8058] text-white"
                          : fraudResult.isFirstTransaction
                          ? "bg-[#30c0cf] text-[#002444]"
                          : "bg-[#25ce7b] text-[#002444]"
                      }`}
                    >
                      {fraudResult.flagged
                        ? "⚠ Flagged: Unusual Transaction"
                        : fraudResult.isFirstTransaction
                        ? "✓ First Transaction (Baseline Established)"
                        : "✓ Decision: Approved"}
                    </span>
                    <span className="text-xs font-bold text-[#1b507e]">
                      {fraudResult.isFirstTransaction ? "No Prior History" : "Rule: > 5x Card Average"}
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-semibold text-[#002444]">
                    {fraudResult.reason}
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-black/10 text-xs">
                    <div>
                      <span className="text-[#1b507e] block">Charge</span>
                      <span className="font-bold text-[#002444]">${fraudResult.amount.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-[#1b507e] block">Card Average</span>
                      <span className="font-bold text-[#002444]">
                        {fraudResult.averageTransaction !== null
                          ? `$${fraudResult.averageTransaction.toFixed(2)}`
                          : "— (Baseline)"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#1b507e] block">5x Threshold</span>
                      <span className="font-bold text-[#002444]">
                        {fraudResult.threshold !== null
                          ? `$${fraudResult.threshold.toFixed(2)}`
                          : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Virtual Card Render & Real-time Ledger (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Cardtonic-Style Physical Virtual Card Graphic */}
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#002444] via-[#012646] to-[#00172e] p-7 text-white shadow-xl shadow-[#002444]/25 border border-[#30c0cf]/30">
            {/* Background shimmer rings */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#30C0CF]/15 blur-2xl" />
            <div className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-[#7580ef]/15 blur-2xl" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#30C0CF]">
                Ripple Business Card
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#25CE7B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25CE7B]" />
                {selectedCard?.status || "Active"}
              </span>
            </div>

            {/* Chip Graphic */}
            <div className="relative z-10 mt-6 flex items-center gap-3">
              <div className="h-8 w-11 rounded-md bg-gradient-to-tr from-[#e0fdff] to-[#30C0CF] shadow-inner opacity-90 border border-white/40" />
              <svg className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0" />
              </svg>
            </div>

            {/* Masked PAN */}
            <div className="relative z-10 mt-6">
              <p className="font-mono text-lg sm:text-xl font-medium tracking-[0.2em] text-white">
                {selectedCard?.maskedCardNumber || "4242 •••• •••• 2671"}
              </p>
            </div>

            {/* Balance & Expiry */}
            <div className="relative z-10 mt-6 flex items-end justify-between pt-4 border-t border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-300 block">
                  {selectedCard?.label || "Marketing Campaigns"}
                </span>
                <span className="text-xl font-extrabold text-white">
                  ${(selectedCard?.balance ?? 1200).toFixed(2)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-300 block">Expires</span>
                <span className="font-mono text-xs font-semibold text-white">
                  {selectedCard?.expiry || "12/29"}
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Ledger Cards Counter */}
          <div className="rounded-[22px] border border-[#d8dce2] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#002444]">
                Issued Cards in Memory ({cards.length})
              </h4>
              <button
                type="button"
                onClick={fetchCards}
                className="text-xs font-semibold text-[#00838f] hover:underline"
              >
                Refresh
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
              {cards.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#f8f8f9] border border-[#e6ecf2] text-center">
                  <p className="text-xs text-[#1b507e]">No cards issued yet in this session.</p>
                  <p className="text-[11px] text-slate-400 mt-1">Use Tab 1 to create your first virtual card.</p>
                </div>
              ) : (
                cards.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCardId(c.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                      c.id === selectedCardId
                        ? "border-[#30C0CF] bg-[#e0fdff]/30 shadow-sm ring-1 ring-[#30C0CF]/50"
                        : "border-[#d8dce2] hover:bg-[#f8f8f9]"
                    }`}
                  >
                    <div>
                      <span className="font-bold text-[#002444] block text-sm">{c.label}</span>
                      <span className="text-[#1b507e] font-mono text-[11px]">{c.maskedCardNumber}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-[#002444] text-sm block">
                        ${c.balance.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400">USD</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
