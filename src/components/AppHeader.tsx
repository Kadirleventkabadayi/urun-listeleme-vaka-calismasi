import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  onMenuClick?: () => void;
};

export default function AppHeader({ onMenuClick }: Props) {
  return (
    <Box sx={{ width: "100vw" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuClick} // burası önemli, fonksiyon direkt çağrılacak
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kadir Levent Kabadayı
          </Typography>
          <Button color="inherit">Sepet</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
