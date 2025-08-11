import React, { useState } from "react";
import "./../styles/auth.css";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be a 6-digit number");
      return;
    }
    setError("");
    console.log("Verify with OTP:", otp);
    // TODO: Call verify API
  };

  return (
    <div className="auth-container">
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
        <button type="submit">Verify</button>
      </form>

      <div className="link">
        Didn’t receive the OTP? <a href="#">Resend</a>
      </div>
    </div>
  );
}
