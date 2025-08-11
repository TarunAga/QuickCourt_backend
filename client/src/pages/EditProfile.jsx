import { useState } from "react";
import "./../styles/profile.css";

export default function EditProfile() {
  const [name, setName] = useState("Mitchell Admin");
  const [phone, setPhone] = useState("9999999999");
  const [email, setEmail] = useState("mitchelladmin2017@gmail.com");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
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
    console.log("Updated profile:", { name, phone, email, password });
    alert("Profile updated successfully!");
    // TODO: Call API
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
        </form>
      </div>
    </div>
  );
}
