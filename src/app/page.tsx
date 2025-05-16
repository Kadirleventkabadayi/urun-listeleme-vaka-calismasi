"use client";

import { Box } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useProductStore } from "./store/productStore";
import ProductCard from "@/components/ProductCard";
import Searchbar from "@/components/Searchbar";
import CategoryDrawer from "@/components/CategoryDrawer";
import SortSelect from "@/components/SortSelect";
import { sortProductsByPrice } from "@/lib/utils";
import AppHeader from "@/components/AppHeader";

export default function Home() {
  const { products, loading, error, fetchProducts } = useProductStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
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
      <AppHeader onMenuClick={() => setDrawerOpen(true)} />

      <CategoryDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCategoryChange={handleCategoryChange}
      />

      <Box sx={{ p: 2 }}>
        <SortSelect onSortChange={handleSortChange} />
        <Searchbar />
      </Box>

      <Box sx={{ p: 2 }}>
        {filteredAndSortedProducts.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </Box>
    </Box>
  );
}
