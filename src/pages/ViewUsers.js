import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header';
import './ViewUsers.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/all-users');
        
        if (response.data && response.data.users) {
          setUsers(response.data.users);
          setLoading(false);
        } else {
          throw new Error('No users found');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message || 'Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="users-container loading">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="users-container error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="users-container">
        <h2>Registered Users</h2>
        <div className="users-grid">
          {users.map((username, index) => (
            <div key={index} className="user-card">
              <div className="user-avatar">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="user-name">
                {username}
              </div>
            </div>
          ))}
        </div>
        <div className="user-count">
          Total Users: {users.length}
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
