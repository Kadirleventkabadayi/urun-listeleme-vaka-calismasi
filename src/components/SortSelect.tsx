import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

type Props = {
  onSortChange?: (sortValue: string) => void;
};

export default function SortSelect({ onSortChange }: Props) {
  const [sort, setSort] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSort(value);
    if (onSortChange) {
      onSortChange(value);
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 150, bgcolor: "white" }}>
      <InputLabel id="sort-select-label">Sırala</InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        value={sort}
        onChange={handleChange}
        label="Sırala"
        autoWidth
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
