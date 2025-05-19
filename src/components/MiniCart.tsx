import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductModal from "./ProductModal";
import "../app/styles/MiniCart.scss";
import { useCartStore } from "../app/store/cartStore";
import { CardMedia } from "@mui/material";
import { useState } from "react";

export default function MiniCart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const sortedItems = [...cartItems].sort((a, b) => b.addedAt - a.addedAt);

  return (
    <Box role="presentation" className="mini-cart">
      <Typography variant="h6" gutterBottom>
        Mini Sepet
      </Typography>
      <Divider sx={{ marginBlock: 2, borderColor: "var(--foreground)" }} />
      <List>
        {sortedItems.length === 0 && (
          <Typography className="empty">Sepetiniz boş.</Typography>
        )}

        {sortedItems.map((item) => (
          <ListItem key={item.id} className="cart-item">
            <Box className="item-content">
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                onClick={() => {
                  setSelectedProductId(item.id);
                  setOpen(true);
                }}
                className="product-image"
              />
              <ListItemText
                primary={item.title}
                secondary={`${item.price.toFixed(2)} ₺ x ${item.quantity} = ${(
                  item.price * item.quantity
                ).toFixed(2)} ₺`}
              />
            </Box>
            <Box className="quantity-controls">
              <IconButton
                edge="end"
                aria-label="remove"
                onClick={() => decreaseQuantity(item.id)}
              >
                <RemoveIcon />
              </IconButton>
              <Typography component="span" className="quantity-value">
                {item.quantity}
              </Typography>
              <IconButton
                edge="end"
                aria-label="add"
                onClick={() => increaseQuantity(item.id)}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeFromCart(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ marginBlock: 2, borderColor: "var(--foreground)" }} />
      <Box className="total-price">
        <Typography variant="subtitle1">
          Toplam: <strong>{totalPrice.toFixed(2)} ₺</strong>
        </Typography>
      </Box>
      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        productId={selectedProductId}
      />
    </Box>
  );
}
