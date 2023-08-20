import CartOrder from "./CartOrder";
import CartContext from "../../store/Cart-Context";
import { useState, useContext } from "react";
import ModalOverlay from "../UI/Modal";
import CartItems from "./CartItems";
import "./Cart.css";
import { Button, Typography } from "@mui/material";

const Cart = (props) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const cartInfo = useContext(CartContext);
  const [isSubmiting, setSubmiting] = useState(false);
  const [isSubmited, setSubmited] = useState(false);
  const [isHttpError, setHttpError] = useState(false);
  const successStatus = <>
    <Typography variant="h4">Placed Successfully!</Typography>
    <Button color="success" onClick={props.onClickClose}>Close</Button>
    </>;
  const errorStatus = <>
    <Typography variant="h5">Failed to Order!</Typography>
    <Button color="error" onClick={props.onClickClose}>Close</Button>
    </>;
  const loading = (
    <Typography variant="h5">Making Order.......</Typography>
  );
  const orderHandler = () => {
    setCheckingOut(true);
  };
  const sendDataToServer = async (userData) => {
    setSubmiting(true);
    try {
      const response = await fetch(
        "https://food-ordering-app-1cbcc-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            userData: userData,
            orderedItems: cartInfo.items,
          }),
          headers: { "Context-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send the data to server");
      }
      setSubmiting(false);
      setSubmited(true);
      cartInfo.clearCart();
    } catch (error) {
      setHttpError(true);
      setSubmiting(false);
    }
  };

  return (
    <ModalOverlay>
      {isSubmiting && loading}
      {isSubmited && successStatus}
      {isHttpError && errorStatus}
      {!isSubmiting && !isSubmited && !isHttpError && checkingOut && (
        <CartOrder
          onClickClose={props.onClickClose}
          sendDataHandler={sendDataToServer}
        />
      )}
      {!isSubmiting && !isSubmited && !isHttpError && !checkingOut && (
        <CartItems onOrder={orderHandler} onClickClose={props.onClickClose} />
      )}
    </ModalOverlay>
  );
};
export default Cart;
