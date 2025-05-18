import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "../app/styles/SortSelect.scss";

import { useState } from "react";

type Props = {
  onSortChange?: (value: "low-to-high" | "high-to-low" | "") => void;
};

export default function SortSelect({ onSortChange }: Props) {
  const [sortValue, setSortValue] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as "low-to-high" | "high-to-low" | "";
    setSortValue(value);
    if (onSortChange) {
      onSortChange(value);
    }
  };

  return (
    <FormControl className="sortSelect">
      <InputLabel id="sort-select-label">Sıralama</InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        value={sortValue}
        onChange={handleChange}
        label="Sıralama"
        autoWidth
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            },
          },
        }}
      >
        <MenuItem value="">
          <em>Seçiniz</em>
        </MenuItem>
        <MenuItem value="low-to-high">En Düşük Fiyat</MenuItem>
        <MenuItem value="high-to-low">En Yüksek Fiyat</MenuItem>
      </Select>
    </FormControl>
  );
}
