import Skeleton from "@mui/material/Skeleton";

const HeaderSkeleton = () => (
  <Skeleton
    variant="rectangular"
    width="100%"
    height={64}
    animation="wave"
    sx={{ display: "block", bgcolor: "lightgray" }}
  />
);

export default HeaderSkeleton;
