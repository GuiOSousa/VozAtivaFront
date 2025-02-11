import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import "../pages/styles/ProfilePage.css";
import api from "../axios/api";
import { userEmail } from "./loginScreen"; // Certifique-se de que userEmail está correto

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const path = `/User/email/${userEmail}`;

  const getUser = async () => {
    try {
      const response = await api.get(path);
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // Executa apenas uma vez quando o componente monta

  return (
    <div className="profile">
      <div className="profile-header">
        <h2>Perfil do Usuário</h2>
        <FaEdit onClick={() => navigate("/edit-profile")} className="profile-edit_icon" />
      </div>
      <div className="profile-info">
        {user ? (
          <>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>E-mail:</strong> {user.email}</p>
            <p><strong>CPF/CNPJ:</strong> {user.federalCodeClient}</p>
            <p><strong>Data de Nascimento:</strong> {user.birthdate}</p>
            <p><strong>Telefone:</strong> {user.phone}</p>
            <p><strong>Tipo de Usuário:</strong> {user.userType}</p>
          </>
        ) : (
          <p>Carregando...</p> // Adicionando um fallback
        )}
      </div>
    </div>
  );
};