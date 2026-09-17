import { NextResponse } from "next/server";
import { checkTransactionForCard, getAllCards } from "@/lib/cardsStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, cardId, merchant } = body ?? {};

    if (amount === undefined || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "'amount' must be a positive number." },
        { status: 400 }
      );
    }

    const cards = getAllCards();
    if (cards.length === 0) {
      return NextResponse.json(
        {
          error: "No virtual cards found in memory. Please issue a card first via POST /api/issue-card.",
        },
        { status: 400 }
      );
    }

    const targetCardId = cardId || cards[0].id;
    const result = checkTransactionForCard(Number(amount), targetCardId, merchant);

    return NextResponse.json({
      status: "processed",
      ...result,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body." },
      { status: 400 }
    );
  }
}
