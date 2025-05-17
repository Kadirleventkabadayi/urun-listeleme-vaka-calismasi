import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

type CategoryFilterProps = {
  categoriesWithCount: Record<string, number>;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
    values: { value: string }[]
  ) => {
    const selected = values.map((v) => v.value);

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
    <Autocomplete
      multiple
      disableCloseOnSelect
      disableClearable
      options={categories}
      getOptionLabel={(option) => option.label}
      value={categories.filter((cat) => selectedCategories.includes(cat.value))}
      onChange={handleChange}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
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
          label="Kategori Ara"
          placeholder="Kategori seçin"
        />
      )}
      sx={{
        width: 250,
      }}
    />
  );
}
