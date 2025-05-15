import axios from "axios";
import { Product } from "./types";
import { API_ENDPOINTS } from "./consts";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get(API_ENDPOINTS.PRODUCTS);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
