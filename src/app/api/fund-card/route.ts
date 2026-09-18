import { NextRequest, NextResponse } from "next/server";
import {
  fundCard,
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
    const { cardId, amount } = body ?? {};

    if (!cardId || typeof cardId !== "string") {
      return NextResponse.json(
        { error: "A valid 'cardId' string is required." },
        { status: 400 }
      );
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { error: "'amount' must be a positive number." },
        { status: 400 }
      );
    }

    const result = fundCard(cardId, numericAmount);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 404 }
      );
    }

    const allCards = getAllCards();

    const response = NextResponse.json({
      message: `Card funded successfully with $${numericAmount.toFixed(2)}.`,
      cardId,
      previousBalance: result.previousBalance,
      newBalance: result.newBalance,
      card: result.card,
    });

    // Update cookie so updated balance persists across all lambdas
    response.cookies.set(COOKIE_NAME, serializeCards(allCards), {
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
