import { NextResponse } from "next/server";
import { issueCard } from "@/lib/cardsStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { label, startingBalance } = body ?? {};

    if (!label || typeof label !== "string" || label.trim().length === 0) {
      return NextResponse.json(
        { error: "A valid string 'label' is required (e.g. 'Marketing Ads')." },
        { status: 400 }
      );
    }

    const numericBalance = startingBalance !== undefined ? Number(startingBalance) : 0;
    if (isNaN(numericBalance) || numericBalance < 0) {
      return NextResponse.json(
        { error: "'startingBalance' must be a non-negative number." },
        { status: 400 }
      );
    }

    const newCard = issueCard(label.trim(), numericBalance);

    return NextResponse.json(
      {
        message: "Virtual card successfully issued.",
        card: {
          id: newCard.id,
          label: newCard.label,
          maskedCardNumber: newCard.maskedCardNumber,
          last4: newCard.last4,
          expiry: newCard.expiry,
          brand: newCard.brand,
          balance: newCard.balance,
          currency: newCard.currency,
          status: newCard.status,
          createdAt: newCard.createdAt,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body." },
      { status: 400 }
    );
  }
}
