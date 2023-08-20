import { Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CartContext from "../../store/Cart-Context";
import { useContext} from "react";
import "./Cart.css";

const CartItems = (props) => {
  const cartInfo = useContext(CartContext);

  const MealItems = cartInfo.items;
  let CartHerder = "Do Order Now!";
  let alert = "Oops! Your Cart is Empty";
  if (MealItems.length === 0) {
    CartHerder = "Add Favourite Dishes!";
  }
  const totalAmount = cartInfo.totalAmount.toFixed(2);

  const addToCartHandler=(item)=>{
    cartInfo.addItem({...item,quantity:1});
  }
  const removeFromCartHandle=(id)=>{
    cartInfo.removeItem(id);
  }

  return (
    <>
      {MealItems.length === 0 && (
        <Typography className="cart-header">{alert}</Typography>
      )}
      <Typography className="cart-header" variant="h4" component="h2">
        {CartHerder}
      </Typography>
      <div className="cart-scroll">
        {MealItems.map((item) => {
          return (
            <div className="cart-items" key={item.id}>
              <span className="item-general">
                <img className="item-img" src={item.img} alt="Food Img" />
                {item.title}
              </span>
              {/* <span className="item-general"></span> */}
              <span className="item-general">
                <span>${item.price.toFixed(2)}</span>
                <span>Quant:{item.quantity}</span>
                <span className="item-action">
                  <AddCircleIcon color="success" size="medium" className="add-remove"  onClick={addToCartHandler.bind(null,item)}/>
                  <RemoveCircleIcon color="error" size='medium' className="add-remove" onClick={removeFromCartHandle.bind(null,item.id)}/>
                </span>
              </span>
            </div>
          );
        })}
      </div>
      <div className="cart-summary">
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      <div className="cart-action">
        <Button variant="contained" color="error" onClick={props.onClickClose}>
          Close
        </Button>
        {MealItems.length !== 0 && (
          <Button variant="contained" color="success" onClick={props.onOrder}>
            Order
          </Button>
        )}
      </div>
    </>
  );
};
export default CartItems;
