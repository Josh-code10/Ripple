import { NextResponse } from "next/server";
import { getAllCards } from "@/lib/cardsStore";

export async function GET() {
  const cards = getAllCards();

  return NextResponse.json({
    count: cards.length,
    cards: cards.map((card) => ({
      id: card.id,
      label: card.label,
      maskedCardNumber: card.maskedCardNumber,
      last4: card.last4,
      balance: card.balance,
      currency: card.currency,
      status: card.status,
      expiry: card.expiry,
      createdAt: card.createdAt,
      transactionCount: card.transactions.length,
    })),
  });
}
