import { Typography } from "@mui/material";
// import BannerImg from "../../Assets/bannerImg.jpg";
import { useState,useEffect } from "react";
import CartButton from "./CartButton";
import "./header.css";
const Header = (props) => {
  const img =
    "https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png";

  const [isImgEffectOn, setImgEffect]=useState(false);

  useEffect(()=>{
    setImgEffect(true);
    const timer=setTimeout(()=>{
      setImgEffect(false);
    },300);
    return ()=>{clearTimeout(timer)};
  },[]);
  const imgStyle=`header-img ${isImgEffectOn ? "img-effect":''}`;
  return (
    <>
      <header className="header">
        <h1 className="header-title">FOODY</h1>
        <CartButton className="header-title" onClick={props.onClickOpen} />
      </header>
      <div className="div-header">
        <img src={img} alt="Food Banner" className={imgStyle}/>
        <div className="banner-txt">
            <Typography variant="h2" component='h1'  className="banner-title">FOODY</Typography>
            <Typography variant="h4">Find The Best Restaurants, Cafés<br/> and Bars in India</Typography>
        </div>
      </div>
    </>
  );
};
export default Header;
