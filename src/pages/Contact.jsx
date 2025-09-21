import React, { useState } from "react";
import "../Styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Have questions or feedback? We'd love to hear from you!</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        {["name", "email", "message"].map((field) => (
          <div className="form-group" key={field}>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}

        <button type="submit" className="submit-btn">
          Send Message
        </button>

        {success && <div className="success-toast">Message sent successfully!</div>}
      </form>
    </div>
  );
}

export default Contact;
