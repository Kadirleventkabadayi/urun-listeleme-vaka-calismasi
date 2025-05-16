// components/CategoryDrawer.tsx
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useProductStore } from "../app/store/productStore";
import { getCategoriesWithCount } from "@/lib/utils";
import DrawerList from "./DrawerList";
import AppHeader from "./AppHeader";

type Props = {
  onCategoryChange?: (selected: string[]) => void;
};

export default function CategoryDrawer({ onCategoryChange }: Props) {
  const products = useProductStore((state) => state.products);
  const categoriesWithCount = getCategoriesWithCount(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleToggle = (category: string) => {
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelection);

    if (onCategoryChange) {
      onCategoryChange(newSelection);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <AppHeader onMenuClick={handleDrawerOpen} />

      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
        <Box sx={{ width: 275, p: 2 }} role="presentation">
          <DrawerList
            categoriesWithCount={categoriesWithCount}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggle}
          />
        </Box>
      </Drawer>
    </Box>
  );
}
