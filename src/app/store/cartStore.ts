import { create } from "zustand";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  addedAt: number;
};

type CartState = {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity" | "addedAt">) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addToCart: (product) => {
    const cartItems = get().cartItems;
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      set({
        cartItems: cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        cartItems: [
          ...cartItems,
          { ...product, quantity: 1, addedAt: Date.now() },
        ],
      });
    }
  },

  increaseQuantity: (id) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  },

  decreaseQuantity: (id) => {
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  removeFromCart: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
  },
}));
