import { Product } from "@/lib/types";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  product: Product | null;
};

export default function ProductModal({
  open,
  onClose,
  product,
}: ProductModalProps) {
  if (!product) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 500,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          mx: "auto",
          my: "10%",
        }}
      >
        <Typography variant="h6" component="h2">
          {product.title}
        </Typography>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            maxHeight: 300,
            objectFit: "contain",
            marginTop: 16,
          }}
        />
        <Typography sx={{ mt: 2 }}>{product.description}</Typography>
        <Typography sx={{ mt: 2 }}>
          Fiyat: <strong>{product.price} TL</strong>
        </Typography>
        <Typography>
          Puan: {product.rating.rate} ({product.rating.count} değerlendirme)
        </Typography>
      </Box>
    </Modal>
  );
}
