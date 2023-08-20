import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./CartButton.css";
import Badge from "@mui/material/Badge";
import CartContext from "../../store/Cart-Context";
import { useContext, useEffect, useState } from "react";

const CartButton = (props) => {
  const cartInfo = useContext(CartContext);
  const noOfItems = cartInfo.items.reduce((curr, item) => {
    return curr + item.quantity;
  }, 0);

  const { items,currentStatus } = cartInfo;
  const [buttonHilighted, setButtonHighlighted] = useState(false);
  useEffect(() => {
    if (items.lenght === 0) {
      return;
    }
    console.log(currentStatus);
    setButtonHighlighted(true);
    const timer = setTimeout(() => {
      setButtonHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items, currentStatus]);

  const styleClass = `cart-button ${buttonHilighted ? "cart-effect" : ""}`;
  const effect = `${styleClass} ${
    buttonHilighted
      ? currentStatus === 'added'
        ? "cartAddEffect"
        : "cartRemoveEffect"
      : ""
  }`;
  return (
    <button className={effect} onClick={props.onClick}>
      <span className="cart-icon">
        <Badge badgeContent={noOfItems} color="success" fontSize="small">
          <ShoppingBagIcon color="secondary" fontSize="large" />
        </Badge>
      </span>
      <span className="cart-txt">Your Cart</span>
    </button>
  );
};
export default CartButton;
