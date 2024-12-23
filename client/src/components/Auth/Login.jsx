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

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
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
        console.log("Server responded with error:", error.response.data.message);
        toast.error(error.response.data.message || "Something went wrong!");
      } else if (error.request) {
        console.log("Network error:", error.request);
        toast.error("Network error. Please try again.");
      } else {
        console.log("Error:", error.message);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <Layout>
      <form onSubmit={handlesubmit}>
        <div className="form-control">
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            id="email"
            value={mailadd}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passadd}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
          />
        </div>

        <div>
          <button className="btn custom-btn w-100" type="submit">
            Login
          </button>
        </div>
      </form>

      <div>
        <br />
        <label>Or Register if you are new.</label>
        <NavLink className="btn" to="/register">Sign up</NavLink>
      </div>
    </Layout>
  );
};

export default Login;
