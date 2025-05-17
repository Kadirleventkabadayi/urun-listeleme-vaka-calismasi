import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useProductStore } from "../app/store/productStore";
import { Product } from "@/lib/types";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { createFilterOptions } from "@mui/material/Autocomplete";

export default function Searchbar() {
  const products = useProductStore((state) => state.products);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const handleChange = (
    event: React.SyntheticEvent,
    value: string | Product | null
  ) => {
    if (typeof value === "object" && value !== null) {
      setSelectedProductId(value.id);
      setOpen(true);
    } else {
      setSelectedProductId(null);
      setOpen(false);
    }
  };

  const customFilter = createFilterOptions<Product>({
    stringify: (option) => option.title,
    trim: true,
  });

  return (
    <>
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
          filterOptions={(options, state) =>
            state.inputValue.length >= 2 ? customFilter(options, state) : []
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

      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        productId={selectedProductId}
      />
    </>
  );
}
