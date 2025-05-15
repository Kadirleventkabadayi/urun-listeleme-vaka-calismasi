import axios from "axios";

const API_URL = "https://api.example.com/products";

export async function getProducts() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
