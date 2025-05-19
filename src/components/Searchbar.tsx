import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useProductStore } from "../app/store/productStore";
import { Product } from "@/lib/types";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { createFilterOptions } from "@mui/material/Autocomplete";
import "../app/styles/Searchbar.scss";

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
      <Autocomplete
        className="searchBar"
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
          <TextField {...params} label="Ürün Ara" variant="outlined" />
        )}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              "& .MuiAutocomplete-option": {
                "&:hover": {
                  backgroundColor: "var(--hover-background)",
                },
                '&[aria-selected="true"]': {
                  backgroundColor: "var(--hover-background)",
                },
              },
            },
          },
        }}
      />

      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        productId={selectedProductId}
      />
    </>
  );
}
