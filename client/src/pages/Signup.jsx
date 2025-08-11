import React, { useState } from "react";
import "./../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../utils/secureApi.js";
import { passwordStrength, emailValidator, inputSanitizer } from "../utils/validation.js";
import AuthLayout from "./AuthLayout";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User"); // default role
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [passwordStrengthInfo, setPasswordStrengthInfo] = useState(null);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (newPassword) {
      setPasswordStrengthInfo(passwordStrength.checkStrength(newPassword));
    } else {
      setPasswordStrengthInfo(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    
    // Sanitize inputs
    const sanitizedName = inputSanitizer.sanitizeName(name);
    const sanitizedEmail = emailValidator.normalize(email);
    
    // Validation
    if (sanitizedName.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!emailValidator.isValid(sanitizedEmail)) {
      newErrors.email = "Enter a valid email";
    }
    
    const passwordValidation = passwordStrength.isValidFormat(password);
    if (!passwordValidation.isValid) {
      newErrors.password = Object.values(passwordValidation.errors).filter(Boolean).join(', ');
    }

    // Validate role - must be either 'User' or 'Facility Owner'
    if (!["User", "Facility Owner"].includes(role)) {
      newErrors.role = "Select a valid role";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setApiError("");
    // Split name into first and last
    const [firstName, ...rest] = sanitizedName.trim().split(" ");
    const lastName = rest.join(" ");
    try {
      const data = await API.user.register({ 
        email: sanitizedEmail, 
        password, 
        firstName, 
        lastName,
        role  // send role here
      });
      navigate("/verify-email", { state: { email: sanitizedEmail } });
    } catch (err) {
      setApiError(err.message || "Signup failed");
    }
  };

  return (
    <AuthLayout>
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
          placeholder="Password (min 8 characters, mixed case, numbers, symbols)"
          value={password}
          onChange={handlePasswordChange}
          className={errors.password ? "error-input" : ""}
          required
        />
        {passwordStrengthInfo && (
          <div className="password-strength" style={{ marginBottom: '8px' }}>
            <div 
              className="strength-bar" 
              style={{ 
                width: '100%', 
                height: '4px', 
                backgroundColor: '#eee', 
                borderRadius: '2px',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{ 
                  width: `${(passwordStrengthInfo.score / 6) * 100}%`, 
                  height: '100%', 
                  backgroundColor: passwordStrengthInfo.color,
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
            <div style={{ fontSize: '12px', color: passwordStrengthInfo.color, marginTop: '4px' }}>
              Strength: {passwordStrengthInfo.strength}
            </div>
            {passwordStrengthInfo.feedback.length > 0 && (
              <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                {passwordStrengthInfo.feedback.join(', ')}
              </div>
            )}
          </div>
        )}
        {errors.password && <span className="error-text">{errors.password}</span>}

        {/* Role dropdown */}
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          className={errors.role ? "error-input" : ""}
          required
        >
          <option value="User">User</option>
          <option value="Facility Owner">Facility Owner</option>
        </select>
        {errors.role && <span className="error-text">{errors.role}</span>}

        <button type="submit">Sign Up</button>
        {apiError && <div className="error-text" style={{ marginTop: 8 }}>{apiError}</div>}
      </form>

      <div className="link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </AuthLayout>
  );
}
