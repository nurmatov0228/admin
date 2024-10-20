import React, { useState } from "react";
import "../styles/login.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API = `https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin`;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      phoneNumber.trim() === "900474227" &&
      password.trim().toLowerCase() === "superadmin"
    ) {
      fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: phoneNumber,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const token = data?.data?.tokens?.accessToken?.token;
          localStorage.setItem("token", token);

          toast.success(" Xush kelibsiz admin");
          navigate("/home");
        });
    } else {
      toast.error("Phone Number or Password invialid", {
        position: "top-right",
        autoClose: 1700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <div className="input-wrapper">
            <FaRegUserCircle className="icon user-icon" />
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <RiLockPasswordLine className="icon lock-icon" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
