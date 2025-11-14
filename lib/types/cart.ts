import { Product } from "@/lib/validations/product";

/**
 * Represents a single item in the shopping cart
 */
export interface CartItem {
  product: Product;      // Full product object
  quantity: number;      // Number of this product in cart
  addedAt: Date;        // When item was added
}

/**
 * Complete cart state and actions
 */
export interface CartState {
  // State
  items: CartItem[];    // Array of cart items
  isOpen: boolean;      // Is cart drawer visible?

  // Cart Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // UI Actions
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed Values (functions, not properties!)
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: string) => number;
}
