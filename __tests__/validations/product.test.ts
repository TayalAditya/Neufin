import {
  productSchema,
  productsResponseSchema,
  errorResponseSchema,
} from "@/lib/validations/product";

describe("Product Validation Schemas", () => {
  describe("productSchema", () => {
    it("should validate a valid product", () => {
      const validProduct = {
        id: "prod-001",
        name: "Test Product",
        shortDescription: "A short description",
        description: "A test product description",
        price: 1999.99,
        currency: "INR",
        imageUrl: "https://example.com/image.jpg",
        category: "Electronics",
        rating: 4.5,
        inStock: true,
        attributes: { color: "red", size: "M" },
      };

      const result = productSchema.safeParse(validProduct);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validProduct);
      }
    });

    it("should reject product with invalid price", () => {
      const invalidProduct = {
        id: "prod-001",
        name: "Test Product",
        description: "A test product",
        price: -100, // Invalid: negative price
        currency: "INR",
        imageUrl: "https://example.com/image.jpg",
      };

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });

    it("should reject product with invalid image URL", () => {
      const invalidProduct = {
        id: "prod-001",
        name: "Test Product",
        description: "A test product",
        price: 100,
        currency: "INR",
        imageUrl: "not-a-valid-url", // Invalid URL
      };

      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });

    it("should apply default values for optional fields", () => {
      const minimalProduct = {
        id: "prod-001",
        name: "Test Product",
        description: "A test product",
        price: 100,
        imageUrl: "https://example.com/image.jpg",
      };

      const result = productSchema.safeParse(minimalProduct);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.currency).toBe("INR");
        expect(result.data.rating).toBe(0);
        expect(result.data.inStock).toBe(true);
        expect(result.data.attributes).toEqual({});
        expect(result.data.shortDescription).toBe("");
      }
    });
  });

  describe("productsResponseSchema", () => {
    it("should validate a valid products response", () => {
      const validResponse = {
        page: 1,
        limit: 10,
        total: 100,
        data: [
          {
            id: "prod-001",
            name: "Product 1",
            description: "Description 1",
            price: 100,
            imageUrl: "https://example.com/1.jpg",
          },
          {
            id: "prod-002",
            name: "Product 2",
            description: "Description 2",
            price: 200,
            imageUrl: "https://example.com/2.jpg",
          },
        ],
      };

      const result = productsResponseSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
    });

    it("should reject invalid page number", () => {
      const invalidResponse = {
        page: 0, // Invalid: must be positive
        limit: 10,
        total: 100,
        data: [],
      };

      const result = productsResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
    });
  });

  describe("errorResponseSchema", () => {
    it("should validate a valid error response", () => {
      const validError = {
        message: "Product not found",
        code: "NOT_FOUND",
        details: { id: "prod-999" },
      };

      const result = errorResponseSchema.safeParse(validError);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validError);
      }
    });

    it("should validate minimal error response", () => {
      const minimalError = {
        message: "An error occurred",
      };

      const result = errorResponseSchema.safeParse(minimalError);
      expect(result.success).toBe(true);
    });
  });
});
