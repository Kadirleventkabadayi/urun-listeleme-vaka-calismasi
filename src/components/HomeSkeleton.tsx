import { Card, CardContent, CardMedia, Skeleton } from "@mui/material";

export default function HomeSkeleton() {
  return (
    <Card sx={{ width: "18vw", height: "18vw" }}>
      <CardMedia>
        <Skeleton variant="rectangular" height={160} />
      </CardMedia>
      <CardContent>
        <Skeleton variant="text" height={30} width="80%" />
        <Skeleton variant="text" height={20} width="40%" />
        <Skeleton variant="text" height={20} width="60%" />
      </CardContent>
    </Card>
  );
}
