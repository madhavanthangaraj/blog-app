import React from "react";
import { Link } from "react-router-dom";
import "./indexpage.css";
import blogImage from "../assets/blog.jpeg";

function IndexPage() {
  const features = [
    {
      icon: "✍️",
      title: "Write Freely",
      description: "Share your thoughts without any limits"
    },
    {
      icon: "🌐",
      title: "Reach Everyone",
      description: "Connect with readers from around the world"
    },
    {
      icon: "🚀",
      title: "Publish Instantly",
      description: "Get your story online in just a click"
    }
  ];

  return (
    <div className="index-container">
      <div className="index-content">
        <div className="index-text">
          <h1>Welcome to Your Writing Home</h1>
          <p>A simple place to share your stories with the world</p>
          
          <div className="features-preview">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-details">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/login" className="index-button">
            Let's Start Now
          </Link>
        </div>
        <div className="index-image">
          <img 
            src={blogImage} 
            alt="Writers sharing their stories online" 
            className="main-image"
          />
          <div className="image-overlay"></div>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
