import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MealForm from "./MealForm";
import CartContext from "../../store/Cart-Context";
import "./Available.css";
const Container = (props) => {
  const cartInfo = useContext(CartContext);
  const addToCartHandler = (quantity) => {
    console.log("I have reached!!!");
    cartInfo.addItem({
      id: props.id,
      img: props.img,
      title: props.title,
      type: props.type,
      price: props.price,
      quantity: quantity,
      description: props.description,
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="container-margin">
      <CardActionArea>
        <CardMedia
          className="foodImg"
          component="img"
          height="220"
          image={props.img}
          alt="Food Item"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <span>{props.title}</span>
          </Typography>
          <Typography
            className="title-price"
            gutterBottom
            variant="h5"
            component="div"
          >
            <span>
              <span className="rating-color">
                <span style={{ color: "white" }}>{props.rating}</span>
                <StarIcon fontSize="small" sx={{ color: "white" }} />
              </span>
            </span>
            <span>${props.price.toFixed(2)}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <MealForm className="mealform" onAddToCart={addToCartHandler} />
      </CardActionArea>
    </Card>
  );
};
export default Container;
