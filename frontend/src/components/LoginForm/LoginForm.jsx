import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
   
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      
      if (response.ok) {
        if (result.success) {
          dispatch(setUser({ user:result.user, token:result.token }));
          toast.success(result.message || "user loggined successfully", {
            autoClose: 1500,
            onClose: () => navigate("/home"),
          });

        } else {
          toast.error(result.message);
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error login:", error);
      toast.error("An error occurred.Please try again later");
    }
  };

  const handleSignup = () => {
    navigate("/register");
  };

  return (
    <div className="body">
      <div className="container">
        <div className="form-wrapper">
          <h2 className="title"> Login </h2>
          <form className="form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button" onClick={handleLogin}>
              Login
            </button>
          </form>
          <p className="footer-text">
            Don't have an account?{" "}
            <a href="" onClick={handleSignup}>
              Sign up
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;
