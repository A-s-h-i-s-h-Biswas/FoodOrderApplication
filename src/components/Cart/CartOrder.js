import { Button, Typography } from "@mui/material";
import { useRef, useState } from "react";
import "./Cart.css";
const CartOrder = (props) => {
  const enteredName = useRef();
  const enteredMobile = useRef();
  const enteredAddress = useRef();
  const enteredCity = useRef();
  const enteredPin = useRef();
  const userData = {
    name: true,
    mobile: true,
    address: true,
    city: true,
    pin: true,
  };
  const [isInValidData, setInValidData] = useState(userData);

  const isValid = (data) => {
    return data.length !== 0;
  };
  const isValidNum = (data, digit) => {
    return data.length === digit;
  };
  const confirmHandle = (event) => {
    event.preventDefault();
    const name = enteredName.current.value.trim();
    const mobile = enteredMobile.current.value.trim();
    const address = enteredAddress.current.value.trim();
    const city = enteredCity.current.value.trim();
    const pin = enteredPin.current.value.trim();

    const isValidName = isValid(name);
    const isValidMobile = isValidNum(mobile, 10);
    const isValidAddress = isValid(address);
    const isValidCity = isValid(city);
    const isValidPin = isValidNum(pin, 6);
    const isValidUserData =
      isValidName &&
      isValidMobile &&
      isValidAddress &&
      isValidCity &&
      isValidPin;

    if (!isValidUserData) {
      setInValidData({
        name: isValidName,
        mobile: isValidMobile,
        address: isValidAddress,
        city: isValidCity,
        pin: isValidPin,
      });
      return;
    }

    setInValidData(userData);
    // send data to server:
    props.sendDataHandler({
      pin: pin,
      city: city,
      name: name,
      mobile: mobile,
      address: address,
    });
  };

  const inputStyle = `order-form-item`;
  const nameStyle = `${inputStyle} ${!isInValidData.name ? "error-input" : ""}`;
  const mobileStyle = `${inputStyle} ${
    !isInValidData.mobile ? "error-input" : ""
  }`;
  const addressStyle = `${inputStyle} ${
    !isInValidData.address ? "error-input" : ""
  }`;
  const cityStyle = `order-form-item-custom ${
    !isInValidData.city ? "error-input" : ""
  }`;
  const pinStyle = `order-form-item-custom ${
    !isInValidData.pin ? "error-input" : ""
  }`;
  return (
    <>
      <Typography className="cart-header" variant="h4" component="h2">
        Make Your Order
      </Typography>
      <div>
        <form className="order-form" onSubmit={confirmHandle}>
          <div className="order-form-items">
            <input
              ref={enteredName}
              className={nameStyle}
              type="text"
              id="name"
              placeholder="Full Name"
            />
          </div>
          <div className="order-form-items">
            <input
              ref={enteredMobile}
              className={mobileStyle}
              type="mobile"
              id="phone"
              placeholder="Mobile No"
            />
          </div>
          <div className="order-form-items">
            <input
              ref={enteredAddress}
              className={addressStyle}
              type="text"
              id="address"
              placeholder="Address"
            />
          </div>
          <div className="order-form-items">
            <input
              ref={enteredCity}
              className={cityStyle}
              style={{ marginRight: "1%" }}
              type="text"
              id="city"
              placeholder="City"
            />

            <input
              ref={enteredPin}
              className={pinStyle}
              style={{ marginLeft: "1%" }}
              type="text"
              id="pinCode"
              placeholder="Pin Code"
            />
          </div>
          <div className="cart-action">
            <Button
              variant="contained"
              color="error"
              onClick={props.onClickClose}
            >
              Close
            </Button>
            <Button type="submit" variant="contained" color="success">
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CartOrder;
