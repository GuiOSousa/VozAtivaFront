import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { FaMap, FaHome, FaUser, FaPlus } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapComponent from "./map";
import { NavigationBar } from "../components/navBar";
import { AddButton } from "../components/createAlertButton";

export const HomePage = () => {
    return (
      <div className="app-container">
        <NavigationBar />
        <MapComponent />
        {/* <AddButton/> */}
      </div>
    );
  };

export default HomePage;