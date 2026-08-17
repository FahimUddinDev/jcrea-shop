import { products } from "@/lib/mock-data";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/products
 *
 * Query params (all optional — for exercising the UI's loading /
 * error / empty states during development):
 *   ?delay=1500   -> wait N ms before responding (test skeleton loaders)
 *   ?error=1      -> respond with a 500 error (test error + Retry UI)
 *   ?empty=1      -> respond with an empty array (test empty state UI)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const delay = Number(searchParams.get("delay") ?? 0);
  const forceError = searchParams.get("error") === "1";
  const forceEmpty = searchParams.get("empty") === "1";

  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  if (forceError) {
    return NextResponse.json(
      { message: "Failed to fetch products. Please try again." },
      { status: 500 },
    );
  }

  if (forceEmpty) {
    return NextResponse.json({ products: [] }, { status: 200 });
  }

  return NextResponse.json({ products }, { status: 200 });
}
