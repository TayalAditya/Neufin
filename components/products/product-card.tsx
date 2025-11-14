"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Package, TrendingUp, Flame, Sparkles, ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/validations/product";
import { formatPrice, formatRating } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart-store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const tag = (product.attributes?.tag as string) || null;
  const discount = (product.attributes?.discount as number) || 0;
  const originalPrice = (product.attributes?.originalPrice as number) || null;
  const { addItem } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      addItem(product);
    }
  };

  const getTagIcon = (tagName: string) => {
    switch (tagName) {
      case "Trending":
        return <TrendingUp className="h-3.5 w-3.5" />;
      case "Hot Deal":
        return <Flame className="h-3.5 w-3.5" />;
      case "New Arrival":
        return <Sparkles className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  const getTagClassName = (tagName: string) => {
    switch (tagName) {
      case "Trending":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0";
      case "Hot Deal":
        return "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 animate-pulse";
      case "New Arrival":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0";
      default:
        return "";
    }
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <Card
        className="overflow-hidden product-card-hover cursor-pointer h-full flex flex-col focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border-2 border-transparent hover:border-primary/20 bg-card/50 backdrop-blur-sm transition-all duration-300"
        tabIndex={0}
        role="article"
        aria-label={`${product.name} - ${formatPrice(product.price, product.currency)}`}
      >
        <CardHeader className="p-0 relative overflow-hidden">
          <div className="relative h-56 w-full bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-purple-600/0 group-hover:from-primary/10 group-hover:to-purple-600/10 transition-all duration-500" />
            
            {/* Quick Add Button */}
            {product.inStock && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                <Button
                  onClick={handleQuickAdd}
                  size="sm"
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-2xl font-bold gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Quick Add
                </Button>
              </div>
            )}
          </div>
          {!product.inStock && !discount && (
            <Badge
              variant="destructive"
              className="absolute top-3 right-3 shadow-lg"
              aria-label="Out of stock"
            >
              Out of Stock
            </Badge>
          )}
          {!product.inStock && discount > 0 && (
            <Badge
              variant="destructive"
              className="absolute bottom-3 right-3 shadow-lg"
              aria-label="Out of stock"
            >
              Out of Stock
            </Badge>
          )}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.category && (
              <Badge
                variant="secondary"
                className="shadow-lg backdrop-blur-sm bg-background/80"
                aria-label={`Category: ${product.category}`}
              >
                {product.category}
              </Badge>
            )}
            {tag && (
              <Badge
                className={`shadow-lg flex items-center gap-1.5 font-bold ${getTagClassName(tag)}`}
                aria-label={tag}
              >
                {getTagIcon(tag)}
                <span>{tag}</span>
              </Badge>
            )}
          </div>
          {discount > 0 && (
            <Badge
              className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg font-bold text-base px-3 py-1.5"
              aria-label={`${discount}% discount`}
            >
              -{discount}%
            </Badge>
          )}
        </CardHeader>

        <CardContent className="p-5 flex-1">
          <h3 className="font-bold text-lg line-clamp-1 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.shortDescription || product.description}
          </p>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(originalPrice, product.currency)}
                </span>
              )}
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {formatPrice(product.price, product.currency)}
              </span>
            </div>
            {product.rating > 0 && (
              <div className="flex items-center gap-1.5" aria-label={`Rating: ${formatRating(product.rating)} out of 5 stars`}>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {formatRating(product.rating)}
                </span>
              </div>
            )}
          </div>
          {product.inStock && (
            <Badge variant="success" className="flex items-center gap-1.5 px-3 py-1 shadow-sm">
              <Package className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-semibold">In Stock</span>
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
