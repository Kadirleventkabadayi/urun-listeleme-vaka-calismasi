import {
  Autocomplete,
  Checkbox,
  TextField,
  InputAdornment,
  Divider,
  Typography,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";
import "../app/styles/DrawerList.scss";

type CategoryFilterProps = {
  categoriesWithCount: Record<string, number>;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type OptionType = {
  label: string;
  value: string;
};

export default function DrawerList({
  categoriesWithCount,
  selectedCategories,
  onToggleCategory,
}: CategoryFilterProps) {
  const categories: OptionType[] = Object.entries(categoriesWithCount).map(
    ([category, count]) => ({
      label: `${category} (${count})`,
      value: category,
    })
  );

  const selectedOptions = categories.filter((cat) =>
    selectedCategories.includes(cat.value)
  );

  const handleChange = (
    _event: React.SyntheticEvent,
    value: (string | OptionType)[]
  ) => {
    const newSelectedValues = value.map((opt) =>
      typeof opt === "string" ? opt : opt.value
    );

    newSelectedValues.forEach((val) => {
      if (!selectedCategories.includes(val)) {
        onToggleCategory(val);
      }
    });

    selectedCategories.forEach((val) => {
      if (!newSelectedValues.includes(val)) {
        onToggleCategory(val);
      }
    });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Kategoriler
      </Typography>
      <Divider sx={{ marginBlock: 2 }} />
      <Autocomplete
        classes={{ paper: "custom-autocomplete-paper" }}
        multiple
        freeSolo
        options={categories}
        value={selectedOptions}
        disableCloseOnSelect
        disableClearable
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.label
        }
        isOptionEqualToValue={(opt, val) => opt.value === val.value}
        onChange={handleChange}
        renderOption={(props, option, { selected }) => {
          const { key, ...rest } = props;
          return (
            <li
              key={key}
              {...rest}
              className={`custom-option ${selected ? "selected" : ""}`}
            >
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
              />
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Kategori Ara"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </>
  );
}
