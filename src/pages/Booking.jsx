import React, { useEffect, useState } from 'react';
import '../Styles/Booking.css';

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('myBookings')) || [];
    setBookings(storedBookings);
    setFilteredBookings(storedBookings);
  }, []);

  useEffect(() => {
    filterAndSortBookings();
  }, [bookings, sortBy, statusFilter, searchTerm]);

  const filterAndSortBookings = () => {
    let result = [...bookings];

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(booking => booking.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(booking => 
        booking.destination.toLowerCase().includes(term) ||
        booking.city.toLowerCase().includes(term) ||
        booking.country.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    switch(sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'checkin':
        result.sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
        break;
      default:
        break;
    }

    setFilteredBookings(result);
  };

  const cancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      );
      
      setBookings(updatedBookings);
      localStorage.setItem('myBookings', JSON.stringify(updatedBookings));
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      confirmed: 'status-confirmed',
      cancelled: 'status-cancelled',
      completed: 'status-completed',
      pending: 'status-pending'
    };
    
    return <span className={`status-badge ${statusClasses[status]}`}>{status}</span>;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const getPaymentMethodIcon = (method) => {
    switch(method) {
      case 'creditCard':
        return '💳 Credit Card';
      case 'debitCard':
        return '💳 Debit Card';
      case 'paypal':
        return '📱 PayPal';
      default:
        return '💳 ' + method;
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>My Bookings</h1>
        <p>Manage your travel plans and view booking history</p>
      </div>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <div className="no-bookings-content">
            <h2>No bookings yet</h2>
            <p>Explore amazing destinations and book your next adventure!</p>
            <button 
              className="cta-button"
              onClick={() => window.location.href = '/explore'}
            >
              Explore Destinations
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="booking-filters">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-group">
              <label>Filter by Status:</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="checkin">Check-in Date</option>
              </select>
            </div>
          </div>
          
          <div className="booking-stats">
            <div className="stat-card">
              <h3>{bookings.length}</h3>
              <p>Total Bookings</p>
            </div>
            <div className="stat-card">
              <h3>{bookings.filter(b => b.status === 'confirmed').length}</h3>
              <p>Upcoming Trips</p>
            </div>
            <div className="stat-card">
              <h3>{bookings.filter(b => b.status === 'completed').length}</h3>
              <p>Completed Trips</p>
            </div>
            <div className="stat-card">
              <h3>${bookings.reduce((total, booking) => total + booking.price, 0)}</h3>
              <p>Total Spent</p>
            </div>
          </div>

          <div className="booking-list">
            {filteredBookings.length === 0 ? (
              <div className="no-results">
                <p>No bookings match your search criteria.</p>
              </div>
            ) : (
              filteredBookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-image">
                    <img src={booking.image} alt={booking.destination} />
                    <div className="booking-card-header">
                      <h2>{booking.destination}</h2>
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>
                  
                  <div className="booking-card-body">
                    <div className="booking-details">
                      <div className="detail-item">
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">{booking.city}, {booking.country}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Check-in:</span>
                        <span className="detail-value">{formatDate(booking.checkIn)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Check-out:</span>
                        <span className="detail-value">{formatDate(booking.checkOut)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Guests:</span>
                        <span className="detail-value">{booking.guests} | Rooms: {booking.rooms}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Total Price:</span>
                        <span className="detail-value price">${booking.price}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Booking Date:</span>
                        <span className="detail-value">{formatDate(booking.bookingDate)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Payment Method:</span>
                        <span className="detail-value">{getPaymentMethodIcon(booking.paymentMethod)}</span>
                      </div>
                    </div>
                    
                    <div className="booking-actions">
                      {booking.status === 'confirmed' && (
                        <>
                          <button className="btn-primary">Modify</button>
                          <button 
                            className="btn-secondary"
                            onClick={() => cancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </button>
                        </>
                      )}
                      <button 
                        className="btn-tertiary"
                        onClick={() => viewBookingDetails(booking)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="modal-content booking-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedBooking(null)}>×</button>
            <div className="modal-header">
              <h2>{selectedBooking.destination}</h2>
              <p>{selectedBooking.city}, {selectedBooking.country}</p>
              {getStatusBadge(selectedBooking.status)}
            </div>
            <div className="modal-body">
              <div className="booking-detail-image">
                <img src={selectedBooking.image} alt={selectedBooking.destination} />
              </div>
              
              <div className="booking-detail-info">
                <h3>Booking Details</h3>
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Check-in Date:</span>
                    <span className="detail-value">{formatDate(selectedBooking.checkIn)}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Check-out Date:</span>
                    <span className="detail-value">{formatDate(selectedBooking.checkOut)}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Guests:</span>
                    <span className="detail-value">{selectedBooking.guests}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Rooms:</span>
                    <span className="detail-value">{selectedBooking.rooms}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Total Price:</span>
                    <span className="detail-value price">${selectedBooking.price}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Booking Date:</span>
                    <span className="detail-value">{formatDate(selectedBooking.bookingDate)}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Payment Method:</span>
                    <span className="detail-value">{getPaymentMethodIcon(selectedBooking.paymentMethod)}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">{getStatusBadge(selectedBooking.status)}</span>
                  </div>
                </div>
                
                {selectedBooking.status === 'confirmed' && (
                  <div className="booking-notice">
                    <h4>Important Information</h4>
                    <p>Your booking is confirmed. Please arrive at the destination on the check-in date. 
                    Don't forget to bring your ID and this confirmation.</p>
                  </div>
                )}
                
                {selectedBooking.status === 'cancelled' && (
                  <div className="booking-notice cancelled">
                    <h4>Cancellation Notice</h4>
                    <p>This booking has been cancelled. If this was a mistake, please contact our support team.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedBooking(null)}>Close</button>
              {selectedBooking.status === 'confirmed' && (
                <button 
                  className="btn-secondary"
                  onClick={() => cancelBooking(selectedBooking.id)}
                >
                  Cancel Booking
                </button>
              )}
              <button className="btn-primary">Download Receipt</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;