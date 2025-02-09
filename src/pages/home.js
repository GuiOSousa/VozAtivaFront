import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { FaMap, FaHome, FaUser, FaPlus } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapComponent from "./map";
import "../pages/styles/Home.css";

export const HomePage = () => {
    return (
      <div className="app-container">
        {/* <NavigationBar /> */}
        <MapComponent />
        {/* <AddButton/> */}
      </div>
    );
  };

export default HomePage;