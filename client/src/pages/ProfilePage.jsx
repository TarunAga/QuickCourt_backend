import "./../styles/profile.css";
import React, { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("all");

  const bookings = [
    {
      id: 1,
      court: "Skyline Badminton Court",
      type: "Badminton",
      date: "18 June 2025",
      time: "5:00 PM - 6:00 PM",
      location: "Rajkot, Gujarat",
      status: "Confirmed",
      canCancel: true,
    },
    {
      id: 2,
      court: "Skyline Badminton Court",
      type: "Badminton",
      date: "10 June 2024",
      time: "5:00 PM - 6:00 PM",
      location: "Rajkot, Gujarat",
      status: "Confirmed",
      canCancel: false,
    },
  ];

  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => !b.canCancel);

  return (
    <div className="profile-page">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-pic"></div>
        <h3>Mitchell Admin</h3>
        <p>9999999999</p>
        <p>mitchelladmin2017@gmail.com</p>
        <button>Edit Profile</button>
        <button className={activeTab === "all" ? "active-btn" : ""}>All Bookings</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={activeTab === "all" ? "tab active" : "tab"}
            onClick={() => setActiveTab("all")}
          >
            All Bookings
          </button>
          <button
            className={activeTab === "cancelled" ? "tab active" : "tab"}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled
          </button>
        </div>

        {/* Bookings */}
        <div className="bookings">
          {filteredBookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <h4>
                {booking.court} <span className="type">({booking.type})</span>
              </h4>
              <p>📅 {booking.date} | 🕒 {booking.time}</p>
              <p>📍 {booking.location}</p>
              <p>Status: <span className="status">{booking.status}</span></p>
              <div className="booking-actions">
                {booking.canCancel && (
                  <button className="cancel-btn">Cancel Booking</button>
                )}
                <button className="review-btn">Write Review</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
