import { useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import "./../styles/OwnerDashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const OwnerDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Simulated booking data
  const bookings = {
    "2025-08-11": ["Court 1 - 6:00 AM", "Court 2 - 7:00 AM"],
    "2025-08-13": ["Court 3 - 5:00 PM"],
    "2025-08-14": ["Court 1 - 8:00 AM", "Court 2 - 4:00 PM"],
  };

  // Simulated KPIs
  const totalBookings = 120;
  const activeCourts = 5;
  const earnings = 25400;

  // Chart data
  const bookingTrendsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Bookings",
        data: [10, 15, 8, 12, 20, 18, 25],
        fill: false,
        borderColor: "#4CAF50",
        tension: 0.1,
      },
    ],
  };

  const earningsData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Earnings",
        data: [5000, 7000, 4500, 8900],
        backgroundColor: ["#2196F3", "#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };

  const peakHoursData = {
    labels: ["6-8 AM", "8-10 AM", "10-12 PM", "12-2 PM", "2-4 PM", "4-6 PM", "6-8 PM"],
    datasets: [
      {
        label: "Bookings",
        data: [5, 9, 3, 2, 4, 11, 15],
        backgroundColor: "#FF9800",
      },
    ],
  };

  // Generate simple month calendar
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null); // empty slot
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const handleDateClick = (day) => {
    if (!day) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
  };

  const bookingsForDay = bookings[selectedDate] || [];

  return (
    <div className="dashboard-container">
      <h1>Welcome, Facility Owner 👋</h1>

      {/* KPI Section */}
      <div className="kpi-container">
        <div className="kpi-card">
          <h2>{totalBookings}</h2>
          <p>Total Bookings</p>
        </div>
        <div className="kpi-card">
          <h2>{activeCourts}</h2>
          <p>Active Courts</p>
        </div>
        <div className="kpi-card">
          <h2>₹{earnings.toLocaleString()}</h2>
          <p>Earnings</p>
        </div>
      </div>

      {/* Custom Calendar */}
      <div className="calendar-section">
        <div className="calendar-card">
          <h3>
            {today.toLocaleString("default", { month: "long" })} {year}
          </h3>
          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="calendar-day-header">{d}</div>
            ))}
            {calendarDays.map((day, idx) => {
              const dateStr =
                day &&
                `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const hasBooking = bookings[dateStr];
              return (
                <div
                  key={idx}
                  className={`calendar-day ${day ? "" : "empty"} ${hasBooking ? "booked" : ""} ${
                    selectedDate === dateStr ? "selected" : ""
                  }`}
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking List */}
        <div className="booking-list">
          <h4>Bookings for {selectedDate || "Select a date"}</h4>
          {bookingsForDay.length > 0 ? (
            <ul>
              {bookingsForDay.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : (
            <p>No bookings for this date.</p>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="chart-section">
        <div className="chart-card">
          <h3>Weekly Booking Trends</h3>
          <Line data={bookingTrendsData} />
        </div>

        <div className="chart-card">
          <h3>Earnings Summary</h3>
          <Doughnut data={earningsData} />
        </div>

        <div className="chart-card">
          <h3>Peak Booking Hours</h3>
          <Bar data={peakHoursData} />
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
