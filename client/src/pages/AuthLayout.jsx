import "./../styles/auth.css";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-wrapper">
      <aside className="auth-info">
        <div className="auth-info-inner">
          <h1 className="brand">QuickCourt</h1>
          <p className="tagline">
            Book local courts, join matches, and connect with players nearby —
            fast and fuss-free.
          </p>

          <p className="desc">
            QuickCourt is a platform that enables sports enthusiasts to book local
            sports facilities (e.g., badminton courts, turf grounds, tennis tables)
            and create or join matches with others in their area. We focus on
            booking accuracy, seamless UX and community play.
          </p>

          <ul className="feature-list">
            <li>🎯 Real-time court availability</li>
            <li>🤝 Create or join local matches</li>
            <li>📍 Nearby courts & smart search</li>
            <li>🔒 Secure bookings & payments</li>
          </ul>

          <div className="accent-shape" aria-hidden="true" />
        </div>
      </aside>

      <main className="auth-form">
        <div className="auth-container">
          {children}
        </div>
      </main>
    </div>
  );
}
