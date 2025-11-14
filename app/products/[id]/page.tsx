"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star, Package, ShoppingCart } from "lucide-react";
import { useProduct } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/products/error-state";
import { formatPrice, formatRating } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart-store";
import { CartButton } from "@/components/cart/cart-button";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { addItem } = useCartStore();

  const { data: product, isLoading, isError, error, refetch } = useProduct(productId);

  const handleBack = () => {
    router.push("/");
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-12 w-40 mb-12 shimmer" />
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="h-[500px] w-full rounded-2xl shimmer" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4 shimmer" />
              <Skeleton className="h-8 w-40 shimmer" />
              <Skeleton className="h-6 w-full shimmer" />
              <Skeleton className="h-6 w-full shimmer" />
              <Skeleton className="h-6 w-2/3 shimmer" />
              <Skeleton className="h-14 w-full shimmer" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-12">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-12 hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="Back to products"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="font-semibold">Back</span>
          </Button>
          <ErrorState
            title="Product Not Found"
            message={
              error instanceof Error
                ? error.message
                : "The product you are looking for could not be found."
            }
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Header with Back and Cart */}
        <div className="flex items-center justify-between mb-12">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="hover:bg-primary/10 hover:text-primary transition-all group"
            aria-label="Back to products"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back to Products</span>
          </Button>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <CartButton />
          </div>
        </div>

        {/* Cart Sidebar */}
        <CartSidebar />

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 fade-in">
          {/* Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 shadow-2xl border-2 border-border/50">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category Badge */}
            {product.category && (
              <Badge variant="secondary" className="w-fit mb-6 text-sm px-4 py-1.5 backdrop-blur-sm bg-secondary/80">
                {product.category}
              </Badge>
            )}

            {/* Product Name */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-3 mb-6" aria-label={`Rating: ${formatRating(product.rating)} out of 5 stars`}>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-xl font-bold">
                  {formatRating(product.rating)}
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-8">
              <span className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {formatPrice(product.price, product.currency)}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-8">
              {product.inStock ? (
                <Badge variant="success" className="flex items-center gap-2 w-fit px-4 py-2 text-base shadow-lg">
                  <Package className="h-4 w-4" aria-hidden="true" />
                  <span className="font-semibold">In Stock</span>
                </Badge>
              ) : (
                <Badge variant="destructive" className="w-fit px-4 py-2 text-base shadow-lg">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Attributes */}
            {product.attributes && Object.keys(product.attributes).length > 0 && (
              <Card className="mb-8 border-2 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Product Details</CardTitle>
                  <CardDescription className="text-base">Specifications and attributes</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-6">
                    {Object.entries(product.attributes)
                      .filter(([key, value]) => {
                        // Filter out internal attributes and null/0 values
                        if (key === 'tag' || key === 'discount' || key === 'originalPrice') return false;
                        if (value === null || value === 0) return false;
                        return true;
                      })
                      .map(([key, value]) => (
                        <div key={key} className="border-l-4 border-primary/30 pl-4">
                          <dt className="text-sm font-semibold text-muted-foreground capitalize mb-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </dt>
                          <dd className="text-base font-bold">
                            {Array.isArray(value) ? value.join(', ') : String(value)}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </CardContent>
              </Card>
            )}

            {/* Add to Cart Button */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full md:w-auto h-14 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 disabled:from-muted disabled:to-muted"
              aria-label={product.inStock ? "Add to cart" : "Product out of stock"}
            >
              <ShoppingCart className="mr-3 h-6 w-6" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
