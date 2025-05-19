import { create } from "zustand";
import { Product } from "@/lib/types";
import { getProducts } from "@/lib/utils";

interface ProductStore {
  products: Product[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  loaded: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getProducts();
      set({ products: data, loaded: true });
    } catch (err) {
      set({ error: (err as Error).message, loaded: true });
    } finally {
      set({ loading: false });
    }
  },
}));
