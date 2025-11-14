import { apiClient, ApiError } from "@/lib/api/client";

// Mock fetch
global.fetch = jest.fn();

describe("API Client", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("should fetch and validate products successfully", async () => {
      const mockResponse = {
        page: 1,
        limit: 10,
        total: 100,
        data: [
          {
            id: "prod-001",
            name: "Test Product",
            shortDescription: "",
            description: "A test product",
            price: 1999,
            currency: "INR",
            imageUrl: "https://example.com/image.jpg",
            rating: 4.5,
            inStock: true,
            attributes: {},
          },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await apiClient.getProducts({ page: 1, limit: 10 });

      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/products?page=1&limit=10",
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        })
      );
    });

    it("should throw ApiError on invalid response schema", async () => {
      const invalidResponse = {
        page: 1,
        limit: 10,
        total: 100,
        data: [
          {
            id: "prod-001",
            // Missing required fields
            price: -100, // Invalid price
          },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      });

      await expect(
        apiClient.getProducts({ page: 1, limit: 10 })
      ).rejects.toThrow(ApiError);
    });

    it("should handle network errors", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new TypeError("Network error")
      );

      await expect(
        apiClient.getProducts({ page: 1, limit: 10 })
      ).rejects.toThrow(ApiError);
    });

    it("should handle API error responses", async () => {
      const errorResponse = {
        message: "Server error",
        code: "INTERNAL_ERROR",
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => errorResponse,
      });

      await expect(
        apiClient.getProducts({ page: 1, limit: 10 })
      ).rejects.toThrow(ApiError);
    });
  });

  describe("getProductById", () => {
    it("should fetch and validate a single product", async () => {
      const mockProduct = {
        id: "prod-001",
        name: "Test Product",
        shortDescription: "",
        description: "A test product",
        price: 1999,
        currency: "INR",
        imageUrl: "https://example.com/image.jpg",
        rating: 4.5,
        inStock: true,
        attributes: {},
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      });

      const result = await apiClient.getProductById("prod-001");

      expect(result).toEqual(mockProduct);
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/products/prod-001",
        expect.any(Object)
      );
    });

    it("should throw ApiError for 404 responses", async () => {
      const errorResponse = {
        message: "Product not found",
        code: "NOT_FOUND",
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => errorResponse,
      });

      await expect(apiClient.getProductById("invalid-id")).rejects.toThrow(
        ApiError
      );
    });
  });
});
