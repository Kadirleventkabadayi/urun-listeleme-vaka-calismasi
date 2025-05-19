import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

type Props = {
  onMenuClick?: () => void;
  onCartClick?: () => void;
};

export default function AppHeader({ onMenuClick, onCartClick }: Props) {
  return (
    <Box sx={{ width: "100vw" }}>
      <AppBar position="fixed" sx={{ paddingRight: "0px !important" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kadir Levent Kabadayı
          </Typography>
          <Button
            color="inherit"
            onClick={onCartClick}
            endIcon={<ShoppingCartIcon />}
          >
            Sepet
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
