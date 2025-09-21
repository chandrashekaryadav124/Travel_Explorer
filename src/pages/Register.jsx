import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/Register.css";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, register } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (register(email, password)) {
      navigate("/login");
    } else {
      alert("Registration failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="register-page">
      <div className="register-wrapper">
        <div className="register-card">
          <div className="register-header">
            <h1>Create Account</h1>
            <p>Fill in the details to register</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group floating">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder=" "
              />
              <label>Full Name</label>
            </div>

            <div className="input-group floating">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
              />
              <label>Email</label>
            </div>

            <div className="input-group floating">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
              />
              <label>Password</label>
            </div>

            <div className="input-group floating">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder=" "
              />
              <label>Confirm Password</label>
            </div>

            <div className="input-group floating">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder=" "
              />
              <label>Phone Number</label>
            </div>

            <button type="submit" className="register-button" disabled={isLoading}>
              {isLoading ? (
                <span className="button-loading">
                  <span className="spinner"></span>
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Already have an account?{" "}
              <span className="login-link" onClick={() => navigate("/login")}>
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
