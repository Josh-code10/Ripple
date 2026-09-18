import { NextRequest, NextResponse } from "next/server";
import {
  getAllCards,
  syncCardsFromCookie,
  serializeCards,
  COOKIE_NAME,
} from "@/lib/cardsStore";

export async function GET(request: NextRequest) {
  // Sync any session state from incoming request cookies
  const cookieValue = request.cookies.get(COOKIE_NAME)?.value;
  syncCardsFromCookie(cookieValue);

  const cards = getAllCards();

  const response = NextResponse.json({
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

  // Ensure cookie is refreshed for cross-lambda persistence
  response.cookies.set(COOKIE_NAME, serializeCards(cards), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
