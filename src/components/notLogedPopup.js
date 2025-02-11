import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirecionamento
import api from "../axios/api";
import { isLoggedIn } from "../pages/loginScreen"; // Importe a flag global


const NotLogedPopup = ({ lat, lng, popup }) => {
    const navigate = useNavigate();
    
    const handleLoginRedirect = () => {
        popup.remove(); // Fecha o popup antes de navegar
        navigate("/login");
        window.location.href = "/login"; // Força a navegação correta
    };

    return (
      <div className="popup-container">
        <h3>
          <strong>Usuário não logado</strong>
        </h3>
        <p>Entre para criar alertas</p>
        <button type="submit" className="button" onClick={() => {handleLoginRedirect()}}>Entrar</button>
      </div>
    );
  };
  
  export default NotLogedPopup;