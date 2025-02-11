import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirecionamento
import api from "../axios/api";
import { isLoggedIn } from "../pages/loginScreen"; // Importe a flag global
import "./styles/CreateAlertPopUp.css";
import { userEmail } from "../pages/loginScreen";

const AlertInfoPopup = (a) => {
    const getAlertType = () => {
        let type
        if (a["alertTypeId"] === 1) {
            type = "Ambiental";
        } else if (a["alertTypeId"] === 2) {
            type = "Trânsito";
        } else if (a["alertTypeId"] === 3) {
            type = "Segurança";
        } else {
            type = "Outros";
        }

        return type
    }

  return (`
    <div className="popup-container">
        <h2>${a.title}</h2>
        <p><strong>Tipo:</strong> ${getAlertType()}</p>
        <p><strong>Data:</strong> ${new Date(a.date).toLocaleString()}</p>
        <p><strong>Status:</strong> ${a.status === 1 ? "Aberto" : "Finalizado"}</p>
        <i>${a.description}</i>
    </div>`
   
  );
};

export default AlertInfoPopup;
