import React from 'react';
import Header from '../header.js'; 
import './HomePage.css';
import { Link, useNavigate } from "react-router-dom";

// Import local post images
import post1 from '../assets/post1.png';
import post2 from '../assets/post2.jpg';
import post3 from '../assets/post3.jpg';

// Icons for features
const WriteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="feature-icon">
        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
    </svg>
);

const CommunityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="feature-icon">
        <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
    </svg>
);

const DiscoverIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="feature-icon">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
    </svg>
);

const Home = () => {
  const navigate = useNavigate();

  const handleViewUsers = () => {
    navigate('/view-users');
  };

  return (
    <div>
      <Header />
      <div className="home-container">
       

        
        {/* Hero Section */}
        <div className="hero-section">
          <h1>Welcome to Our Blog Platform</h1>
          <p>Dive into a world of amazing stories, tutorials, and ideas shared by our vibrant community of writers.</p>
        </div>
        <div className="home-header">
        <h1>Discover our users by clicking here!</h1>
        <div className="home-actions">
        
            <button onClick={handleViewUsers} className="view-users-btn">
              View Users
            </button>
          </div>
          </div>
        
        
        
        {/* Featured Posts Section */}
        <section className="featured-posts">
          <h2>Featured Posts</h2>
          <div className="posts-grid">
            <div className="post-card">
              <img src={post1} alt="Post 1" />
              <h3>How to Start Blogging in 2025</h3>
              <p>Learn the steps to create and grow your own blog this year!</p>
              <p>
                1. Identify your passion and unique perspective
                2. Choose the right blogging platform
                3. Develop a consistent content strategy
                4. Build your online presence and network
                5. Learn basic SEO and content marketing
                6. Engage with your audience regularly
                7. Stay persistent and patient in your journey
              </p>
            </div>
            <div className="post-card">
              <img src={post2} alt="Post 2" />
              <h3>Writing Tips for Beginners</h3>
              <p>Discover powerful writing tips to elevate your skills.</p>
              <p>
                1. Write every day, even if it's just a few sentences
                2. Read widely across different genres
                3. Study the craft of writing through books and courses
                4. Embrace feedback and continuous improvement
                5. Develop a unique writing voice
                6. Practice different writing styles
                7. Never stop learning and experimenting
              </p>
            </div>
            <div className="post-card">
              <img src={post3} alt="Post 3" />
              <h3>The Future of Tech Blogging</h3>
              <p>Explore how technology is changing the blogging landscape.</p>
              <p>
                1. Understand emerging digital technologies
                2. Leverage AI-powered content creation tools
                3. Create interactive and multimedia content
                4. Build a strong personal brand online
                5. Stay updated with tech industry trends
                6. Develop a niche expertise
                7. Embrace continuous learning and adaptation
              </p>
            </div>
          </div>
        </section>

        {/* Platform Features Section */}
        <section className="platform-features">
          <h2>Why Choose Our Blogging Platform?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <WriteIcon />
              <h3>Easy Writing</h3>
              <p>Our intuitive interface makes creating and publishing blogs a breeze. No technical skills required!</p>
            </div>
            <div className="feature-card">
              <CommunityIcon />
              <h3>Vibrant Community</h3>
              <p>Connect with like-minded writers, share ideas, and grow together in our supportive ecosystem.</p>
            </div>
            <div className="feature-card">
              <DiscoverIcon />
              <h3>Endless Discovery</h3>
              <p>Explore a diverse range of topics, from personal stories to professional insights.</p>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="testimonial-section">
          <h2>What Our Writers Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p>"This platform transformed my writing hobby into a passionate community experience."</p>
              <div className="testimonial-author">
                <span>- Sarah K.</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"I've discovered incredible stories and connected with writers from around the globe."</p>
              <div className="testimonial-author">
                <span>- Michael T.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
