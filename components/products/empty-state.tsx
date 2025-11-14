import { PackageOpen, Search } from "lucide-react";

interface EmptyStateProps {
  searchQuery?: string;
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-12 text-center fade-in">
      <div className="relative mb-8">
        {searchQuery ? (
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <Search className="h-24 w-24 text-primary relative" aria-hidden="true" />
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <PackageOpen className="h-24 w-24 text-primary relative" aria-hidden="true" />
          </div>
        )}
      </div>
      
      <h3 className="text-3xl font-bold mb-4">
        {searchQuery ? "No results found" : "No products available"}
      </h3>
      <p className="text-muted-foreground text-lg max-w-md">
        {searchQuery ? (
          <>No products matching <span className="font-semibold text-primary">&quot;{searchQuery}&quot;</span>. Try a different search.</>
        ) : (
          "There are no products to display right now."
        )}
      </p>
    </div>
  );
}
