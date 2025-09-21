// Explore.jsx
import React, { useState } from 'react';
import '../Styles/explore.css';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedType, setSelectedType] = useState('All Types');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('Name');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const destinations = [
  // === India ===
  { id: 1, name: 'Taj Mahal', city: 'Agra, Uttar Pradesh', country: 'India', type: 'Historical', rating: 4.8, description: 'A UNESCO World Heritage site and one of the Seven Wonders of the World, famous for its stunning white marble architecture and romantic history.', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', price: 75, bestTime: 'Oct-Mar', highlights: ['Sunrise views', 'Symbol of love', 'Mughal architecture'] },
  { id: 2, name: 'Gateway of India', city: 'Mumbai, Maharashtra', country: 'India', type: 'Historical', rating: 4.5, description: 'An iconic monument built in the 20th century in Mumbai, overlooking the Arabian Sea.', image: 'https://www.gokitetours.com/wp-content/uploads/2024/11/Top-9-Fascinating-Facts-About-the-gate-of-India-in-Mumba.webp', price: 0, bestTime: 'Nov-Feb', highlights: ['Colonial architecture', 'Harbor views', 'Boat rides'] },
  { id: 3, name: 'Backwaters', city: 'Kerala', country: 'India', type: 'Nature', rating: 4.9, description: 'A network of tranquil canals and lagoons, best explored by houseboat.', image: 'https://static.toiimg.com/photo/msid-83336319,width-96,height-65.cms', price: 120, bestTime: 'Sep-Mar', highlights: ['Houseboat stay', 'Coconut lagoons', 'Traditional villages'] },
  { id: 4, name: 'Amber Fort', city: 'Jaipur, Rajasthan', country: 'India', type: 'Historical', rating: 4.7, description: 'A majestic fort known for its artistic Hindu style elements and panoramic views.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8muRaSgaCOzmSZCbzN2n7BLhzfmDuTxUHA&s', price: 15, bestTime: 'Oct-Mar', highlights: ['Elephant ride', 'Mirror palace', 'Hilltop views'] },
  { id: 5, name: 'Hampi', city: 'Karnataka', country: 'India', type: 'Historical', rating: 4.6, description: 'Ruins of the ancient Vijayanagara Empire, featuring temples, bazaars, and stunning architecture.', image: 'https://www.shivavilaspalacehotel.com/blog/admin/assets/img/post/image_2025-03-24-08-23-39_67e1168be72ae.jpg', price: 10, bestTime: 'Oct-Feb', highlights: ['Ancient ruins', 'Boulder landscape', 'Sunset points'] },
  { id: 6, name: 'Rishikesh', city: 'Uttarakhand', country: 'India', type: 'Adventure', rating: 4.7, description: 'Famous for white-water rafting, yoga centers, and the scenic Ganges river.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReQOAy-emzPTtCYC2LZVazm-ZD5rgi7SBQyA&s', price: 45, bestTime: 'Sep-Nov', highlights: ['River rafting', 'Yoga retreats', 'Ganga aarti'] },

  // === USA ===
  { id: 7, name: 'Grand Canyon', city: 'Arizona', country: 'USA', type: 'Nature', rating: 4.9, description: 'A breathtaking natural wonder with stunning vistas and hiking trails.', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', price: 35, bestTime: 'Mar-May', highlights: ['Hiking trails', 'Colorado River', 'Sunset views'] },
  { id: 8, name: 'Statue of Liberty', city: 'New York', country: 'USA', type: 'Historical', rating: 4.7, description: 'Symbol of freedom and democracy, one of the USA\'s most famous landmarks.', image: 'https://seeddownload.cdn-apple.com/s3/prod/ATLC/package/T031487A-en_EMEIA/40f3abe0-d5a4-437b-9dea-bf596b30bb95/12.0/T031487A-ar-statueofliberty/src/videos/statue_of_liberty_4_poster.jpg', price: 24, bestTime: 'Apr-Jun', highlights: ['Crown access', 'Harbor cruise', 'Historical museum'] },
  { id: 9, name: 'Yosemite National Park', city: 'California', country: 'USA', type: 'Nature', rating: 4.8, description: 'Known for its waterfalls, giant sequoia trees, and impressive cliffs.', image: 'https://i.natgeofe.com/n/f14f6c30-8d11-4e33-a5e9-05f1b50bdde3/yosemite-national-park-california.jpg', price: 35, bestTime: 'May-Sep', highlights: ['Yosemite Falls', 'Half Dome', 'Giant sequoias'] },
  { id: 10, name: 'Las Vegas Strip', city: 'Nevada', country: 'USA', type: 'Entertainment', rating: 4.5, description: 'Famous for vibrant nightlife, casinos, shows, and luxury hotels.', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/01/00/2b/the-strip.jpg?w=900&h=500&s=1', price: 0, bestTime: 'Mar-May', highlights: ['Casinos', 'Live shows', 'Fountain displays'] },
  

  // === Australia ===
  { id: 12, name: 'Sydney Opera House', city: 'Sydney', country: 'Australia', type: 'Cultural', rating: 4.8, description: 'Famous for its unique architecture and performing arts shows.', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/93/a7/be/sydney-opera-house.jpg?w=900&h=500&s=1', price: 30, bestTime: 'Sep-Mar', highlights: ['Opera performances', 'Harbor views', 'Architectural tours'] },
  { id: 13, name: 'Great Barrier Reef', city: 'Queensland', country: 'Australia', type: 'Nature', rating: 4.9, description: 'World’s largest coral reef system, ideal for snorkeling and diving.', image: 'https://www.travelmanagers.com.au/wp-content/uploads/2019/07/AdobeStock_145542043_aerial-view-great-barrier-reef-queensland-australia_750x500.jpg', price: 150, bestTime: 'Jun-Nov', highlights: ['Snorkeling', 'Scuba diving', 'Coral reefs'] },
  { id: 14, name: 'Uluru', city: 'Northern Territory', country: 'Australia', type: 'Nature', rating: 4.7, description: 'Massive sandstone monolith in the heart of the Red Centre.', image: 'https://cdn.britannica.com/51/99551-050-D8E072A4/face-Uluru-Ayers-Rock-Australia-Northern-Territory.jpg', price: 25, bestTime: 'May-Sep', highlights: ['Sunset views', 'Aboriginal culture', 'Guided walks'] },

  // === Japan ===
  { id: 15, name: 'Mount Fuji', city: 'Honshu', country: 'Japan', type: 'Nature', rating: 4.8, description: 'Japan’s tallest mountain, iconic for its symmetry and beauty.', image: 'https://cdn.britannica.com/03/75503-050-F65891FA/volcanic-cone-Japan-Mount-Fuji.jpg', price: 20, bestTime: 'Jul-Sep', highlights: ['Hiking', 'Lake Kawaguchi', 'Sunrise view'] },
  { id: 16, name: 'Kyoto Temples', city: 'Kyoto', country: 'Japan', type: 'Historical', rating: 4.7, description: 'Famous for traditional temples, gardens, and geisha districts.', image: 'https://lp-cms-production.imgix.net/2025-02/Shutterstock226470835.jpg?auto=format,compress&q=72&w=1440&h=810&fit=crop', price: 15, bestTime: 'Mar-May', highlights: ['Kinkaku-ji', 'Fushimi Inari', 'Tea ceremonies'] },

  // === France ===
  { id: 17, name: 'Eiffel Tower', city: 'Paris', country: 'France', type: 'Historical', rating: 4.8, description: 'Iconic iron tower known worldwide as a symbol of Paris.', image: 'https://media.architecturaldigest.com/photos/66a951edce728792a48166e6/1:1/w_5304,h_5304,c_limit/GettyImages-955441104.jpg', price: 25, bestTime: 'Apr-Jun', highlights: ['Observation deck', 'Seine river view', 'Light show at night'] },
  { id: 18, name: 'Louvre Museum', city: 'Paris', country: 'France', type: 'Cultural', rating: 4.9, description: 'World-famous art museum housing the Mona Lisa and countless masterpieces.', image: 'https://media.architecturaldigest.com/photos/5900cc370638dd3b70018b33/4:3/w_2756,h_2067,c_limit/Secrets%20of%20Louvre%201.jpg', price: 20, bestTime: 'Apr-Jun', highlights: ['Mona Lisa', 'Ancient art', 'Sculpture collection'] },

  // === Italy ===
  { id: 19, name: 'Colosseum', city: 'Rome', country: 'Italy', type: 'Historical', rating: 4.8, description: 'Ancient Roman gladiatorial arena with a rich history.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1200px-Colosseo_2020.jpg', price: 18, bestTime: 'Apr-Jun', highlights: ['Ancient architecture', 'Guided tours', 'Historical exhibitions'] },
  { id: 20, name: 'Venice Canals', city: 'Venice', country: 'Italy', type: 'Nature', rating: 4.7, description: 'Famous canals with gondola rides and romantic scenery.', image: 'https://cdn.britannica.com/63/153463-050-06B6270D/Grand-Canal-Venice.jpg', price: 40, bestTime: 'Apr-Jun', highlights: ['Gondola rides', 'St. Mark’s Square', 'Romantic sunset'] },

  // === Egypt ===
  { id: 21, name: 'Pyramids of Giza', city: 'Giza', country: 'Egypt', type: 'Historical', rating: 4.9, description: 'Ancient pyramids and the Sphinx, marvels of ancient engineering.', image: 'https://cdn.britannica.com/43/189743-050-25B19F71/Great-Sphinx-Pyramid-of-Khafre-Egypt-Giza.jpg', price: 30, bestTime: 'Oct-Apr', highlights: ['Pyramid tours', 'Camel rides', 'Sunset views'] },
  { id: 22, name: 'Luxor Temple', city: 'Luxor', country: 'Egypt', type: 'Historical', rating: 4.7, description: 'Ancient temple complex on the east bank of the Nile.', image: 'https://d3rr2gvhjw0wwy.cloudfront.net/uploads/mandators/49581/file-manager/luxor-temple-facts.jpg', price: 25, bestTime: 'Oct-Apr', highlights: ['Temple carvings', 'Nile views', 'Guided tours'] },

  // === Thailand ===
  { id: 23, name: 'Phi Phi Islands', city: 'Krabi', country: 'Thailand', type: 'Nature', rating: 4.8, description: 'Tropical islands with crystal-clear waters and vibrant marine life.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCxPuluB3rwINAgzEWLrB-Gcu6oxyioIXNcA&s', price: 80, bestTime: 'Nov-Apr', highlights: ['Snorkeling', 'Beach hopping', 'Boat tours'] },
  { id: 24, name: 'Bangkok Grand Palace', city: 'Bangkok', country: 'Thailand', type: 'Historical', rating: 4.7, description: 'Royal palace with ornate temples and gardens.', image: 'https://static.toiimg.com/thumb/103996442.cms?resizemode=75&width=1200&height=900', price: 15, bestTime: 'Nov-Feb', highlights: ['Temple tours', 'Royal architecture', 'Cultural shows'] },

  // === Brazil ===
  { id: 25, name: 'Christ the Redeemer', city: 'Rio de Janeiro', country: 'Brazil', type: 'Historical', rating: 4.9, description: 'Iconic statue atop Corcovado Mountain with panoramic city views.', image: 'https://trips-southamerica.com/wp-content/uploads/Cristo.jpg', price: 20, bestTime: 'Dec-Mar', highlights: ['Panoramic views', 'Cable car ride', 'Sunset photography'] },
  { id: 26, name: 'Iguaçu Falls', city: 'Paraná', country: 'Brazil', type: 'Nature', rating: 4.9, description: 'A massive waterfall system on the border of Brazil and Argentina.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', price: 40, bestTime: 'May-Sep', highlights: ['Waterfall views', 'Boat tours', 'Hiking trails'] },

  // === UK ===
  { id: 27, name: 'London Eye', city: 'London', country: 'UK', type: 'Entertainment', rating: 4.7, description: 'Giant Ferris wheel offering panoramic views of London.', image:'https://www.londoneye.com/media/ackfhb4v/22747_london-eye_1b_c_pod-to-pod_055_rgb_ns.jpg', price: 35, bestTime: 'Apr-Sep', highlights: ['River Thames view', 'Night illumination', '360-degree panorama'] },
  { id: 28, name: 'Stonehenge', city: 'Wiltshire', country: 'UK', type: 'Historical', rating: 4.6, description: 'Prehistoric monument of standing stones, mysterious and iconic.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOIS6SIQpHaOcBjYEUSpjIfBts9mPI9b0luA&s', price: 25, bestTime: 'Apr-Sep', highlights: ['Stone circle', 'Guided tours', 'Photography'] },

  // === UAE ===
  { id: 29, name: 'Burj Khalifa', city: 'Dubai', country: 'UAE', type: 'Modern', rating: 4.8, description: 'World’s tallest building offering observation decks and luxury experiences.', image: 'https://d2csxpduxe849s.cloudfront.net/media/42BB6A60-DC5B-4A0B-87CC3E8C248CB543/C8B8C53F-D4FB-47AD-BC8F1EAB4D570E00/webimage-3D0ADACC-95C6-4E46-917F764AC40B7B27.png', price: 40, bestTime: 'Nov-Mar', highlights: ['Observation deck', 'Sky lounge', 'Fountain views'] },
  { id: 30, name: 'Sheikh Zayed Mosque', city: 'Abu Dhabi', country: 'UAE', type: 'Cultural', rating: 4.9, description: 'Grand mosque known for stunning architecture and serene ambiance.', image: 'https://www.timeoutabudhabi.com/cloud/timeoutabudhabi/2022/04/04/Sheikh-Zayed-Grand-Mosque-1.jpg', price: 0, bestTime: 'Oct-Mar', highlights: ['Islamic architecture', 'Marble artwork', 'Guided tours'] }
  ];

  

  // --- Dynamic counts for dropdowns ---
  const countryCounts = {};
  const typeCounts = {};
  destinations.forEach(dest => {
    countryCounts[dest.country] = (countryCounts[dest.country] || 0) + 1;
    typeCounts[dest.type] = (typeCounts[dest.type] || 0) + 1;
  });

  // --- Filter destinations ---
  const filteredDestinations = destinations.filter(dest => {
    return (
      (selectedCountry === 'All Countries' || dest.country === selectedCountry) &&
      (selectedType === 'All Types' || dest.type === selectedType) &&
      dest.rating >= minRating &&
      (dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       dest.city.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // --- Sort destinations ---
  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    if (sortBy === 'Name') return a.name.localeCompare(b.name);
    if (sortBy === 'Rating') return b.rating - a.rating;
    if (sortBy === 'Country') return a.country.localeCompare(b.country);
    return 0;
  });

  // --- Handle View Details ---
  const handleViewDetails = (destination) => {
    setSelectedDestination(destination);
  };

  // --- Handle Book Now ---
  const handleBookNow = (destination) => {
    setSelectedDestination(destination);
    setShowBookingModal(true);
  };

  // --- Handle Payment Details Change ---
  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  // --- Handle Booking ---
  const handleBooking = () => {
    // Validate payment details
    if (paymentMethod === 'creditCard') {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv || !paymentDetails.nameOnCard) {
        alert('Please fill in all payment details');
        return;
      }
    }

    const newBooking = {
      id: Date.now(), // Unique ID for the booking
      destination: selectedDestination.name,
      city: selectedDestination.city,
      country: selectedDestination.country,
      image: selectedDestination.image,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      guests: bookingDetails.guests,
      rooms: bookingDetails.rooms,
      price: selectedDestination.price * bookingDetails.guests,
      paymentMethod: paymentMethod,
      bookingDate: new Date().toISOString().split('T')[0], // Current date
      status: 'Confirmed'
    };

    // Get existing bookings from localStorage
    const existingBookings = JSON.parse(localStorage.getItem('myBookings')) || [];

    // Add new booking
    existingBookings.push(newBooking);

    // Save back to localStorage
    localStorage.setItem('myBookings', JSON.stringify(existingBookings));

    alert(`Booking confirmed for ${selectedDestination.name} from ${bookingDetails.checkIn} to ${bookingDetails.checkOut} for ${bookingDetails.guests} guests!`);

    // Reset states
    setShowBookingModal(false);
    setBookingDetails({
      checkIn: '',
      checkOut: '',
      guests: 1,
      rooms: 1
    });
    setPaymentDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    });
  };

  return (
    <div className="explore-container">
      <header className="explore-header">
        <h1>Explore Amazing Destinations</h1>
        <p>Discover breathtaking places around the world and plan your next adventure.</p>
      </header>

      <div className="filters-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔎 Search by name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label>Country</label>
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
              <option value="All Countries">All Countries</option>
              {Object.keys(countryCounts).map(country => (
                <option key={country} value={country}>{country} ({countryCounts[country]})</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Type</label>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="All Types">All Types</option>
              {Object.keys(typeCounts).map(type => (
                <option key={type} value={type}>{type} ({typeCounts[type]})</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Min Rating: {minRating} ★</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="Name">Name</option>
              <option value="Rating">Rating</option>
              <option value="Country">Country</option>
            </select>
          </div>
        </div>
      </div>

      <div className="destinations-grid">
        {sortedDestinations.length === 0 ? (
          <p className="no-results">No destinations match your criteria.</p>
        ) : (
          sortedDestinations.map(dest => (
            <div key={dest.id} className="destination-card">
              <div className="card-image">
                <img src={dest.image} alt={dest.name} />
                <div className="card-rating">{dest.rating} ★</div>
                <div className="card-price">${dest.price}{dest.price > 0 ? '/person' : 'Free'}</div>
              </div>
              <div className="destination-info">
                <h2>{dest.name}</h2>
                <p className="location">{dest.city}, {dest.country}</p>
                <p className="type">{dest.type}</p>
                <p className="desc">{dest.description.substring(0, 100)}...</p>
                <div className="card-actions">
                  <button className="view-btn" onClick={() => handleViewDetails(dest)}>View Details</button>
                  <button className="book-btn" onClick={() => handleBookNow(dest)}>Book Now</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <div className="modal-overlay" onClick={() => setSelectedDestination(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedDestination(null)}>×</button>
            <div className="modal-header">
              <h2>{selectedDestination.name}</h2>
              <p>{selectedDestination.city}, {selectedDestination.country}</p>
            </div>
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedDestination.image} alt={selectedDestination.name} />
                <div className="image-overlay">
                  <span className="rating">{selectedDestination.rating} ★</span>
                  <span className="type-badge">{selectedDestination.type}</span>
                </div>
              </div>
              <div className="modal-details">
                <h3>About</h3>
                <p>{selectedDestination.description}</p>
                
                <div className="detail-section">
                  <h4>Highlights</h4>
                  <div className="highlights">
                    {selectedDestination.highlights.map((item, index) => (
                      <span key={index} className="highlight">{item}</span>
                    ))}
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Best Time to Visit</h4>
                  <p>{selectedDestination.bestTime}</p>
                </div>
                
                <div className="detail-section">
                  <h4>Price</h4>
                  <p className="price">{selectedDestination.price > 0 ? `$${selectedDestination.price} per person` : 'Free Entry'}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="book-now-btn" onClick={() => handleBookNow(selectedDestination)}>Book Now</button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowBookingModal(false)}>×</button>
            <div className="booking-header">
              <h2>Book {selectedDestination.name}</h2>
              <p>{selectedDestination.city}, {selectedDestination.country}</p>
            </div>
            <div className="booking-form">
              <div className="form-group">
                <label>Check-in Date</label>
                <input 
                  type="date" 
                  value={bookingDetails.checkIn}
                  onChange={(e) => setBookingDetails({...bookingDetails, checkIn: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Check-out Date</label>
                <input 
                  type="date" 
                  value={bookingDetails.checkOut}
                  onChange={(e) => setBookingDetails({...bookingDetails, checkOut: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Number of Guests</label>
                <input 
                  type="number" 
                  min="1" 
                  value={bookingDetails.guests}
                  onChange={(e) => setBookingDetails({...bookingDetails, guests: parseInt(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>Number of Rooms</label>
                <input 
                  type="number" 
                  min="1" 
                  value={bookingDetails.rooms}
                  onChange={(e) => setBookingDetails({...bookingDetails, rooms: parseInt(e.target.value)})}
                />
              </div>
              
              {/* Payment Method Selection */}
              <div className="form-group">
                <label>Payment Method</label>
                <select 
                  value={paymentMethod} 
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="creditCard">Credit Card</option>
                  <option value="debitCard">Debit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              
              {/* Payment Details */}
              {paymentMethod !== 'paypal' && (
                <>
                  <div className="form-group">
                    <label>Name on Card</label>
                    <input 
                      type="text" 
                      name="nameOnCard"
                      value={paymentDetails.nameOnCard}
                      onChange={handlePaymentDetailsChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handlePaymentDetailsChange}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input 
                        type="text" 
                        name="expiryDate"
                        value={paymentDetails.expiryDate}
                        onChange={handlePaymentDetailsChange}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input 
                        type="text" 
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handlePaymentDetailsChange}
                        placeholder="123"
                      />
                    </div>
                  </div>
                </>
              )}
              
              {paymentMethod === 'paypal' && (
                <div className="paypal-notice">
                  <p>You will be redirected to PayPal to complete your payment.</p>
                </div>
              )}
              
              <div className="price-summary">
                <h3>Price Summary</h3>
                <p>${selectedDestination.price} x {bookingDetails.guests} guests = ${selectedDestination.price * bookingDetails.guests}</p>
                <p className="total">Total: ${selectedDestination.price * bookingDetails.guests}</p>
              </div>
              <button className="confirm-booking" onClick={handleBooking}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;