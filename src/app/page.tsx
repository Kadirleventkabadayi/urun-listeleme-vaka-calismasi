"use client";

import { Box } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useProductStore } from "./store/productStore";
import ProductCard from "@/components/ProductCard";
import Searchbar from "@/components/Searchbar";
import CategoryDrawer from "@/components/CategoryDrawer";
import SortSelect from "@/components/SortSelect";
import { sortProductsByPrice } from "@/lib/utils";
import "../app/styles/Home.scss";

export default function Home() {
  const { products, loading, loaded, error, fetchProducts } = useProductStore();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<
    "low-to-high" | "high-to-low" | ""
  >("");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };
  const handleSortChange = (order: "low-to-high" | "high-to-low" | "") => {
    setSortOrder(order);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }
    return sortProductsByPrice(filtered, sortOrder);
  }, [products, selectedCategories, sortOrder]);

  if (!loaded || loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (loaded && products.length === 0) return <div>No products available</div>;

  return (
    <Box>
      <CategoryDrawer onCategoryChange={handleCategoryChange} />

      <Box className="headerBar">
        <SortSelect onSortChange={handleSortChange} />
        <Searchbar />
      </Box>

      <Box className="productGrid">
        {filteredAndSortedProducts.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </Box>
    </Box>
  );
}
