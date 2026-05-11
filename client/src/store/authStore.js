import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      // State
      user: null,
      accessToken: null,
      isAuthenticated: false,
      pendingVerificationEmail: null,
      isLoading: false,

      // Actions
      login: ({ user, accessToken }) =>
        set({
          user,
          accessToken,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          pendingVerificationEmail: null,
        }),

      setUser: (user) =>
        set({
          user,
        }),

      setAccessToken: (accessToken) =>
        set({
          accessToken,
        }),

      setLoading: (loading) =>
        set({
          isLoading: loading,
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
    },
  ),
);

export default useAuthStore;
