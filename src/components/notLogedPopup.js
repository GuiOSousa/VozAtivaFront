import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirecionamento
import api from "../axios/api";
import { isLoggedIn } from "../pages/loginScreen"; // Importe a flag global


const NotLogedPopup = ({ lat, lng, popup }) => {
    const navigate = useNavigate();
    
    return (
      <div className="popup-container">
        <h3>
          <strong>Usuário não logado</strong>
        </h3>
        <p>Apenas usuários logados podem criar alertas</p>
        <button type="submit" className="button" onClick={() => {navigate("/login")}}>Entrar</button>
      </div>
    );
  };
  
  export default NotLogedPopup;