import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Styles/Profile.css";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-wrapper">
        <div className="profile-card">
          <h2 className="profile-header">Your Profile</h2>

          {user ? (
            <>
              <div className="profile-detail">
                <span className="label">Full Name:</span>
                <span className="value">{user.fullName || "Not provided"}</span>
              </div>
              <div className="profile-detail">
                <span className="label">Email:</span>
                <span className="value">{user.email}</span>
              </div>
              <div className="profile-detail">
                <span className="label">Phone:</span>
                <span className="value">{user.phone || "Not provided"}</span>
              </div>

              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <p className="profile-text">You are not logged in.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
