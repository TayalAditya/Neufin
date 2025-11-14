import { z } from "zod";

/**
 * Product schema with runtime validation
 * This ensures all API responses are validated and type-safe
 */
export const productSchema = z
  .object({
    id: z.string().min(1, "Product ID is required"),
    name: z.string().min(1, "Product name is required"),
    shortDescription: z.string().optional(),
    description: z.string().min(1, "Product description is required"),
    price: z.number().positive("Price must be positive"),
    currency: z.string().optional(),
    imageUrl: z.string().url("Invalid image URL"),
    category: z.string().optional(),
    rating: z.number().min(0).max(5).optional(),
    inStock: z.boolean().optional(),
    attributes: z.record(z.string(), z.any()).optional(),
  })
  .transform((data) => ({
    ...data,
    shortDescription: data.shortDescription ?? "",
    currency: data.currency ?? "INR",
    rating: data.rating ?? 0,
    inStock: data.inStock ?? true,
    attributes: data.attributes ?? {},
  }));

/**
 * Product list API response schema
 */
export const productsResponseSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  data: z.array(productSchema),
});

/**
 * Single product API response schema (for detail view)
 */
export const productDetailResponseSchema = productSchema;

/**
 * API error response schema
 */
export const errorResponseSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
  details: z.any().optional(),
});

// Type exports from schemas
export type Product = z.infer<typeof productSchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
export type ProductDetailResponse = z.infer<typeof productDetailResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
