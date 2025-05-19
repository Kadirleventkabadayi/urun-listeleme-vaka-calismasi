"use client";

import { Box } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useProductStore } from "./store/productStore";
import ProductCard from "@/components/ProductCard";
import Searchbar from "@/components/Searchbar";
import DrawerContainer from "@/components/DrawerContainer";
import SortSelect from "@/components/SortSelect";
import { sortProductsByPrice } from "@/lib/utils";
import HomeSkeleton from "@/components/HomeSkeleton";
import HeaderSkeleton from "@/components/HeaderSkoleton";
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

  if (!loaded || loading)
    return (
      <>
        <Box>
          <HeaderSkeleton />
        </Box>
        <Box className="productGrid">
          {Array.from({ length: 16 }).map((_, index) => (
            <HomeSkeleton key={index} />
          ))}
        </Box>
      </>
    );
  if (error) return <div>{error}</div>;
  if (loaded && products.length === 0) return <div>No products available</div>;

  return (
    <Box>
      <DrawerContainer onCategoryChange={handleCategoryChange} />

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
