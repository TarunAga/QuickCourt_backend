import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setApiError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/v1.0/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");
        setBookings(data);
      } catch (err) {
        setApiError(err.message || "Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setUserLoading(true);
      setUserError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/v1.0/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch user");
        setUser(data);
      } catch (err) {
        setUserError(err.message || "Error fetching user");
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => b.status === "Cancelled");

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/v1.0/bookings/${id}/cancel`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to cancel booking");
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Cancelled", canCancel: false } : b)));
    } catch (err) {
      setApiError(err.message || "Error cancelling booking");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="profile-page">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-pic"></div>
        {userLoading ? (
          <div>Loading user...</div>
        ) : userError ? (
          <div className="error-text">{userError}</div>
        ) : user ? (
          <>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.phone || "No phone"}</p>
            <p>{user.email}</p>
          </>
        ) : null}
  <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
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
          {loading ? (
            <div>Loading bookings...</div>
          ) : apiError ? (
            <div className="error-text">{apiError}</div>
          ) : filteredBookings.length === 0 ? (
            <div>No bookings found.</div>
          ) : (
            filteredBookings.map((booking) => (
              <div className="booking-card" key={booking.id}>
                <h4>
                  {booking.court || booking.facilityName} <span className="type">({booking.type || booking.sport})</span>
                </h4>
                <p>📅 {booking.date || booking.bookingDate} | 🕒 {booking.time || booking.bookingTime}</p>
                <p>📍 {booking.location || booking.facilityLocation}</p>
                <p>Status: <span className="status">{booking.status}</span></p>
                <div className="booking-actions">
                  {booking.canCancel && booking.status !== "Cancelled" && (
                    <button className="cancel-btn" onClick={() => handleCancel(booking.id)}>Cancel Booking</button>
                  )}
                  <button className="review-btn">Write Review</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
