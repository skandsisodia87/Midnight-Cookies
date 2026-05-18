import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,
      pendingVerificationEmail: null,
      isLoading: false,
      isRegistering: false,

      // Actions
      login: ({ user }) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          pendingVerificationEmail: null,
          isRegistering: false,
        }),

      setUser: (user) =>
        set({
          user,
        }),

      setLoading: (loading) =>
        set({
          isLoading: loading,
        }),

      setRegistering: (value) =>
        set({
          isRegistering: value,
        }),

      setPendingVerificationEmail: (email) =>
        set({
          pendingVerificationEmail: email,
        }),

      clearPendingVerificationEmail: () =>
        set({
          pendingVerificationEmail: null,
        }),
    }),
    {
      name: "auth-storage",
      // Only persist user and auth state, NOT the token
      // Token should be stored in httpOnly cookie by the server
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        pendingVerificationEmail: state.pendingVerificationEmail,
        isRegistering: state.isRegistering,
      }),
    },
  ),
);

export default useAuthStore;
