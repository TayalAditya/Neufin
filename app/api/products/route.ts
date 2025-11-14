import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/data/mock-products";
import { productsResponseSchema } from "@/lib/validations/product";

// Mark route as dynamic to allow search params
export const dynamic = "force-dynamic";

/**
 * GET /api/products
 * Fetches paginated product list with optional search
 * Query params:
 * - page: number (default: 1)
 * - limit: number (default: 10, max: 50)
 * - q: string (search query, optional)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") || "10"))
    );
    const query = searchParams.get("q") || undefined;

    const { data, total } = getProducts(page, limit, query);

    // Validate response with Zod before sending
    const validatedResponse = productsResponseSchema.parse({
      page,
      limit,
      total,
      data,
    });

    return NextResponse.json(validatedResponse, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch products",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
