import { useState } from "react";
import "./../styles/FacilityManagement.css";

const CourtManagementPage = () => {
  const [court, setCourt] = useState({
    courtName: "",
    sportType: "",
    pricePerHour: "",
    operatingHours: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourt((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Court data:", court);
    alert("Court data submitted (check console)");
  };

  return (
    <div className="container">
      <h2>Court Management</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Court Name:
          <input name="courtName" value={court.courtName} onChange={handleChange} required />
        </label>

        <label>
          Sport Type:
          <input name="sportType" value={court.sportType} onChange={handleChange} placeholder="e.g. Tennis" />
        </label>

        <label>
          Pricing per Hour:
          <input
            name="pricePerHour"
            type="number"
            min="0"
            step="0.01"
            value={court.pricePerHour}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Operating Hours:
          <input
            name="operatingHours"
            type="text"
            value={court.operatingHours}
            onChange={handleChange}
            placeholder="e.g. 8 AM - 10 PM"
          />
        </label>

        <button type="submit">Save Court</button>
      </form>
    </div>
  );
};

export default CourtManagementPage;
