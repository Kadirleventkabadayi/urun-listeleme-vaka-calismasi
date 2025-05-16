import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useProductStore } from "../app/store/productStore";
import { getCategoriesWithCount } from "@/lib/utils";
import DrawerList from "./DrawerList";

type Props = {
  onCategoryChange?: (selected: string[]) => void;
};

export default function CategoryDrawer({ onCategoryChange }: Props) {
  const [open, setOpen] = useState(false);
  const products = useProductStore((state) => state.products);

  const categoriesWithCount = getCategoriesWithCount(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleToggle = (category: string) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];

      if (onCategoryChange) {
        onCategoryChange(newSelection);
      }
      return newSelection;
    });
  };

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Kategoriler</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList
          categoriesWithCount={categoriesWithCount}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggle}
        />
      </Drawer>
    </div>
  );
}
