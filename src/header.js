import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div>
      <nav className="navbar">
        {/* Logo Section */}
        <div className="logo">
          <i>BLOG APP</i>
        </div>
        <div className={`nav-links ${isNavOpen ? "active" : ""}`}>
          <Link to="/home">Home</Link>
          <Link to="/posts">My Posts</Link>
          <Link to="/post">Create Posts</Link>
          <Link to="/contact">Subscribe</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Logout</Link>
          
        </div>

        {/* Toggle Button for Mobile */}
        <div className="toggle-button" onClick={toggleNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
