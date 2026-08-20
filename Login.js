import React, { useState } from "react";
import "./Login.css";
// Make sure this file exists in your src/ folder (or update path accordingly)
import scLogo from "./sc-logo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
  };

  return (
    <div className="sc-login-container">
      {/* Left Visual Hero Section */}
      <div className="sc-hero-panel">
        <div className="sc-hero-overlay"></div>
        <div className="sc-hero-content">
          <div className="sc-accent-bar">
            <span className="bar-blue"></span>
            <span className="bar-green"></span>
          </div>
          <span className="sc-badge">Digital Banking Portal</span>
          <h1>Insights for today’s multipolar world</h1>
          <p>
            Secure, intelligent banking designed to help you navigate global
            markets and manage your portfolio seamlessly.
          </p>
          <div className="sc-trust-footer">
            <span>Enterprise-grade 256-bit encryption</span>
          </div>
        </div>
      </div>

      {/* Right Login Form Section */}
      <div className="sc-form-panel">
        <div className="sc-form-wrapper">
          {/* Brand Header with Exact Logo Image */}
          <div className="sc-brand-header">
            <img
              src={scLogo}
              alt="Standard Chartered"
              className="sc-brand-image"
            />
            <div className="sc-brand-title">
              <h2>standard</h2>
              <h2>chartered</h2>
            </div>
          </div>

          <div className="sc-welcome-text">
            <h3>Welcome back</h3>
            <p>Please enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="sc-form">
            <div className="input-group">
              <label htmlFor="username">Username / ID</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="e.g. yourname@domain.com"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sc-form-options">
              <a href="#forgot" className="sc-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="sc-submit-btn">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
