import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../Addons/Layout.jsx";
import toast from "react-hot-toast";
import '../../App.css';


const InputField = ({ type, id, placeholder, value, onChange, required = true }) => (
  <div className="mb-3">
    <input
      type={type}
      className="form-control custom-input"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      aria-label={placeholder}
    />
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    answer: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/register", formData);
      if (res.status === 200 || res.status === 201) {
        toast.success("User registered successfully. Please login.");
        console.log("User registered successfully. Please login.");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
 
    <Layout>
       <div class="register">
       <div class="register-container">
      <div className="register-page">
        <div className="register-card">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              type="text"
              id="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />
            <InputField
              type="text"
              id="answer"
              placeholder="What is your pet's name?"
              value={formData.answer}
              onChange={handleChange}
            />
            <InputField
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn custom-btn w-100 custom-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
      </div>
      </div>
    </Layout>
   
  );
};

export default Register;
