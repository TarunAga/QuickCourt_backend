// src/pages/Home.js
import { useState, useEffect } from "react";
import "./../styles/Home.css";

export default function Home() {
  const [matches, setMatches] = useState([]);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      setApiError("");
      try {
        const res = await fetch("http://localhost:3000/api/v1.0/facilities");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch venues");
        // Map facilities to match card format
        setMatches(data.map((f) => ({
          id: f.id,
          sport: f.sport || f.type || "Venue",
          location: f.name || f.location || "",
          time: f.nextAvailableTime || "Available",
        })));
      } catch (err) {
        setApiError(err.message || "Error fetching venues");
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  return (
    <div className="home-container">
      {/* Top Bar */}
      <header className="home-header">
        <h1>QuickCourt</h1>
        <button className="primary-btn">Book a Court</button>
      </header>

      {/* Search Section */}
      <section className="search-section">
        <input type="text" placeholder="Search by sport or location..." />
        <button className="primary-btn">Search</button>
      </section>

      {/* Matches List */}
      <section className="matches-section">
        <h2>Upcoming Matches</h2>
        <div className="matches-list">
          {loading ? (
            <div>Loading venues...</div>
          ) : apiError ? (
            <div className="error-text">{apiError}</div>
          ) : matches.length === 0 ? (
            <div>No venues found.</div>
          ) : (
            matches.map((m) => (
              <div key={m.id} className="match-card">
                <h3>{m.sport}</h3>
                <p>{m.location}</p>
                <p>{m.time}</p>
                <button className="secondary-btn">Book/Join</button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
