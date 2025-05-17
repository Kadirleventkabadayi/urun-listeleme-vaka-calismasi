import {
  Autocomplete,
  Checkbox,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { createFilterOptions } from "@mui/material/Autocomplete";

type CategoryFilterProps = {
  categoriesWithCount: Record<string, number>;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const customFilter = createFilterOptions<{ label: string; value: string }>({
  ignoreCase: true,
  trim: true,
});

export default function DrawerList({
  categoriesWithCount,
  selectedCategories,
  onToggleCategory,
}: CategoryFilterProps) {
  const categories = Object.entries(categoriesWithCount).map(
    ([category, count]) => ({
      label: `${category} (${count})`,
      value: category,
    })
  );

  const handleChange = (
    _: React.SyntheticEvent,
    value: (string | { label: string; value: string })[]
  ) => {
    const selected = value.map((v) => (typeof v === "string" ? v : v.value));

    selected.forEach((cat) => {
      if (!selectedCategories.includes(cat)) {
        onToggleCategory(cat);
      }
    });

    selectedCategories.forEach((cat) => {
      if (!selected.includes(cat)) {
        onToggleCategory(cat);
      }
    });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Tüm Aksiyonlar
      </Typography>
      <Divider sx={{ marginBlock: 2 }} />
      <Autocomplete
        multiple
        disableCloseOnSelect
        disableClearable
        freeSolo
        options={categories}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.label
        }
        filterOptions={(options, state) =>
          state.inputValue.length >= 2 ? customFilter(options, state) : []
        }
        value={categories.filter((cat) =>
          selectedCategories.includes(cat.value)
        )}
        onChange={handleChange}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
                style={{ marginRight: 8 }}
              />
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Kategori Ara"
            placeholder="Kategori seçin"
          />
        )}
        sx={{
          width: 250,
        }}
      />
    </>
  );
}
