import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route,Link, Links } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import IndexPage from "./pages/indexpage"; // Ensure the case matches exactly
import RegisterPage from "./pages/RegistrationPage"; // Ensure the case matches exactly
import './mad.css'
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
// import CreatePost from "./pages/posts";
import Contactpage from "./pages/ContactPage";
import PostDetail from './pages/PostDetail';
import CreatePosts from "./pages/CreatePosts";
import UserPosts from "./pages/UserPosts";
import ViewUsers from './pages/ViewUsers';
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const [posts,setPosts]=useState([])
  const [profilename,setProfilename]=useState("")
  const [userId,setUserId]=useState("")
  useEffect(()=>{
    console.log(posts) 
    console.log("Current profilename:", profilename);
    console.log("Curret UserId:",userId)
  },[posts,profilename,userId])
  return (
    <UserContextProvider>
      <Router>
        <div>
          <Routes>
            <Route index element={<IndexPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage
              profilename={profilename}
              setProfilename={setProfilename}
            />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/post" element={<CreatePosts 
               profilename={profilename}
            />} />
            <Route path="/posts" element={<UserPosts />} />
            <Route path="/contact" element={<Contactpage/>} />
            <Route path="/post/:id" element={<PostDetail/>} />
            <Route path="/view-users" element={<ViewUsers />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
};

export default App;