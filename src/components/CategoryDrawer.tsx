// components/CategoryDrawer.tsx
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useProductStore } from "../app/store/productStore";
import { getCategoriesWithCount } from "@/lib/utils";
import DrawerList from "./DrawerList";

type Props = {
  open: boolean;
  onClose: () => void;
  onCategoryChange?: (selected: string[]) => void;
};

export default function CategoryDrawer({
  open,
  onClose,
  onCategoryChange,
}: Props) {
  const products = useProductStore((state) => state.products);
  const categoriesWithCount = getCategoriesWithCount(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleToggle = (category: string) => {
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelection);

    if (onCategoryChange) {
      onCategoryChange(newSelection);
    }
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 275, p: 2 }} role="presentation">
        <DrawerList
          categoriesWithCount={categoriesWithCount}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggle}
        />
      </Box>
    </Drawer>
  );
}
