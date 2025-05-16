"use client";

import { Box } from "@mui/material";
import { useEffect } from "react";
import { useProductStore } from "./store/productStore";
import ProductCard from "@/components/ProductCard";
import Searchbar from "@/components/Searchbar";
import CategoryDrawer from "@/components/CategoryDrawer";

export default function Home() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (selectedCategories: string[]) => {
    console.log("Seçilen kategoriler:", selectedCategories);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (products.length === 0) return <div>No products available</div>;

  return (
    <Box>
      <CategoryDrawer onCategoryChange={handleCategoryChange} />
      {/* <Searchbar /> */}
      {/* {products.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))} */}
    </Box>
  );
}
