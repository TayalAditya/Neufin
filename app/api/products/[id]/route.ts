import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/data/mock-products";
import { productDetailResponseSchema } from "@/lib/validations/product";

// Mark route as dynamic
export const dynamic = "force-dynamic";

/**
 * GET /api/products/[id]
 * Fetches a single product by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = getProductById(id);

    if (!product) {
      return NextResponse.json(
        {
          message: `Product with ID "${id}" not found`,
          code: "NOT_FOUND",
        },
        { status: 404 }
      );
    }

    // Validate response with Zod before sending
    const validatedProduct = productDetailResponseSchema.parse(product);

    return NextResponse.json(validatedProduct, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
      },
    });
  } catch (error) {
    console.error(`Error fetching product:`, error);

    return NextResponse.json(
      {
        message: "Failed to fetch product details",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
