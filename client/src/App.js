import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Venues from "./pages/Venues";
import SingleVenue from "./pages/SingleVenue";
import CourtBookingPage from "./pages/CourtBookingPage";
import OwnerDashboard from "./pages/OwnerDashboard";
import FacilityManagementPage from "./pages/FacilityManagementPage";
import CourtManagementPage from "./pages/CourtManagementPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/single-venue" element={<SingleVenue />} />
        <Route path="/court-booking" element={<CourtBookingPage />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/facility-management" element={<FacilityManagementPage />} />
        <Route path="/court-management" element={<CourtManagementPage />} />
      </Routes>
    </Router>
  );
}
