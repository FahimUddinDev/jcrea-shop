import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Unauthorized. Please log in to checkout." },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const forceFail = body?.forceFail === true;

  //  API delay 1500ms
  await new Promise((resolve) => setTimeout(resolve, 1500));

  //  15% random failure rate or explicit forceFail for testing
  const failed = forceFail || Math.random() < 0.15;

  if (failed) {
    return NextResponse.json(
      { message: "Checkout failed. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message: "Order placed successfully.",
      orderId: `ORD-${Date.now()}`,
    },
    { status: 200 },
  );
}
