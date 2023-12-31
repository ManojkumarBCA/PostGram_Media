import { Avatar,Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../Actions/User";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      registerUser(name, bio, address, profession, email, password, avatar)
    );
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, alert]);
  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography
          variant="h3"
          style={{
            padding: "10px",
            fontFamily: "Garamond",
            fontSize: "20px",
            color: "black",
          }}
        >
          PLEASE REGISTER YOUR SELF
        </Typography>

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "7vmax", width: "7vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="registerInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          value={bio}
          placeholder="Bio"
          className="registerInputs"
          required
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="text"
          value={address}
          placeholder="Address"
          className="registerInputs"
          required
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          value={profession}
          placeholder="Profession"
          className="registerInputs"
          required
          onChange={(e) => setProfession(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="registerInputs"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/">
          <Typography
            style={{
              padding: "5px",
              color: "#474787",
            }}
          >
            Already Signed Up? Login Now
          </Typography>
        </Link>

        <button className="button" disabled={loading} type="submit" >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
