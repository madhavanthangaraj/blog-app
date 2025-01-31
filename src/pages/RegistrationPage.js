import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './RegistrationPage.css';

const Registration = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    async function register(e) {
        e.preventDefault();
        const response = await fetch('https://blog-back-end-qn95.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });
        console.log("Response: ", response);

        if (response.status === 200) {
            console.log("User Registered");
            // Navigate to the login page after successful registration
            navigate('/login');
        } else {
            console.log("User Not Registered");
        }
    }

    return (
        <div className="registration-container">
            {/* Welcome Message */}
            <div className="welcome-message">
                <h1>Welcome! 🎉</h1>
                <p>Create an account to unlock exclusive features and join our community.</p>
            </div>

            <form className="registration-form" onSubmit={(e) => register(e)}>
                <h2>Register</h2>
                <label className="input-label">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                    placeholder="Enter your username"
                />

                <label className="input-label">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="Enter a strong password"
                />

                <button type="submit" className="submit-btn">Register</button>
                {/* Back to Home button */}
                <button
                    type="button"
                    className="submit-btn"
                    id="ma"
                    onClick={() => navigate('/')} // Navigate to the home page
                >
                    Back to Home
                </button>
            </form>
        </div>
    );
}

export default Registration;
