import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartState, CartItem } from "@/lib/types/cart";
import { Product } from "@/lib/validations/product";

/**
 * Shopping cart store with localStorage persistence
 * Usage: const { addItem, items } = useCartStore();
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isOpen: false,

      // Add item to cart (or increment if exists)
      addItem: (product: Product, quantity: number = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            // Item exists → increment quantity
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          // New item → add to cart
          return {
            items: [
              ...state.items,
              {
                product,
                quantity,
                addedAt: new Date(),
              },
            ],
          };
        });
      },

      // Remove item completely from cart
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      // Update quantity (remove if quantity <= 0)
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      // Remove all items
      clearCart: () => {
        set({ items: [] });
      },

      // Toggle drawer open/closed
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      // Open drawer
      openCart: () => {
        set({ isOpen: true });
      },

      // Close drawer
      closeCart: () => {
        set({ isOpen: false });
      },

      // Calculate total number of items
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Calculate total price (sum of price * quantity)
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      // Get quantity of specific product
      getItemQuantity: (productId: string) => {
        const item = get().items.find((item) => item.product.id === productId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
