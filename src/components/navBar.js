import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { FaHome, FaUser, FaList } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../pages/loginScreen"; // Importe a flag global
import "./styles/NavBar.css";

export const NavigationBar = () => {
  const navigate = useNavigate();

  const handleProfileClick = (page) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(page);
    }
  };

  return (
    <nav className="bottom-nav">
      <Link to="/" className="nav-item">
        <FaHome size={24} />
      </Link>
      {/* <Link to="/alert" className="nav-item">
        <IoWarning size={24} />
      </Link> */}
      <div className="nav-item" onClick={() => handleProfileClick("/reports")}>
        <FaList size={24} />
      </div>
      <div className="nav-item" onClick={() => handleProfileClick("/profile")}>
        <FaUser size={24} />
      </div>
    </nav>
  );
};
