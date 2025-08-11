import React, { useState } from "react";
import "./../styles/CourtBookingPage.css";

const CourtBookingPage = () => {
  const venue = {
    name: "Green Valley Sports Complex",
    location: "Jaipur, Rajasthan",
    description:
      "A premium sports venue offering multiple badminton and tennis courts with professional lighting.",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=800&auto=format&fit=crop",
    courts: [
      { id: 1, name: "Court 1", price: 500 },
      { id: 2, name: "Court 2", price: 550 },
      { id: 3, name: "Court 3", price: 600 },
    ],
    timeSlots: [
      "06:00 - 07:00",
      "07:00 - 08:00",
      "08:00 - 09:00",
      "17:00 - 18:00",
      "18:00 - 19:00",
      "19:00 - 20:00",
    ],
  };

  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState("");
  const [price, setPrice] = useState(0);

  const handleCourtChange = (courtId) => {
    const court = venue.courts.find((c) => c.id === parseInt(courtId));
    setSelectedCourt(courtId);
    setPrice(court ? court.price : 0);
  };

  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  const handleBooking = async () => {
    if (!selectedCourt || !selectedDate || !selectedTime) {
      setError("Please select a court, date, and time slot.");
      return;
    }
    setError("");
    setApiError("");
    setSuccess("");
    try {
      // For demo, using venue id 1. In real app, get from route or context
      const facilityId = 1;
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/v1.0/facilities/${facilityId}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          courtId: selectedCourt,
          date: selectedDate,
          timeSlot: selectedTime,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");
      setSuccess("Booking successful!");
    } catch (err) {
      setApiError(err.message || "Booking failed");
    }
  };

  return (
    <div className="court-booking-container">
      <div className="venue-details">
        <img src={venue.image} alt={venue.name} className="venue-image" />
        <div>
          <h1>{venue.name}</h1>
          <p className="venue-location">{venue.location}</p>
          <p>{venue.description}</p>
        </div>
      </div>

      <div className="booking-form">
        <h2>Book Your Court</h2>

        <label>Court</label>
        <select
          value={selectedCourt}
          onChange={(e) => handleCourtChange(e.target.value)}
        >
          <option value="">-- Select Court --</option>
          {venue.courts.map((court) => (
            <option key={court.id} value={court.id}>
              {court.name} - ₹{court.price}
            </option>
          ))}
        </select>

        <label>Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <label>Time Slot</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">-- Select Time Slot --</option>
          {venue.timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        {price > 0 && (
          <div className="price-display">Total Price: ₹{price}</div>
        )}

  {error && <p className="error-message">{error}</p>}
  {apiError && <p className="error-message">{apiError}</p>}
  {success && <p className="success-text">{success}</p>}

        <button className="proceed-btn" onClick={handleBooking}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CourtBookingPage;
