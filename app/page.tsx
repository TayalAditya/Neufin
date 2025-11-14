"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/products/product-card";
import { ProductGridSkeleton } from "@/components/products/product-skeleton";
import { ErrorState } from "@/components/products/error-state";
import { EmptyState } from "@/components/products/empty-state";
import { SearchBar } from "@/components/products/search-bar";
import { Pagination } from "@/components/products/pagination";
import { CartButton } from "@/components/cart/cart-button";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { BackToTop } from "@/components/back-to-top";
import { ThemeToggle } from "@/components/theme-toggle";

const PRODUCTS_PER_PAGE = 12;

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mainRef = useRef<HTMLDivElement>(null);

  const currentPage = parseInt(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("q") || "";

  // Scroll to top when page changes
  useEffect(() => {
    if (mainRef.current) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  const { data, isLoading, isError, error, refetch } = useProducts({
    page: currentPage,
    limit: PRODUCTS_PER_PAGE,
    search: searchQuery,
  });

  const handleSearch = (query: string) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (query) params.set("q", query);
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;
  const hasProducts = data && data.data.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent mb-2">
                  Product Explorer
                </h1>
                <p className="text-muted-foreground text-lg">
                  Discover amazing products with detailed information
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <CartButton />
              </div>
            </div>
            <div className="max-w-2xl mx-auto w-full">
              <SearchBar
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search products by name or category..."
              />
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar />
      
      {/* Back to Top Button */}
      <BackToTop />

      {/* Main Content */}
      <main ref={mainRef} className="container mx-auto px-4 py-12">
        {/* Results Info */}
        {data && (
          <div className="mb-8 slide-in">
            <p className="text-sm text-muted-foreground font-medium">
              Showing {data.data.length > 0 ? ((data.page - 1) * data.limit) + 1 : 0} -{" "}
              {Math.min(data.page * data.limit, data.total)} of {data.total}{" "}
              products
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <ProductGridSkeleton count={PRODUCTS_PER_PAGE} />}

        {/* Error State */}
        {isError && (
          <ErrorState
            title="Failed to Load Products"
            message={
              error instanceof Error
                ? error.message
                : "An unexpected error occurred while loading products."
            }
            onRetry={() => refetch()}
          />
        )}

        {/* Empty State */}
        {!isLoading && !isError && !hasProducts && (
          <EmptyState searchQuery={searchQuery} />
        )}

        {/* Products Grid */}
        {!isLoading && !isError && hasProducts && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 fade-in">
              {data.data.map((product, index) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                disabled={isLoading}
              />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-24 bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Product Explorer
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>Powered by</span>
              <span className="font-semibold text-primary">Zod</span>
              <span>•</span>
              <span className="font-semibold text-primary">TanStack Query</span>
              <span>•</span>
              <span className="font-semibold text-primary">Radix UI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
          <div className="container mx-auto px-4 py-12">
            <ProductGridSkeleton count={PRODUCTS_PER_PAGE} />
          </div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
