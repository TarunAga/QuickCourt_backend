
import React, { useState } from "react";
import "./../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Enter a valid email";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setApiError("");
    try {
      const res = await fetch("http://localhost:3000/api/v1.0/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.message || "Login failed");
        return;
      }
      // Save token to localStorage (or context)
      localStorage.setItem("token", data.token);
      navigate("/profile-page");
    } catch (err) {
      setApiError("Network error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
  <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? "error-input" : ""}
          required
        />
        {errors.email && <span className="error-text">{errors.email}</span>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? "error-input" : ""}
          required
        />
        {errors.password && <span className="error-text">{errors.password}</span>}

  <button type="submit">Login</button>
  {apiError && <div className="error-text" style={{ marginTop: 8 }}>{apiError}</div>}
      </form>

      <div className="link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
