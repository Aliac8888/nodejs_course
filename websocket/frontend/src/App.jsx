import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import EditPost from "./pages/EditPost";
import AddPost from "./pages/AddPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
