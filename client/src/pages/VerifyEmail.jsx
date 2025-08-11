import AuthLayout from "./AuthLayout";
import React, { useState } from "react";
import "./../styles/auth.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  // Try to get email from navigation state, fallback to prompt
  const email = location.state?.email || window.localStorage.getItem("pendingEmail") || "";

  React.useEffect(() => {
    if (location.state?.email) {
      window.localStorage.setItem("pendingEmail", location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccess("");
    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be a 6-digit number");
      return;
    }
    setError("");
    if (!email) {
      setApiError("Missing email. Please sign up again.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/v1.0/users/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.message || "Verification failed");
        return;
      }
      setSuccess("Email verified! You can now log in.");
      window.localStorage.removeItem("pendingEmail");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setApiError("Network error. Please try again.");
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccess("");
    if (!email) {
      setApiError("Missing email. Please sign up again.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/v1.0/users/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.message || "Failed to resend OTP");
        return;
      }
      setSuccess("OTP resent to your email.");
    } catch (err) {
      setApiError("Network error. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <h2>Verify Email</h2>
      <p className="sub-text">Enter the OTP sent to your email</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className={error ? "error-input" : ""}
          required
        />
        {error && <span className="error-text">{error}</span>}
        {apiError && <div className="error-text" style={{ marginTop: 8 }}>{apiError}</div>}
        {success && <div className="success-text" style={{ marginTop: 8 }}>{success}</div>}
        <button type="submit">Verify</button>
      </form>

      <div className="link">
        Didn’t receive the OTP? <a href="#" onClick={handleResend}>Resend</a>
      </div>
    </AuthLayout>
  );
}
