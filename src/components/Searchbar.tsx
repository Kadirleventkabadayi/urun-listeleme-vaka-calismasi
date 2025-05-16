"use client";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useProductStore } from "../app/store/productStore";
import { Product } from "@/lib/types";
import { useState } from "react";

export default function Searchbar() {
  const products = useProductStore((state) => state.products);
  const [, setSelectedProduct] = useState<Product | null>(null);

  const handleChange = (
    event: React.SyntheticEvent,
    value: string | Product | null
  ) => {
    if (typeof value === "object" && value !== null) {
      setSelectedProduct(value);
      console.log("Seçilen ürün objesi:", value);
    } else {
      setSelectedProduct(null);
      console.log("Seçilen değer bir string veya null:", value);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        sx={{ bgcolor: "white" }}
        id="Searchbar"
        freeSolo
        disableClearable
        options={products}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.title
        }
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Products"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
}
