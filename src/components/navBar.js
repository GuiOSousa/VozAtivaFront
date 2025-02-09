import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { FaHome, FaUser, FaList } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../pages/loginScreen"; // Importe a flag global

export const NavigationBar = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav className="bottom-nav">
      <Link to="/" className="nav-item">
        <FaHome size={24} />
      </Link>
      <Link to="/alert" className="nav-item">
        <IoWarning size={24} />
      </Link>
      <Link to="/reports" className="nav-item"> 
        <FaList size={24} />
      </Link>
      <div className="nav-item" onClick={handleProfileClick}>
        <FaUser size={24} />
      </div>
    </nav>
  );
};
