import React from "react";
import MapComponent from "./pages/map";
import { HomePage } from "./pages/home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AlertScreen from "./pages/CreateAlertPage";
import LoginScreen from "./pages/loginScreen";
import RegisterScreen from "./pages/registerPage";
import "./App.css";
import { ProfilePage } from "./pages/profilePage";


const App = () => {
   return (
     <Router>
       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/alert" element={<AlertScreen />} />
         <Route path="/login" element={<LoginScreen />} />
         <Route path="/register" element={<RegisterScreen />} />
         <Route path="/profile" element={<ProfilePage />} />
       </Routes>
     </Router>
   );
 };

export default App;
