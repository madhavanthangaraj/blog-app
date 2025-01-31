import React, { useEffect, useState } from 'react';
import Header from '../header.js';
import { FaHeart, FaComment } from 'react-icons/fa';
import './UserPosts.css';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', content: '' });
  const [actionStatus, setActionStatus] = useState({ type: '', message: '' });
  
  // State for managing comments
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);

  // Debug logging for comment states
  useEffect(() => {
    console.log('Active Comment Post ID:', activeCommentPostId);
    console.log('Comment Inputs:', commentInputs);
  }, [activeCommentPostId, commentInputs]);

  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetchPosts();
    // Load liked posts, like counts, and comments from localStorage
    const savedLikes = JSON.parse(localStorage.getItem('postLikes') || '{}');
    const savedComments = JSON.parse(localStorage.getItem('postComments') || '{}');
    setLikes(savedLikes);
    setComments(savedComments);
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://blog-back-end-qn95.onrender.com/allposts');
      const result = await response.json();
      
      if (result.status === 'success') {
        setPosts(result.data);
      } else {
        setPosts([]);
        setError(result.message || 'Failed to load posts. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setEditFormData({ title: post.title, content: post.content });
    setActionStatus({ type: '', message: '' });
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`https://blog-back-end-qn95.onrender.com/post/${postId}`, {
          method: 'DELETE',
        });
        
        const data = await response.json();
        
        if (data.success) {
          setPosts(posts.filter(post => post._id !== postId));
          setActionStatus({ 
            type: 'success', 
            message: data.message || 'Post deleted successfully!'
          });
        } else {
          throw new Error(data.message || 'Failed to delete post');
        }
        
        setTimeout(() => {
          setActionStatus({ type: '', message: '' });
        }, 3000);
      } catch (error) {
        console.error('Error deleting post:', error);
        setActionStatus({ 
          type: 'error', 
          message: error.message || 'Failed to delete post. Please try again.'
        });
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Include updated timestamp in the request body
      const editData = {
        ...editFormData,
        updatedAt: new Date().toISOString()
      };

      const response = await fetch(`https://blog-back-end-qn95.onrender.com/post/${editingPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      const data = await response.json();

      if (data.success) {
        // Update the post with the new data, ensuring updatedAt is included
        setPosts(posts.map(post => 
          post._id === editingPost._id 
            ? { 
                ...data.post, 
                updatedAt: editData.updatedAt 
              } 
            : post
        ));
        
        setActionStatus({ 
          type: 'success', 
          message: data.message || 'Post updated successfully!'
        });
        setEditingPost(null);
      } else {
        throw new Error(data.message || 'Failed to update post');
      }
      
      setTimeout(() => {
        setActionStatus({ type: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error updating post:', error);
      setActionStatus({ 
        type: 'error', 
        message: error.message || 'Failed to update post. Please try again.'
      });
    }
  };

  const handleLike = (postId) => {
    const currentLikes = {...likes};
    
    if (!currentLikes[postId]) {
      // First time liking the post
      currentLikes[postId] = {
        count: 1,
        liked: true
      };
    } else {
      // Toggle like status
      if (currentLikes[postId].liked) {
        // Unlike: decrease count
        currentLikes[postId].count = Math.max(0, currentLikes[postId].count - 1);
        currentLikes[postId].liked = false;
      } else {
        // Like: increase count
        currentLikes[postId].count += 1;
        currentLikes[postId].liked = true;
      }
    }

    setLikes(currentLikes);
    localStorage.setItem('postLikes', JSON.stringify(currentLikes));
  };

  // Handle opening comment input
  const handleCommentClick = (postId) => {
    // Ensure comment input is initialized for this post
    setCommentInputs(prev => ({
      ...prev,
      [postId]: prev[postId] || ''
    }));

    // Toggle active comment post
    setActiveCommentPostId(prevPostId => 
      prevPostId === postId ? null : postId
    );
  };

  // Comprehensive comment input change handler
  const handleCommentChange = (postId, event) => {
    const inputValue = event.target.value;
    
    // Update comment input for specific post
    setCommentInputs(prev => {
      const updatedInputs = {
        ...prev,
        [postId]: inputValue
      };
      
      return updatedInputs;
    });
  };

  // Submit comment with comprehensive debugging
  const submitComment = (postId) => {
    console.log('Attempting to submit comment', {
      postId,
      commentInput: commentInputs[postId],
      activeCommentPostId
    });

    // Validate postId
    if (!postId) {
      console.error('No post ID provided for comment submission');
      alert('Error: Unable to submit comment. No post selected.');
      return;
    }

    // Trim and validate comment text
    const commentText = (commentInputs[postId] || '').trim();
    
    console.log('Comment text after trimming:', commentText);

    // Prevent empty comments
    if (!commentText) {
      console.warn('Attempted to submit empty comment');
      alert('Please enter a comment before submitting.');
      return;
    }

    // Prepare new comment object
    const newComment = {
      text: commentText,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };

    console.log('Prepared new comment:', newComment);

    // Update comments state with extensive logging
    setComments(prevComments => {
      const updatedComments = {...prevComments};
      
      // Initialize comments array for this post if not exists
      if (!updatedComments[postId]) {
        updatedComments[postId] = [];
      }
      
      // Add new comment
      updatedComments[postId].push(newComment);
      
      console.log('Updated comments state:', updatedComments);

      try {
        // Save to localStorage with error handling
        localStorage.setItem('postComments', JSON.stringify(updatedComments));
        console.log('Comments saved to localStorage successfully');
      } catch (error) {
        console.error('Failed to save comments to localStorage:', error);
        alert('Failed to save comment. Please try again.');
      }
      
      return updatedComments;
    });

    // Clear comment input for this post
    setCommentInputs(prev => {
      const updatedInputs = {
        ...prev,
        [postId]: ''
      };
      console.log('Cleared comment input:', updatedInputs);
      return updatedInputs;
    });

    // Close comment input
    setActiveCommentPostId(null);

    console.log('Comment submission process completed');
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your amazing posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="posts-container">
        <h1 className="posts-title">Your Creative Space</h1>
        
        {actionStatus.message && (
          <div className={`status-message ${actionStatus.type}`}>
            {actionStatus.message}
          </div>
        )}
        
        {editingPost && (
          <div className="edit-form-overlay">
            <div className="edit-form-container">
              <h2>Edit Post</h2>
              {actionStatus.type === 'error' && (
                <div className="error-message">{actionStatus.message}</div>
              )}
              <form onSubmit={handleEditSubmit} className="edit-form">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea
                    id="content"
                    value={editFormData.content}
                    onChange={(e) => setEditFormData({...editFormData, content: e.target.value})}
                    required
                    rows="6"
                  />
                </div>
                <div className="edit-form-buttons">
                  <button 
                    type="submit" 
                    className="edit-btn"
                  >
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    className="delete-btn"
                    onClick={() => setEditingPost(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className="post-meta">
              <span>{formatDate(post.createdAt)}</span>
              {post.updatedAt && (
                <div className="updated-date">
                  Updated: {formatDate(post.updatedAt)}
                </div>
              )}
              <div className="post-actions">
                <button 
                  className="edit-btn"
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
                <button 
                  className={`like-btn ${likes[post._id] && likes[post._id].liked ? 'liked' : ''}`}
                  onClick={() => handleLike(post._id)}
                >
                  <FaHeart style={{ color: likes[post._id] && likes[post._id].liked ? 'white' : 'white' }} />
                  <span>
                    {likes[post._id] && likes[post._id].liked ? 'Unlike' : 'Like'} 
                    ({likes[post._id] ? likes[post._id].count : 0})
                  </span>
                </button>
                <button 
                  className="comment-btn"
                  onClick={() => handleCommentClick(post._id)}
                >
                  <FaComment />
                  <span>Comment</span>
                </button>
              </div>
            </div>
            {activeCommentPostId === post._id && (
              <div className="comment-input-container">
                <textarea
                  className="comment-input-field"
                  value={commentInputs[post._id] || ''}
                  onChange={(e) => handleCommentChange(post._id, e)}
                  placeholder="Write a comment..."
                  maxLength="200"
                  autoFocus
                  onKeyDown={(e) => {
                    // Allow submission with Enter key
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      console.log('Enter key pressed for comment submission');
                      submitComment(post._id);
                    }
                  }}
                />
                <button 
                  className="submit-comment-btn"
                  onClick={() => {
                    console.log('Submit button clicked');
                    submitComment(post._id);
                  }}
                >
                  Submit Comment
                </button>
              </div>
            )}
            {comments[post._id] && comments[post._id].length > 0 && (
              <div className="comments-container">
                {comments[post._id].map((comment, index) => (
                  <div key={index} className="comment-card">
                    <p className="comment-text">{comment.text}</p>
                    <span className="comment-timestamp">{formatDate(comment.timestamp)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
