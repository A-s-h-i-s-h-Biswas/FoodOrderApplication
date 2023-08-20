import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
const AuthForm = (props) => {
  const isLogin = props.name === "login";
  const extraData = isLogin ? "Do no have an account?" : "Have an account?";
  const extraButton = isLogin ? "Create an account" : "Login to your account";
  return (
    <div className="form-container">
    <Typography className="align-center" variant="h2">FOODY</Typography>
      <form className="form-div">
        <div className="form-items">
          <input className="form-item" type="email" placeholder="Enter your email" />
        </div>
        <div className="form-items">
          <input className="form-item" type="password" placeholder="Enter your password" />
        </div>
        <div className="form-items">
          <Button sx={{background:rgb(239, 79, 95)}}>{props.name}</Button>
          <p className="align-center">{extraData}</p>
          <Button color="success">{extraButton}</Button>
        </div>
      </form>
    </div>
  );
};
export default AuthForm;
