"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";

export function CartButton() {
  const { toggleCart, getTotalItems } = useCartStore();
  const [totalItems, setTotalItems] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTotalItems(getTotalItems());
  }, [getTotalItems]);

  // Subscribe to cart changes
  useEffect(() => {
    if (!mounted) return;
    
    const unsubscribe = useCartStore.subscribe((state) => {
      setTotalItems(state.items.reduce((total, item) => total + item.quantity, 0));
    });

    return unsubscribe;
  }, [mounted]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleCart}
      className="relative h-12 w-12 border-2 hover:border-primary hover:bg-primary/10 transition-all shadow-sm hover:shadow-md group"
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
      {mounted && totalItems > 0 && (
        <span 
          key={totalItems}
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold flex items-center justify-center shadow-lg bounce-in pulse-glow"
        >
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Button>
  );
}