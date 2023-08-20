import Input from "../UI/Input";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import './Available.css'
const MealForm = (props) => {
  const enteredQuantity=useRef();
  const [invalidQuantity,setInvalidQuantity]=useState(false);

  const submitHandler=(event)=>{
    event.preventDefault();
    const quantityVal=enteredQuantity.current.value;
    const quantity=+quantityVal;
    console.log(quantity);
    if(quantityVal.trim().length===0 || quantity <1 || quantity >10){
      setInvalidQuantity(true);
      return;
    }
    setInvalidQuantity(false);
    props.onAddToCart(quantity);
  }
  return (
    <form className="mealform" onSubmit={submitHandler}>
      <Input
        ref={enteredQuantity}
        label="price"
        input={{
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          // defaultValue: "1",
          placeholder:"Quantity"
        }}
      />
      {invalidQuantity && alert("Please Enter a Valid Quantity (1-10)")}
      <Button  type='submit' variant="contained" color="error" >
        Add to Cart
      </Button>
    </form>
  );
};
export default MealForm;
