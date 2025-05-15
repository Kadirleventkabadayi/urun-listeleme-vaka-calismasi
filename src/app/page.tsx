"use client";

import { Box } from "@mui/material";
import { Product } from "@/lib/types";
import { useState, useEffect } from "react";

import { getProducts } from "@/lib/utils";

import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [products] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        products.push(...data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <Box>
      {products.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </Box>
  );
}
