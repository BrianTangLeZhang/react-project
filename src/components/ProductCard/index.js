import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions,Typography } from "@mui/material";

const placeholderImage = "https://www.khalsaacademy.co.in/wp-content/uploads/2018/11/image-not-available.jpg";
export default function ProductCard(props) {
  const navigate = useNavigate()
  const { product, type } = props;
  return (
    <Card sx={{ maxWidth: "100%" }} raised onClick={()=>navigate(`/product/${product.id}`)} >
       {product.image ? (
          <CardMedia
            component="img"
            height="350"
            sx={{ objectFit: "cover" ,height: "300px" }}
            image={product.image}
            alt={product.name}
          />
        ) : (
      <CardMedia
        component="img"
        height="350"
        sx={{objectFit:"cover" ,height: "300px"}}
        image={placeholderImage}
      />
       )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body3" color="text.secondary">
          RM {product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
        }}>
          {product.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
