import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

interface UseProductsParams {
  page?: number;
  limit?: number;
  search?: string;
}

/**
 * Hook to fetch products with pagination and search
 * Uses Tanstack Query for caching and state management
 */
export function useProducts({
  page = 1,
  limit = 12,
  search,
}: UseProductsParams = {}) {
  return useQuery({
    queryKey: ["products", { page, limit, search: search || "" }],
    queryFn: () =>
      apiClient.getProducts({
        page,
        limit,
        q: search,
      }),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

/**
 * Hook to fetch a single product by ID
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => apiClient.getProductById(id),
    enabled: !!id, // Only run if ID exists
  });
}
