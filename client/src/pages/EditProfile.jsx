import React, { useState, useEffect } from "react";
import "./../styles/profile.css";


export default function EditProfile() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setApiError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/v1.0/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
        setName((data.firstName || "") + (data.lastName ? " " + data.lastName : ""));
        setPhone(data.phone || "");
        setEmail(data.email || "");
      } catch (err) {
        setApiError(err.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";
    if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone must be a 10-digit number";
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Enter a valid email";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setApiError("");
    setSuccess("");
    // Split name into first and last
    const [firstName, ...rest] = name.trim().split(" ");
    const lastName = rest.join(" ");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/v1.0/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ firstName, lastName, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setApiError(err.message || "Error updating profile");
    }
  };

  return (
    <div className="profile-page center-content">
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>

        {/* Profile Picture Upload */}
        <div className="edit-profile-pic">
          <div className="profile-pic"></div>
          <input type="file" accept="image/*" />
        </div>

        {/* Form */}
        <>
        {loading ? (
          <div>Loading profile...</div>
        ) : apiError ? (
          <div className="error-text">{apiError}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "error-input" : ""}
              required
            />
            {errors.name && <span className="error-text">{errors.name}</span>}

            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={errors.phone ? "error-input" : ""}
              required
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}

            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "error-input" : ""}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}

            <label>New Password (optional)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="save-btn">Save Changes</button>
            {success && <div className="success-text" style={{ marginTop: 8 }}>{success}</div>}
          </form>
        )}
        </>
      </div>
    </div>
  );
}
