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

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  addedAt: number; // timestamp
};

type MiniCartProps = {
  cartItems: CartItem[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function MiniCart({
  cartItems,
  onAdd,
  onRemove,
  onDelete,
}: MiniCartProps) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const sortedItems = [...cartItems].sort((a, b) => b.addedAt - a.addedAt);

  return (
    <Box sx={{ width: 350, p: 2 }} role="presentation" hidden={!open}>
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
                  onClick={() => onRemove(item.id)}
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
                  onClick={() => onAdd(item.id)}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <ListItemText
              primary={item.name}
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
