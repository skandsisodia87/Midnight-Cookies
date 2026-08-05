import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartItems: [],
  error: null,

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  setCartItems: (items) => {
    set({
      cartItems: items || [],
      error: null,
    });
  },

  addToCart: (cookie) => {
    const existing = get().cartItems.find(
      (item) => item.variantId === cookie.variantId,
    );

    if (existing) {
      get().increaseQuantity(cookie.variantId);
      return;
    }

    set((state) => ({
      cartItems: [...state.cartItems, cookie],
    }));
  },

  removeFromCart: (variantId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.variantId !== variantId),
    }));
  },

  increaseQuantity: (variantId) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.variantId === variantId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    }));
  },

  decreaseQuantity: (variantId) => {
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.variantId === variantId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  updateQuantity: (variantId, quantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.variantId === variantId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    }));
  },

  clearCart: () =>
    set({
      cartItems: [],
      error: null,
    }),

  getCartTotal: () => {
    return get().cartItems.reduce(
      (sum, item) => sum + item.finalPrice * item.quantity,
      0,
    );
  },

  getCartCount: () => {
    return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
  },
}));

export default useCartStore;
