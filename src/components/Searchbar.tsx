"use client";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useProductStore } from "../app/store/productStore";

export default function Searchbar() {
  const products = useProductStore((state) => state.products);

  return (
    <Stack spacing={2} sx={{ width: 300, bgcolor: "white" }}>
      <Autocomplete
        id="Searchbar"
        freeSolo
        disableClearable
        options={products.map((product) => product.title)}
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
