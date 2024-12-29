import React, { useState } from 'react';
import '../../App.css';
import axios from 'axios';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth.js';
import Layout from '../Addons/Layout';
import toast from 'react-hot-toast';

const Login = () => {
  const { auth, setAuth } = useAuth();
  const [mailadd, setEmail] = useState("");
  const [passadd, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    // Email validation
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        newErrors.email = "Email is required.";
      } else if (!emailRegex.test(value)) {
        newErrors.email = "Please enter a valid email address.";
      } else {
        newErrors.email = "";
      }
    }

    // Password validation
    if (field === "password") {
      if (!value.trim()) {
        newErrors.password = "Password is required.";
      } else if (value.length < 6) {
        newErrors.password = "Password must be at least 6 characters long.";
      } else {
        newErrors.password = "";
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform final validation check
    if (errors.email || errors.password || !mailadd || !passadd) {
      toast.error("Please fix validation errors before submitting.");
      return;
    }

    try {
      const res = await axios.post(
        'https://expensemanager-uua6.onrender.com/api/v1/auth/login',
        { email: mailadd, password: passadd }
      );

      if (res && res.status === 200) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success("Login successful");
        navigate(location.state?.from || "/homepage");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong!");
      } else if (error.request) {
        toast.error("Network error. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            id="email"
            value={mailadd}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
            placeholder="Enter your email address"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passadd}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField("password", e.target.value);
            }}
            placeholder="*******"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div>
          <button className="btn custom-btn w-100" type="submit">
            Login
          </button>
        </div>
      </form>

      <div className="register-section">
        <p className="register-label">Or Register if you are new.</p>
        <NavLink className="register-button" to="/register">Sign up</NavLink>
      </div>
    </Layout>
  );
};

export default Login;
