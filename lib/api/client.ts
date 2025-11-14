import { z } from "zod";
import {
  productsResponseSchema,
  productDetailResponseSchema,
  errorResponseSchema,
  type ProductsResponse,
  type Product,
} from "@/lib/validations/product";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Base API client with validation
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic fetch with validation
   */
  private async fetchWithValidation<T>(
    url: string,
    schema: z.ZodSchema<T>,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      const data = await response.json();

      // Handle error responses
      if (!response.ok) {
        const errorResult = errorResponseSchema.safeParse(data);
        if (errorResult.success) {
          throw new ApiError(
            response.status,
            errorResult.data.code || "UNKNOWN_ERROR",
            errorResult.data.message
          );
        }
        throw new ApiError(
          response.status,
          "UNKNOWN_ERROR",
          "An unexpected error occurred"
        );
      }

      // Validate successful response with schema
      const validationResult = schema.safeParse(data);

      if (!validationResult.success) {
        console.error("API validation error:", validationResult.error);
        throw new ApiError(
          500,
          "VALIDATION_ERROR",
          "Invalid response from server. The data does not match expected format."
        );
      }

      return validationResult.data;
    } catch (error) {
      // Re-throw ApiErrors
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle network errors
      if (error instanceof TypeError) {
        throw new ApiError(
          0,
          "NETWORK_ERROR",
          "Network error. Please check your connection."
        );
      }

      // Handle other errors
      console.error("Unexpected API error:", error);
      throw new ApiError(
        500,
        "UNKNOWN_ERROR",
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  }

  /**
   * Fetch products with pagination and search
   */
  async getProducts(params: {
    page?: number;
    limit?: number;
    q?: string;
  }): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", params.page.toString());
    if (params.limit) searchParams.set("limit", params.limit.toString());
    if (params.q && params.q.trim()) searchParams.set("q", params.q.trim());

    const url = `${this.baseUrl}/products?${searchParams.toString()}`;
    const result = await this.fetchWithValidation(url, productsResponseSchema) as ProductsResponse;
    return result;
  }

  /**
   * Fetch a single product by ID
   */
  async getProductById(id: string): Promise<Product> {
    const url = `${this.baseUrl}/products/${id}`;
    return this.fetchWithValidation(url, productDetailResponseSchema) as Promise<Product>;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
