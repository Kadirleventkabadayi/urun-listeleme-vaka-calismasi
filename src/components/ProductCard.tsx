import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

import { Product } from "@/lib/types";
import { useCartStore } from "../app/store/cartStore";
import ProductModal from "./ProductModal";

function ProductCard(product: Product) {
  const { id, title, price, image, rating } = product;
  const addToCart = useCartStore((state) => state.addToCart);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Card key={id} sx={{ width: "18vw" }}>
        <CardActionArea onClick={() => setOpen(true)}>
          <CardMedia component="img" height="140" image={image} alt={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {price} TL
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              rating: {rating.rate} ({rating.count})
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => addToCart({ id, title, price, image })}
          >
            Sepete Ekle
          </Button>
        </CardActions>
      </Card>

      <ProductModal open={open} onClose={() => setOpen(false)} productId={id} />
    </>
  );
}

export default ProductCard;
