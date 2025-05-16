"use client";

import { Box } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useProductStore } from "./store/productStore";
import ProductCard from "@/components/ProductCard";
import Searchbar from "@/components/Searchbar";
import CategoryDrawer from "@/components/CategoryDrawer";
import SortSelect from "@/components/SortSelect";
import { sortProductsByPrice } from "@/lib/utils";

export default function Home() {
  const { products, loading, error, fetchProducts } = useProductStore();

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (products.length === 0) return <div>No products available</div>;

  return (
    <Box>
      <CategoryDrawer onCategoryChange={handleCategoryChange} />

      <Box
        sx={{
          position: "fixed",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          flexDirection: "row",
          bgcolor: "white",
          zIndex: 1000,
        }}
      >
        <SortSelect onSortChange={handleSortChange} />
        <Searchbar />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mt: 16,
          ml: "3vw",
          gap: 2,
          justifyContent: "start",
        }}
      >
        {filteredAndSortedProducts.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </Box>
    </Box>
  );
}
