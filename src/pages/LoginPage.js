import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import './LoginPage.css';
import bgImage from "../assets/bg1.jpg"; // Correct file name

export default function LoginPage({setProfilename,profilename}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();

    try {
      const response = await fetch("https://blog-back-end-qn95.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        const userInfo = result.data;
        setUserInfo(userInfo);
        localStorage.setItem('username', userInfo.username);
        alert("Login Successful");
        setRedirect(true);
        setProfilename(userInfo.username);
      } else {
        alert(result.message || "Invalid username or password");
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("Login failed. Please try again.");
    }
  }

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <div
    style={{
      height: "700px", // Full height
      width: "100vw",  // Full width (viewport width)
      display: "flex", // Flexbox for centering the content
      justifyContent: "center", 
      alignItems: "center", 
      backgroundImage: `url(${bgImage})`, 
      backgroundSize: "cover",  // Make the image cover the entire container
      backgroundPosition: "center",  // Center the image
    }}
    
    
    >
      <div className="login-container">
        <form className="login" onSubmit={login}>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type="submit">Login</button>
        </form>
  
        {/* Extra Section for Account Options */}
        <div className="account-options">
          <p>New here? Sign up to get started:</p>
          <Link to="/register">
            <button className="create-account-button">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}  