"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if only one page
  }

  return (
    <nav
      className="flex items-center justify-center gap-2"
      role="navigation"
      aria-label="Pagination"
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (canGoPrevious && !disabled) {
            onPageChange(currentPage - 1);
          }
        }}
        disabled={!canGoPrevious || disabled}
        aria-label="Go to previous page"
        className="h-10 w-10 border-2 hover:border-primary hover:bg-primary/10 transition-all disabled:opacity-50"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-4 py-2 text-muted-foreground font-semibold"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isCurrent = pageNumber === currentPage;

        return (
          <Button
            key={pageNumber}
            type="button"
            variant={isCurrent ? "default" : "outline"}
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!disabled) {
                onPageChange(pageNumber);
              }
            }}
            disabled={disabled}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isCurrent ? "page" : undefined}
            className={`h-10 w-10 font-semibold transition-all ${
              isCurrent 
                ? "bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/30 scale-110" 
                : "border-2 hover:border-primary hover:bg-primary/10"
            }`}
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (canGoNext && !disabled) {
            onPageChange(currentPage + 1);
          }
        }}
        disabled={!canGoNext || disabled}
        aria-label="Go to next page"
        className="h-10 w-10 border-2 hover:border-primary hover:bg-primary/10 transition-all disabled:opacity-50"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </nav>
  );
}
