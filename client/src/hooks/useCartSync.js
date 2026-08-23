import { useEffect, useRef } from "react";
import { toast } from "sonner";
import useCartStore from "../store/cartStore";
import { updateCartItemsQuantity } from "../services/cart.service";

const DEBOUNCE_TIME = 500;

const useCartSync = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    setCartItems,
    setError,
  } = useCartStore();

  const pendingUpdatesRef = useRef(new Map());
  const timeoutRef = useRef(null);
  const previousCartRef = useRef([]);

  const flushUpdates = async () => {
    const payload = Array.from(pendingUpdatesRef.current.entries()).map(
      ([cookieId, quantity]) => ({
        cookieId,
        quantity,
      }),
    );

    pendingUpdatesRef.current.clear();

    if (!payload.length) return;

    try {
      await updateCartItemsQuantity(payload);
      setError(null);
    } catch (error) {
      setCartItems(previousCartRef.current);

      setError("Failed to update cart.");

      toast.error(
        error?.response?.data?.message || "Failed to update cart quantity.",
      );
    }
  };

  const scheduleSync = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      void flushUpdates();
    }, DEBOUNCE_TIME);
  };

  const increase = (variantId) => {
    previousCartRef.current = [...cartItems];

    const item = cartItems.find((item) => item.variantId === variantId);

    if (!item) return;

    const nextQuantity = item.quantity + 1;

    pendingUpdatesRef.current.set(item.cookieId, nextQuantity);

    increaseQuantity(variantId);

    scheduleSync();
  };

  const decrease = (variantId) => {
    previousCartRef.current = [...cartItems];

    const item = cartItems.find((item) => item.variantId === variantId);

    if (!item) return;

    if (item.quantity <= 1) return;

    const nextQuantity = item.quantity - 1;

    pendingUpdatesRef.current.set(item.cookieId, nextQuantity);

    decreaseQuantity(variantId);

    scheduleSync();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    increase,
    decrease,
  };
};

export default useCartSync;
