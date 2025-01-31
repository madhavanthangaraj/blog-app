import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../header';
import './ProfilePage.css';
import axios from 'axios';

// React Icons
import { 
  FaFacebook, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaUniversity, 
  FaGraduationCap 
} from 'react-icons/fa';

// Function to generate default avatar (previous implementation)
const generateDefaultAvatar = (username) => {
  if (!username) return null;

  const firstLetter = username.charAt(0).toUpperCase();
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FDCB6E', 
    '#6C5CE7', '#A8E6CF', '#FF8ED4', '#FAD390'
  ];

  const colorIndex = firstLetter.charCodeAt(0) % colors.length;
  const backgroundColor = colors[colorIndex];

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.font = '100px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(firstLetter, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL();
};

const ProfilePage = ({ profilename }) => {
  const [username, setUsername] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Updated state for user details with education
  const [userDetails, setUserDetails] = useState({
    email: 'user@example.com',
    phoneNumber: '+1 (123) 456-7890',
    dateOfBirth: '1990-01-01',
    domain: 'Software Engineering',
    address: '123 Tech Lane, Silicon Valley, CA 94000',
    education: {
      degree: 'Bachelor of Technology',
      college: 'Silicon Valley Institute of Technology',
      graduationYear: '2015'
    },
    socialLinks: {
      facebook: 'https://facebook.com/username',
      linkedin: 'https://linkedin.com/in/username',
      github: 'https://github.com/username',
      twitter: 'https://twitter.com/username'
    }
  });

  // Ensure education is always defined
  const safeEducation = userDetails.education || {
    degree: '',
    college: '',
    graduationYear: ''
  };

  // Social media icons mapping
  const socialIcons = {
    facebook: FaFacebook,
    linkedin: FaLinkedin,
    github: FaGithub,
    twitter: FaTwitter
  };

  // Edit mode state - now default to true
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    // Fetch or set user details
    const fetchUserDetails = async () => {
      try {
        // Check for stored details, otherwise use defaults
        const storedDetails = localStorage.getItem('userDetails');
        if (storedDetails) {
          const parsedDetails = JSON.parse(storedDetails);
          // Ensure education exists
          if (!parsedDetails.education) {
            parsedDetails.education = {
              degree: 'Bachelor of Technology',
              college: 'Silicon Valley Institute of Technology',
              graduationYear: '2015'
            };
          }
          setUserDetails(parsedDetails);
        } else {
          // First-time setup: save default details to localStorage
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    // Username and profile image logic
    if (profilename) {
      setUsername(profilename);
    } else {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        setRedirect(true);
      }
    }

    const storedProfileImage = localStorage.getItem('profileImage');
    if (storedProfileImage) {
      setPreviewImage(storedProfileImage);
    } else if (username) {
      const defaultAvatar = generateDefaultAvatar(username);
      setPreviewImage(defaultAvatar);
    }

    fetchUserDetails();
  }, [profilename, username]);

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested social links and education
    if (name.startsWith('social_')) {
      const socialKey = name.split('_')[1];
      setUserDetails(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else if (name.startsWith('education_')) {
      const educationKey = name.split('_')[1];
      setUserDetails(prev => ({
        ...prev,
        education: {
          ...(prev.education || {}),
          [educationKey]: value
        }
      }));
    } else {
      setUserDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const saveUserDetails = () => {
    try {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      setIsEditing(false);
      alert('Profile details updated successfully!');
    } catch (error) {
      console.error('Error saving user details:', error);
      alert('Failed to save profile details.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setProfileImage(file);
        // Automatically save the image
        localStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <h1>User Profile</h1>
        </div>
        <div className="profile-content">
          <div className="profile-image-section">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <div className="profile-image-container" onClick={() => fileInputRef.current.click()}>
              <img 
                src={previewImage || generateDefaultAvatar(username)} 
                alt="Profile" 
                className="profile-image" 
              />
              <div className="profile-image-overlay">
                <span>Change Photo</span>
              </div>
            </div>
            <h2>{username}</h2>
          </div>

          <div className="profile-details-section">
            <div className="profile-details-header">
              <h2>Profile Details</h2>
              <button 
                className="edit-profile-btn" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </button>
            </div>

            <div className="profile-details-grid">
              {[
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Phone Number', name: 'phoneNumber', type: 'tel' },
                { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
                { label: 'Domain', name: 'domain', type: 'text' },
                { label: 'Address', name: 'address', type: 'text' }
              ].map(({ label, name, type }) => (
                <div key={name} className="profile-detail-item">
                  <label>{label}</label>
                  {isEditing ? (
                    <input
                      type={type}
                      name={name}
                      value={userDetails[name] || ''}
                      onChange={handleDetailChange}
                      placeholder={`Enter ${label}`}
                    />
                  ) : (
                    <p>{userDetails[name] || 'Not provided'}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="education-section">
              <h3><FaUniversity /> Education</h3>
              <div className="education-details-grid">
                {[
                  { label: 'Degree', name: 'education_degree', type: 'text', icon: FaGraduationCap },
                  { label: 'College', name: 'education_college', type: 'text', icon: FaUniversity },
                  { label: 'Graduation Year', name: 'education_graduationYear', type: 'text' }
                ].map(({ label, name, type, icon: Icon }) => (
                  <div key={name} className="education-detail-item">
                    <label>
                      {Icon && <Icon />} {label}
                    </label>
                    {isEditing ? (
                      <input
                        type={type}
                        name={name}
                        value={safeEducation[name.split('_')[1]] || ''}
                        onChange={handleDetailChange}
                        placeholder={`Enter ${label}`}
                      />
                    ) : (
                      <p>{safeEducation[name.split('_')[1]] || 'Not provided'}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="social-links-section">
              <h3>Social Media Links</h3>
              <div className="social-links-grid">
                {Object.keys(socialIcons).map((platform) => {
                  const Icon = socialIcons[platform];
                  const link = userDetails.socialLinks[platform];
                  return (
                    <div key={platform} className="social-link-item">
                      <Icon 
                        className="social-icon" 
                        onClick={() => {
                          if (link) {
                            window.open(link, '_blank', 'noopener,noreferrer');
                          }
                        }}
                        style={{ cursor: link ? 'pointer' : 'default' }}
                      />
                      {isEditing ? (
                        <input
                          type="text"
                          name={`social_${platform}`}
                          value={userDetails.socialLinks[platform] || ''}
                          onChange={handleDetailChange}
                          placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Profile URL`}
                        />
                      ) : (
                        <a 
                          href={userDetails.socialLinks[platform] || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={!userDetails.socialLinks[platform] ? 'disabled-link' : ''}
                        >
                          {/* Removed text, keeping only icon functionality */}
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
