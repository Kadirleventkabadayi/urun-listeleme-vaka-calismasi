import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useProductStore } from "@/app/store/productStore";
import { useCartStore } from "@/app/store/cartStore";
import "../app/styles/ProductModal.scss";
import { Rating } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  productId: number | null;
};

export default function ProductModal({
  open,
  onClose,
  productId,
}: ProductModalProps) {
  const { products } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === productId);
  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="product-modal">
        <Box className="modal-header">
          <Typography
            variant="h6"
            component="h2"
            className="modal-title"
            title={product.title}
          >
            {product.title}
          </Typography>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            endIcon={added ? <CheckCircleIcon /> : <ShoppingCartIcon />}
            disabled={added}
          >
            {added ? "Eklendi!" : "Sepete Ekle"}
          </Button>
        </Box>
        <img src={product.image} alt={product.title} />
        <Typography title={product.description}>
          {product.description}
        </Typography>
        <Typography>
          Fiyat: <strong>{product.price} TL</strong>
        </Typography>
        <Typography className="rating">
          <Rating value={product.rating.rate} readOnly />({product.rating.count}{" "}
          değerlendirme)
        </Typography>
      </Box>
    </Modal>
  );
}
