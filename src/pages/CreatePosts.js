import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../header.js';
import './createPosts.css';

const CreatePosts = ({ profilename }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Add username validation
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!profilename && !storedUsername) {
      // If no username is available, redirect to login
      navigate('/login');
    }
  }, [profilename, navigate]);

  useEffect(() => {
    let errorTimeout;
    if (error) {
      errorTimeout = setTimeout(() => {
        setError(null);
      }, 3000);
    }
    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    };
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("=== POST CREATION STARTED ===");
    console.log("Form Inputs:", { title, content });

    // Validate input locally
    if (!title.trim() || !content.trim()) {
      console.error("Validation Error: Title or content is empty");
      setError("Title and content cannot be empty");
      setLoading(false);
      return;
    }

    // Get username from profilename or localStorage
    const username = profilename || localStorage.getItem('username');

    console.log("Authentication Check:", {
      profilename,
      storedUsername: localStorage.getItem('username'),
      resolvedUsername: username
    });

    if (!username) {
      console.error("Authentication Failed: No username found");
      setError("Authentication failed. Please log in again.");
      setLoading(false);
      return;
    }

    const postDetails = {
      username,
      title: title.trim(),
      content: content.trim()
    };

    console.log("Post Details to Send:", postDetails);

    try {
      console.log("Sending POST request to server...");
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postDetails), 
        credentials: 'include'
      });

      console.log("Server Response:", {
        status: response.status,
        statusText: response.statusText
      });

      const result = await response.json();

      console.log("Response Body:", result);

      if (!response.ok) {
        console.error("Server Error Response:", {
          message: result.message,
          details: result
        });
        throw new Error(result.message || "Failed to create the post");
      }

      console.log("Post Creation Successful:", result);
      
      // Clear form and navigate
      setTitle("");
      setContent("");
      alert("Post created successfully!");
      navigate("/posts");
    } catch (err) {
      console.error("Detailed Post Creation Error:", {
        message: err.message,
        stack: err.stack
      });
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
      console.log("=== POST CREATION PROCESS COMPLETED ===");
    }
  };

  return (
    <div>
      <Header />
      <div className="create-post-container">
        <div className="create-post-content">
          <h1>Create a New Post</h1>
          
          <form onSubmit={handleSubmit} className="create-post-form">
            {error && (
              <div className="error-message" style={{
                backgroundColor: '#ffdddd',
                color: '#ff0000',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the Topic"
                required
                className="form-input"
                maxLength={100}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                required
                className="form-textarea"
                rows="8"
                maxLength={1000}
              />
            </div>

            <button 
              type="submit" 
              className={`submit-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePosts;