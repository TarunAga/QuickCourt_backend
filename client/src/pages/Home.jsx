// src/pages/Home.js
import { useState, useEffect } from "react";
import "./../styles/Home.css";

export default function Home() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // dummy data for now
    setMatches([
      { id: 1, sport: "Badminton", location: "City Sports Club", time: "Today 6 PM" },
      { id: 2, sport: "Tennis", location: "Sunrise Courts", time: "Tomorrow 7 AM" },
      { id: 3, sport: "Football", location: "Green Turf", time: "Sat 5 PM" },
    ]);
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
          {matches.map((m) => (
            <div key={m.id} className="match-card">
              <h3>{m.sport}</h3>
              <p>{m.location}</p>
              <p>{m.time}</p>
              <button className="secondary-btn">Join Match</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
