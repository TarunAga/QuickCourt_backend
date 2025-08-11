import { useState } from "react";
import "./../styles/FacilityManagement.css";

const FacilityManagementPage = () => {
  const [facility, setFacility] = useState({
    name: "",
    location: "",
    description: "",
    sportsSupported: "",
    userName: "",
    court: "",
    time: "",
    status: "Booked",
    amenities: "",
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacility((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFacility((prev) => ({ ...prev, photos: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log facility info
    console.log("Facility data:", facility);
    alert("Facility data submitted (check console)");
  };

  return (
    <div className="container">
      <h2>Facility Management</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={facility.name} onChange={handleChange} required />
        </label>

        <label>
          Location:
          <input name="location" value={facility.location} onChange={handleChange} required />
        </label>

        <label>
          Description:
          <textarea name="description" value={facility.description} onChange={handleChange} />
        </label>

        <label>
          Type of Sports Supported:
          <input
            name="sportsSupported"
            value={facility.sportsSupported}
            onChange={handleChange}
            placeholder="e.g. Badminton, Tennis"
          />
        </label>

        <label>
          User Name:
          <input name="userName" value={facility.userName} onChange={handleChange} />
        </label>

        <label>
          Court:
          <input name="court" value={facility.court} onChange={handleChange} />
        </label>

        <label>
          Time:
          <input name="time" type="time" value={facility.time} onChange={handleChange} />
        </label>

        <label>
          Status:
          <select name="status" value={facility.status} onChange={handleChange}>
            <option value="Booked">Booked</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <label>
          Amenities Offered:
          <input name="amenities" value={facility.amenities} onChange={handleChange} placeholder="Comma separated" />
        </label>

        <label>
          Upload Photos:
          <input type="file" multiple onChange={handlePhotoUpload} />
        </label>

        <button type="submit">Save Facility</button>
      </form>

      {facility.photos.length > 0 && (
        <div className="photo-preview">
          <h4>Photos Preview:</h4>
          <div className="photos">
            {facility.photos.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt={`upload-${idx}`}
                style={{ width: "100px", marginRight: "10px" }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityManagementPage;
