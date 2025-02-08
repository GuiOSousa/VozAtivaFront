import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../components/navBar";

export const ProfilePage = () => {
  const navigate = useNavigate();

  // Simulação de dados do usuário (substituir com API futuramente)
  const [user] = useState({
    name: "João Silva",
    email: "joao.silva@example.com",
    federalCodeClient: "123.456.789-00",
    birthdate: "1990-01-15",
    phone: "(11) 91234-5678",
    userType: "Citizen",
  });

  return (
    <div className="profile">
      <h2>Perfil do Usuário</h2>
      <div className="profile-info">
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>E-mail:</strong> {user.email}</p>
        <p><strong>CPF/CNPJ:</strong> {user.federalCodeClient}</p>
        <p><strong>Data de Nascimento:</strong> {user.birthdate}</p>
        <p><strong>Telefone:</strong> {user.phone}</p>
        <p><strong>Tipo de Usuário:</strong> {user.userType}</p>
      </div>

      <button onClick={() => navigate("/edit-profile")} className="profile-edit_button">
        Editar Perfil
      </button>
      <NavigationBar/>
    </div>
  );
};
