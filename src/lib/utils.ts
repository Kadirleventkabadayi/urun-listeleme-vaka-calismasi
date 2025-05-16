import axios from "axios";
import { Product } from "./types";
import { API_ENDPOINTS } from "./consts";

async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get(API_ENDPOINTS.PRODUCTS);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

function getCategoriesWithCount(products: Product[]): Record<string, number> {
  return products.reduce((acc, product) => {
    const cat = product.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function sortProductsByPrice(
  products: Product[],
  sortOrder: "low-to-high" | "high-to-low" | ""
) {
  if (!sortOrder) return products;

  return [...products].sort((a, b) =>
    sortOrder === "low-to-high" ? a.price - b.price : b.price - a.price
  );
}

export { getProducts, getCategoriesWithCount, sortProductsByPrice };
