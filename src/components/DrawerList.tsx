import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Divider, Typography } from "@mui/material";

type DrawerListProps = {
  categoriesWithCount: Record<string, number>;
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
};

export default function DrawerList({
  categoriesWithCount,
  selectedCategories,
  onToggleCategory,
}: DrawerListProps) {
  return (
    <Box sx={{ width: 250, p: 2 }} role="presentation">
      <Typography variant="h6" gutterBottom>
        Kategoriler
      </Typography>
      <Divider />
      <List>
        {Object.entries(categoriesWithCount).map(([category, count]) => (
          <ListItem key={category} disablePadding>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onChange={() => onToggleCategory(category)}
                />
              }
              label={`${category} (${count})`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
