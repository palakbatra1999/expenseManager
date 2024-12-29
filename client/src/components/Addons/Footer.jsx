import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import axios from "axios";

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear field-specific error
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters long.";
    return newErrors;
  };

  const saveFeedback = async (formData) => {
    try {
      const response = await axios.post(
        "https://expensemanager-uua6.onrender.com/api/v1/auth/feedback",
        formData
      );
      console.log("Response: ", response);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Form Submitted: ", formData);
    await saveFeedback(formData);
    setSuccessMessage(
      "Thank you for your message! We'll get back to you shortly."
    );
    setFormData({ name: "", email: "", message: "" });
    setIsOpen(false);
  };

  return (
    <footer
      style={{
        backgroundColor: "#343a40",
        color: "#ffffff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0 }}>All rights reserved &copy; PalakBatra</p>
      <Link
        style={{
          color: "#17a2b8",
          textDecoration: "none",
          display: "inline-block",
          marginTop: "10px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "1px solid color: #00C9A7",
          backgroundColor: "#343a40",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (
          (e.target.style.backgroundColor = "#17a2b8"),
          (e.target.style.color = "#ffffff")
        )}
        onMouseOut={(e) => (
          (e.target.style.backgroundColor = "#343a40"),
          (e.target.style.color = "#17a2b8")
        )}
        onClick={() => setIsOpen(true)}
      >
        Contact Us
      </Link>

      {/* Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "400px",
              background: "#ffffff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              position: "relative",
              textAlign: "center",
            }}
          >
            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
              <h1
                style={{
                  fontSize: "24px", 
                  marginBottom: "20px",
                  color: "#000000",
                }}
              >
                Feedback
              </h1>
              <h3
                style={{
                  fontSize: "14px",
                  color: "#6c757d",
                  margin: "0 0 20px",
                }}
                >
                Email:{" "}
                <a
                  href="mailto:palak99batra@gmail.com"
                  style={{
                    color: "#17a2b8",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.textDecoration = "underline")
                  }
                  onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                >
                  palak99batra@gmail.com
                </a>
              </h3>

              <p
                style={{
                  fontSize: "14px",
                  color: "#6c757d",
                  margin: "0 0 20px",
                }}
              >
                Contact no: 9991029976
              </p>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              ></textarea>
              {errors.message && (
                <p style={{ color: "red" }}>{errors.message}</p>
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#17a2b8",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </form>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#999",
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
