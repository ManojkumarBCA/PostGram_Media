import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { BiLogInCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../Actions/User";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography
          variant="h3"
          style={{
            padding: "10px",
            fontFamily: "Garamond",
            fontSize: "20px",
            color: "black",
          }}
        >
          PLEASE LOGIN YOUR SELF
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot/password">
          <Typography
            style={{
              padding: "10px",
              color: "#474787",
            }}
          >
            Forgot Password?
          </Typography>
        </Link>

        <button type="submit" className="button"
        ><BiLogInCircle/>LOGIN</button>

        <Link to="/register">
          <Typography
            style={{
              padding: "1px",
              color: "#474787",
            }}
          >
            New User?
          </Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
