import React from "react";
import "../Styles/home.css";
import { Link } from "react-router-dom";

const featuredDestinations = [
  { id: 1, name: "Taj Mahal", country: "India", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "Grand Canyon", country: "USA", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
  { id: 3, name: "Sydney Opera House", country: "Australia", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Eiffel Tower", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
];

const Home = () => {
  return (
    <div className="home-container">
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Explore the World with Travel Explorer</h1>
          <p>Discover breathtaking destinations and plan your next adventure.</p>
          <Link to="/explore" className="cta-btn">Explore now</Link>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="featured">
        <h2>Featured Destinations</h2>
        <div className="destinations-grid">
          {featuredDestinations.map(dest => (
            <div key={dest.id} className="destination-card">
              <img src={dest.image} alt={dest.name} />
              <div className="destination-info">
                <h3>{dest.name}</h3>
                <p>{dest.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Travel Explorer</h2>
        <p>
          Travel Explorer is your ultimate travel companion. Explore the best destinations worldwide,
          get insider tips, and make every trip unforgettable.
        </p>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Travelers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"An amazing platform! Found the perfect destinations for our family trip."</p>
            <h4>- Sarah W.</h4>
          </div>
          <div className="testimonial-card">
            <p>"Easy to use and full of beautiful destinations. Highly recommend!"</p>
            <h4>- Mark L.</h4>
          </div>
          <div className="testimonial-card">
            <p>"Helped me plan a dream vacation. Loved the recommendations."</p>
            <h4>- Priya R.</h4>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
