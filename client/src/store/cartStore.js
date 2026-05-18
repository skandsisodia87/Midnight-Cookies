import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartItems: [],
  error: null,

  setError: (error) => {
    set({ error });
  },

  setCartItems: (items) => {
    set({
      cartItems: items || [],
      error: null,
    });
  },

  addToCart: (product) => {
    try {
      const existingItem = get().cartItems.find(
        (item) => item.variantId === product.variantId,
      );

      if (existingItem) {
        const updatedItems = get().cartItems.map((item) =>
          item.variantId === product.variantId
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
              }
            : item,
        );

        set({
          cartItems: updatedItems,
          error: null,
        });

        return;
      }

      set({
        cartItems: [...get().cartItems, product],
        error: null,
      });
    } catch (error) {
      set({
        error: "Failed to add item to cart.",
      });
    }
  },

  removeFromCart: (variantId) => {
    try {
      const updatedItems = get().cartItems.filter(
        (item) => item.variantId !== variantId,
      );

      set({
        cartItems: updatedItems,
        error: null,
      });
    } catch (error) {
      set({
        error: "Failed to remove item from cart.",
      });
    }
  },

  increaseQuantity: (variantId) => {
    try {
      const updatedItems = get().cartItems.map((item) =>
        item.variantId === variantId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );

      set({
        cartItems: updatedItems,
        error: null,
      });
    } catch (error) {
      set({
        error: "Failed to update quantity.",
      });
    }
  },

  decreaseQuantity: (variantId) => {
    try {
      const updatedItems = get()
        .cartItems.map((item) =>
          item.variantId === variantId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0);

      set({
        cartItems: updatedItems,
        error: null,
      });
    } catch (error) {
      set({
        error: "Failed to update quantity.",
      });
    }
  },

  clearCart: () => {
    set({
      cartItems: [],
      error: null,
    });
  },

  getCartTotal: () => {
    return get().cartItems.reduce(
      (total, item) => total + item.finalPrice * item.quantity,
      0,
    );
  },

  getCartCount: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },
}));

export default useCartStore;
