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

import { useCartStore } from "../app/store/cartStore";
import { CardMedia } from "@mui/material";

export default function MiniCart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const sortedItems = [...cartItems].sort((a, b) => b.addedAt - a.addedAt);

  return (
    <Box sx={{ width: 350, p: 2 }} role="presentation">
      <Typography variant="h6" gutterBottom>
        Mini Sepet
      </Typography>
      <Divider />
      <List>
        {sortedItems.length === 0 && (
          <Typography sx={{ mt: 2 }}>Sepetiniz boş.</Typography>
        )}

        {sortedItems.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <Box>
                <IconButton
                  edge="end"
                  aria-label="remove"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography
                  component="span"
                  sx={{
                    mx: 1,
                    minWidth: 20,
                    display: "inline-block",
                    textAlign: "center",
                  }}
                >
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
            }
          >
            <CardMedia
              component="img"
              image={item.image}
              alt={item.title}
              sx={{ width: 50, height: 50, objectFit: "contain", mr: 2 }}
            />
            <ListItemText
              primary={item.title}
              secondary={`${item.price.toFixed(2)} ₺ x ${item.quantity} = ${(
                item.price * item.quantity
              ).toFixed(2)} ₺`}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Typography variant="subtitle1">
          Toplam: <strong>{totalPrice.toFixed(2)} ₺</strong>
        </Typography>
      </Box>
    </Box>
  );
}
