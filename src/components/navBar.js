import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { FaHome, FaUser, FaList } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const NavigationBar = () => {
    return (
        <nav className="bottom-nav">
          <Link to="/" className="nav-item">
            <FaHome size={24} />
          </Link>
          <Link to="/alert" className="nav-item">
            <IoWarning size={24} />
          </Link>
          <Link to="/login" className="nav-item">
            <FaUser size={24} />
          </Link>
          <Link to="/register" className="nav-item">
            <FaUser size={24} />
          </Link>
          <Link to="/profile" className="nav-item">
            <FaUser size={24} />
          </Link>
          <Link to="/reports" className="nav-item"> 
            <FaList size={24} />
          </Link>
        </nav>
    );
  };