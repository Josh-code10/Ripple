import { NextRequest, NextResponse } from "next/server";
import {
  checkTransactionForCard,
  getAllCards,
  syncCardsFromCookie,
  serializeCards,
  COOKIE_NAME,
} from "@/lib/cardsStore";

export async function POST(request: NextRequest) {
  try {
    const cookieValue = request.cookies.get(COOKIE_NAME)?.value;
    syncCardsFromCookie(cookieValue);

    const body = await request.json();
    const { amount, cardId, merchant } = body ?? {};

    if (amount === undefined || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "'amount' must be a positive number." },
        { status: 400 }
      );
    }

    const cards = getAllCards();
    const targetCardId = cardId || (cards.length > 0 ? cards[0].id : "card_marketing_demo");
    const result = checkTransactionForCard(Number(amount), targetCardId, merchant);

    const updatedCards = getAllCards();

    const response = NextResponse.json({
      status: "processed",
      ...result,
    });

    // Update cookie with latest transaction history & deducted balance
    response.cookies.set(COOKIE_NAME, serializeCards(updatedCards), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body." },
      { status: 400 }
    );
  }
}
