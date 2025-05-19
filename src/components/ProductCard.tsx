import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import "../app/styles/ProductCard.scss";
import { Product } from "@/lib/types";
import { useCartStore } from "../app/store/cartStore";
import ProductModal from "./ProductModal";
import { Rating } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function ProductCard(product: Product) {
  const { id, title, price, image, rating } = product;
  const addToCart = useCartStore((state) => state.addToCart);

  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, title, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <Card className="product-card" key={id}>
        <CardActionArea onClick={() => setOpen(true)}>
          <CardMedia
            className="card-media"
            component="img"
            image={image}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {price} TL
            </Typography>
            <Typography className="rating">
              <Rating value={rating.rate} readOnly />({rating.count}{" "}
              değerlendirme)
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="card-actions">
          <Button
            size="small"
            onClick={handleAddToCart}
            endIcon={added ? <CheckCircleIcon /> : <ShoppingCartIcon />}
            disabled={added}
          >
            {added ? "Eklendi!" : "Sepete Ekle"}
          </Button>
        </CardActions>
      </Card>

      <ProductModal open={open} onClose={() => setOpen(false)} productId={id} />
    </>
  );
}

export default ProductCard;
