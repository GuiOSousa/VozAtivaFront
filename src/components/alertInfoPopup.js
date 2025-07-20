import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirecionamento
import api from "../axios/api";
import { isLoggedIn } from "../pages/loginScreen"; // Importe a flag global
import "./styles/CreateAlertPopUp.css";
import { userEmail } from "../pages/loginScreen";

const AlertInfoPopup = (a) => {
  return (`
    <div className="popup-container">
        <h2>${a.title}</h2>
        <i>${a.description}</i>
        <p><strong>Tipo:</strong> ${a.type}</p>
        <p><strong>Data:</strong> ${new Date(a.date).toLocaleString()}</p>
        <p><strong>Status:</strong> ${a.status === "Open" ? "Aberto" : "Fechado"}</p>
        ${a.location ? `<p><strong>Local:</strong> ${a.location.city}, ${a.location.state}, ${a.location.country}</p>` : ""}
    </div>`
   
  );
};

export default AlertInfoPopup;
