import CartContext from "./Cart-Context";
import { useReducer } from "react";

const defaultCart={
  items:[],
  totalAmount:0,
  currentStatus:''
}
const cartReducer=(cartState,action)=>{
  if(action.type==="ADD"){
    console.log(action.item.id);
    const existingItemIndex=cartState.items.findIndex((item)=>{ return item.id===action.item.id});
    const updatedTotalAmount=cartState.totalAmount+action.item.price*action.item.quantity;
    const existingItem=cartState.items[existingItemIndex];
    let updatedItems;
    if(existingItem){
      const updatedItem={...existingItem,quantity:existingItem.quantity+action.item.quantity};
      updatedItems=[...cartState.items];
      updatedItems[existingItemIndex]=updatedItem;
    }
    else{
      updatedItems=cartState.items.concat(action.item);
    }
    return {
      items:updatedItems,
      currentStatus:'added',
      totalAmount:updatedTotalAmount
    }
  }
  if(action.type==="REMOVE"){
    console.log(action.id);
    const removeItemIndex=cartState.items.findIndex((item)=>{return item.id===action.id});
    const removeItem=cartState.items[removeItemIndex];
    const updatedTotalAmount=cartState.totalAmount-removeItem.price;
    let updatedItems;
    if(removeItem.quantity===1){
      updatedItems=cartState.items.filter((item)=>{return item.id !== action.id});
    }
    else{
      const updatedItem={...removeItem, quantity:removeItem.quantity-1};
      updatedItems=[...cartState.items];
      updatedItems[removeItemIndex]=updatedItem;
    }
    return{
      items:updatedItems,
      currentStatus:'removed',
      totalAmount:updatedTotalAmount
    }
  }
  if(action.type==='CLEAR'){
    return defaultCart;
  }
  return defaultCart;
}

const CartProvider = (props) => {

  const [cartState,dispatchCart]=useReducer(cartReducer,defaultCart);

  const addItemToCart = (item) => {
    console.log(item);
    dispatchCart({type:"ADD",item:item});
  };
  const removeItemFromCart = (id) => {
    dispatchCart({type:"REMOVE",id:id})
  };
  const clearItemsFromCart=()=>{
    dispatchCart({type:"CLEAR"});
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    currentStatus:cartState.currentStatus,
    addItem: addItemToCart,
    clearCart:clearItemsFromCart,
    removeItem: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
