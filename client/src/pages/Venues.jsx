import { useState } from "react";
import "./../styles/Venues.css";

const Venues = () => {
  const [filters, setFilters] = useState({
    sport: "",
    type: "",
    rating: "",
  });

  const sports = ["Badminton", "Football", "Tennis", "Cricket", "Basketball"];
  const types = ["Indoor", "Outdoor", "Mixed"];

  const venues = [
    {
      id: 1,
      name: "Sunset Badminton Arena",
      sport: "Badminton",
      type: "Indoor",
      rating: 4.5,
      price: 250,
      image: "https://via.placeholder.com/300x180?text=Badminton+Arena",
    },
    {
      id: 2,
      name: "Greenfield Turf",
      sport: "Football",
      type: "Outdoor",
      rating: 4.8,
      price: 500,
      image: "https://via.placeholder.com/300x180?text=Football+Turf",
    },
    {
      id: 3,
      name: "Skyline Tennis Courts",
      sport: "Tennis",
      type: "Outdoor",
      rating: 4.2,
      price: 350,
      image: "https://via.placeholder.com/300x180?text=Tennis+Court",
    },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredVenues = venues.filter((v) => {
    return (
      (filters.sport ? v.sport === filters.sport : true) &&
      (filters.type ? v.type === filters.type : true) &&
      (filters.rating ? v.rating >= Number(filters.rating) : true)
    );
  });

  return (
    <div className="venues-page">
      <h1 className="title">Find Your Perfect Venue</h1>

      {/* Filters */}
      <div className="filters">
        <select
          name="sport"
          value={filters.sport}
          onChange={handleFilterChange}
        >
          <option value="">Select Sport</option>
          {sports.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>

        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
        >
          <option value="">Select Venue Type</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
        >
          <option value="">Min Rating</option>
          <option value="4.5">4.5+</option>
          <option value="4">4+</option>
          <option value="3.5">3.5+</option>
        </select>
      </div>

      {/* Venue List */}
      <div className="venues-grid">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <img src={venue.image} alt={venue.name} />
              <div className="venue-info">
                <h3>{venue.name}</h3>
                <p>{venue.sport} • {venue.type}</p>
                <p>⭐ {venue.rating}</p>
                <p>₹{venue.price} / hour</p>
                <button className="book-btn">Book Now</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No venues match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default Venues;
