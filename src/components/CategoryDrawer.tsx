import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useProductStore } from "../app/store/productStore";
import { getCategoriesWithCount } from "@/lib/utils";
import DrawerList from "./DrawerList";
import AppHeader from "./AppHeader";
import MiniCart from "./MiniCart";

export default function MainLayout() {
  const products = useProductStore((state) => state.products);
  const categoriesWithCount = getCategoriesWithCount(products);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const handleToggle = (category: string) => {
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelection);
  };

  return (
    <Box>
      <AppHeader
        onMenuClick={() => setCategoryDrawerOpen(true)}
        onCartClick={() => setCartDrawerOpen(true)}
      />

      <Drawer
        anchor="left"
        open={categoryDrawerOpen}
        onClose={() => setCategoryDrawerOpen(false)}
      >
        <Box sx={{ width: 275, p: 2 }} role="presentation">
          <DrawerList
            categoriesWithCount={categoriesWithCount}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggle}
          />
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      >
        <Box sx={{ width: 350, p: 2 }} role="presentation">
          <MiniCart
            cartItems={[]}
            onAdd={() => {}}
            onRemove={() => {}}
            onDelete={() => {}}
          />
        </Box>
      </Drawer>
    </Box>
  );
}
