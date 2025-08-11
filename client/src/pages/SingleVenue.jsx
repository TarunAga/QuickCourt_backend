import { useState } from "react";
import "./../styles/SingleVenue.css";

const SingleVenue = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: "John D.", rating: 5, comment: "Great place, well maintained!" },
    { id: 2, name: "Priya S.", rating: 4, comment: "Good facilities, bit pricey." },
  ]);

  const [newReview, setNewReview] = useState({ name: "", rating: "", comment: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};
    if (!newReview.name.trim()) tempErrors.name = "Name is required";
    if (!newReview.rating) tempErrors.rating = "Rating is required";
    if (!newReview.comment.trim()) tempErrors.comment = "Comment is required";
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      setReviews([{ ...newReview, id: Date.now() }, ...reviews]);
      setNewReview({ name: "", rating: "", comment: "" });
    }
  };

  return (
    <div className="venue-page">
      {/* Hero Section */}
      <div className="venue-hero">
        <h1>Green Turf Arena</h1>
        <p>⚽ Football | 📍 Jaipur, Rajasthan</p>
        <p className="venue-rating">⭐ 4.5 (120 reviews)</p>
        <button className="book-btn">Book Now</button>
      </div>

      {/* Image Gallery */}
      <div className="venue-gallery">
        <img src="https://via.placeholder.com/300" alt="Venue" />
        <img src="https://via.placeholder.com/300" alt="Venue" />
        <img src="https://via.placeholder.com/300" alt="Venue" />
      </div>

      {/* About Section */}
      <div className="venue-about">
        <h2>About</h2>
        <p>
          Green Turf Arena offers world-class football and cricket facilities with top-notch turf,
          floodlights, and seating arrangements. Perfect for tournaments, practice, and friendly
          matches.
        </p>
        <ul>
          <li>✅ Floodlights</li>
          <li>✅ Parking</li>
          <li>✅ Changing Rooms</li>
        </ul>
      </div>

      {/* Ratings Overview */}
      <div className="venue-ratings">
        <h2>Ratings</h2>
        <p>Average Rating: ⭐ 4.5</p>
      </div>

      {/* Reviews */}
      <div className="venue-reviews">
        <h2>Reviews</h2>
        {reviews.map((r) => (
          <div key={r.id} className="review-card">
            <p><strong>{r.name}</strong> - ⭐ {r.rating}</p>
            <p>{r.comment}</p>
          </div>
        ))}

        {/* Add Review */}
        <form className="review-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          >
            <option value="">Select Rating</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {errors.rating && <span className="error">{errors.rating}</span>}

          <textarea
            placeholder="Your Comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          ></textarea>
          {errors.comment && <span className="error">{errors.comment}</span>}

          <button type="submit">Submit Review</button>
        </form>
      </div>

      {/* Map */}
      <div className="venue-map">
        <h2>Location</h2>
        <iframe
          title="venue-location"
          src="https://maps.google.com/maps?q=jaipur&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default SingleVenue;
