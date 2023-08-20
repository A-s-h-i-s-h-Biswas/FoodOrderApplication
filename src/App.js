import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import './index.css';
import { useState, useEffect } from "react";
import CartProvider from "./store/Cart-Provider";
function App() {
  const [cartOpen,isCartOpen]=useState(false);
  const [isLoading, setLoading]=useState(false);
  useEffect(()=>{
    setLoading(true);
    const timer=setTimeout(()=>{
      setLoading(false);
    },1000);
    return ()=>{clearTimeout(timer)};
  },[]);
  const openCartHandler=()=>{
    isCartOpen(true);
  };
  const closeCartHandler=()=>{
    isCartOpen(false);
  };
  
  return(
    <CartProvider>
      {cartOpen && <Cart onClickClose={closeCartHandler}/>}
      {!isLoading && <Header onClickOpen={openCartHandler} />}
      {isLoading && <section className="div"></section>}
      <Meals />
    </CartProvider>
  );
}

export default App;
