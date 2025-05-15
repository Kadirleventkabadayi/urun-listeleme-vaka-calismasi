"use client";

import { Box } from "@mui/material";
import { Product } from "@/lib/types";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";

const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    description: "Description 1",
    category: "Category 1",
    image: "https://via.placeholder.com/150",
    rating: {
      rate: 4.5,
      count: 10,
    },
  },
  {
    id: 2,
    title: "Product 2",
    price: 200,
    description: "Description 2",
    category: "Category 2",
    image: "https://via.placeholder.com/150",
    rating: {
      rate: 4.0,
      count: 20,
    },
  },
];

export default function Home() {
  const [products] = useState<Product[]>(DUMMY_PRODUCTS);

  return (
    <Box>
      {products.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </Box>
  );
}
