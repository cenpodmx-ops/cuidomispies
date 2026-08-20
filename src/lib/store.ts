"use client";

// Store global de CuidoMisPies.
// Maneja: navegación SPA, carrito, y UI (cart drawer, búsqueda, menú móvil).

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Tipos de navegación SPA ───
export type Route =
  | { name: "home" }
  | { name: "category"; slug: string }
  | { name: "product"; slug: string }
  | { name: "kit"; slug: string }
  | { name: "routine-finder" }
  | { name: "asesoria" }
  | { name: "aprende" }
  | { name: "ayuda" };

// ─── Tipos del carrito ───
export type CartItem = {
  id: string; // producto.id o kit.id
  kind: "product" | "kit";
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  presentation?: string;
  // para kits: los productos incluidos (para mostrarlos)
  items?: { title: string; stepLabel: string }[];
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type StoreState = {
  // ── Navegación SPA ──
  route: Route;
  routeStack: Route[]; // historial para "volver"
  navigate: (route: Route) => void;
  goBack: () => void;

  // ── Carrito ──
  cart: CartState;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // ── UI ──
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // ── Catálogo (cache en cliente) ──
  catalogLoaded: boolean;
  setCatalogLoaded: (v: boolean) => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // ── Navegación ──
      route: { name: "home" },
      routeStack: [],
      navigate: (route) => {
        const current = get().route;
        // Scroll to top on navigation
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
        set((state) => ({
          route,
          routeStack: [...state.routeStack, current].slice(-20),
        }));
      },
      goBack: () => {
        const stack = get().routeStack;
        if (stack.length === 0) {
          set({ route: { name: "home" } });
          return;
        }
        const prev = stack[stack.length - 1];
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
        set({
          route: prev,
          routeStack: stack.slice(0, -1),
        });
      },

      // ── Carrito ──
      cart: {
        items: [],
        isOpen: false,
      },
      addToCart: (item, quantity = 1) => {
        set((state) => {
          const existing = state.cart.items.find((i) => i.id === item.id);
          let items: CartItem[];
          if (existing) {
            items = state.cart.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
            );
          } else {
            items = [...state.cart.items, { ...item, quantity }];
          }
          return {
            cart: { ...state.cart, items, isOpen: true },
          };
        });
      },
      removeFromCart: (id) =>
        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items.filter((i) => i.id !== id),
          },
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items
              .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i))
              .filter((i) => i.quantity > 0),
          },
        })),
      clearCart: () =>
        set((state) => ({ cart: { ...state.cart, items: [] } })),
      openCart: () => set((state) => ({ cart: { ...state.cart, isOpen: true } })),
      closeCart: () => set((state) => ({ cart: { ...state.cart, isOpen: false } })),
      toggleCart: () =>
        set((state) => ({ cart: { ...state.cart, isOpen: !state.cart.isOpen } })),

      // ── UI ──
      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      // ── Catálogo ──
      catalogLoaded: false,
      setCatalogLoaded: (v) => set({ catalogLoaded: v }),
    }),
    {
      name: "cuidomispies-store",
      // No persistir la navegación ni UI states, solo el carrito
      partialize: (state) => ({ cart: { items: state.cart.items } }) as any,
    }
  )
);

// ─── Selectores de utilidad ───
export const useCartCount = () =>
  useStore((s) => s.cart.items.reduce((acc, i) => acc + i.quantity, 0));

export const useCartTotal = () =>
  useStore((s) =>
    s.cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  );

export const formatMXN = (amount: number): string =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
