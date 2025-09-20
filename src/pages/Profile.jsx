import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Profile</h2>
      {user ? (
        <p>Welcome, <strong>{user.email}</strong></p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}

export default Profile;
