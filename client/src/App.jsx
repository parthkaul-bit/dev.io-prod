import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BlogDetail from "./pages/BlogDetail";
import UserDetail from "./pages/UserDetail";
import Navbar from "./components/Navbar";
import "./App.css";
import CreateBlog from "./pages/CreateBlog";
import { UserProvider } from "./context/UserContext";
import Favorites from "./pages/Favourites";
function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blog/create" element={<CreateBlog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/user/:id" element={<UserDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
