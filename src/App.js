import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapComponent from "./pages/map";
import { HomePage } from "./pages/home";
import AlertScreen from "./pages/CreateAlertPage";
import LoginScreen from "./pages/loginScreen";
import RegisterScreen from "./pages/registerPage";
import { ProfilePage } from "./pages/profilePage";
import ReportListPage from "./pages/ReportListPage";
import { NavigationBar } from "./components/navBar";
import api from "./axios/api";
import "./App.css";

const App = () => {
  const [reports, setReports] = useState([]);

  // Função para buscar denúncias
  const fetchReports = async () => {
    try {
      const response = await api.get("/Alert");
      setReports(response.data);
    } catch (error) {
      console.error("Erro ao buscar denúncias:", error);
    }
  };

  // Use useEffect para buscar dados ao montar o App
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/alert" 
          element={<AlertScreen onAlertCreated={fetchReports} />} 
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reports" element={<ReportListPage reports={reports} />} /> 
      </Routes>
    </Router>
  );
};

export default App;