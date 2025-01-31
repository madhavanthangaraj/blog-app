import React, { useState } from "react";
import axios from "axios";
import "./contactPage.css";
import Header from '../header.js';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await axios.post("https://blog-back-end-qn95.onrender.com/contact", formData);
      setStatus({ 
        type: "success", 
        message: "Thank you for your message! We'll get back to you soon." 
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus({ 
        type: "error", 
        message: "Failed to send message. Please try again later." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="contact-container">
        <div className="contact-info">
          <h1>Get subscription</h1>
          <p>We'd love to hear from you! Send us a message using the form below.</p>
          
          <div className="info-box">
            <div className="icon">📞</div>
            <h3>Phone Support</h3>
            <p>Hours: 9am - 5pm (IST), Mon - Fri</p>
            <p>+91 8610331381</p>
          </div>
          
          <div className="info-box">
            <div className="icon">✉️</div>
            <h3>Email Support</h3>
            <p>madhavan8610331381@gmail.com</p>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
              {/* <small className="form-text">Your message will be sent to madhavan8610331381@gmail.com</small> */}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className={`submit-button ${loading ? 'loading' : ''}`} 
              disabled={loading}
            >
              {loading ? (
                <span className="button-content">
                  <span className="spinner"></span>
                  Sending...
                </span>
              ) : (
                <span className="button-content">
                  Send Message
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
