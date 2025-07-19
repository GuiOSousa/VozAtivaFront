import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { FaMap, FaHome, FaUser, FaPlus } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapComponent from "./map";
import DataFilter from "../components/Filters";
import './styles/Home.css'

export const HomePage = () => {
    return (
      <div className="app-container">
        {/* <NavigationBar /> */}

        <div className="HomeDiv">
          <MapComponent />
          <DataFilter/>
        </div>
        {/* <AddButton/> */}
      </div>
    );
  };

export default HomePage;