import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    app: "Ripple",
    status: "operational",
    version: "0.1.0",
    timestamp: new Date().toISOString(),
    message: "Ripple backend API is running smoothly.",
  });
}
