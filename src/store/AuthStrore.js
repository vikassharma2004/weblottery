import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      hydrated: false,

      // Hydration marker
      setHydrated: () => set({ hydrated: true }),

      // Set user only
      setUser: (user) => set({ user }),

      // Set token + optional user
      setAuth: (token = null, user = null) => {
        set({ token, user });
      },

      setLoading: (loading) => set({ loading }),

      // Logout (clears store)
      clearAuth: () => {
        set({
          user: null,
          token: null,
          loading: false,
        });
      },
    }),

    {
      name: "user-storage",
      storage: {
        getItem: (name) => {
          const data = localStorage.getItem(name);
          return data ? JSON.parse(data) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },

      onRehydrateStorage: () => (state) => {
        state?.setHydrated?.();
      },
    }
  )
);
