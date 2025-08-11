import React, { useState } from "react";
import "./../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Enter a valid email";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log("Signup with:", name, email, password);
    // TODO: Call signup API
    navigate("/verify-email");
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? "error-input" : ""}
          required
        />
        {errors.name && <span className="error-text">{errors.name}</span>}

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
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? "error-input" : ""}
          required
        />
        {errors.password && <span className="error-text">{errors.password}</span>}

        <button type="submit">Sign Up</button>
      </form>

      <div className="link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
