import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../components/navBar";
import { FaEdit } from "react-icons/fa"; // Importe o ícone de edição
import api from "../axios/api"; // Importe a API para buscar os alertas

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [expandedAlert, setExpandedAlert] = useState(null);

  // Simulação de dados do usuário (substituir com API futuramente)
  const [user] = useState({
    name: "João Silva",
    email: "joao.silva@example.com",
    federalCodeClient: "123.456.789-00",
    birthdate: "1990-01-15",
    phone: "(11) 91234-5678",
    userType: "Citizen",
  });

  useEffect(() => {
    // Função para buscar os alertas do usuário
    const fetchAlerts = async () => {
      try {
        const response = await api.get("/alerts", { params: { userId: user.id } });
        setAlerts(response.data);
      } catch (error) {
        console.error("Erro ao buscar alertas do usuário:", error);
      }
    };
    
    // Adiciona um alerta padrão como exemplo
    setAlerts(() => [
      {
        id: "example-alert-0",
        title: "Alerta de Queimada",
        description: "Este é um alerta de exemplo.",
        date: "2023-10-01",
        location: "São Paulo, SP",
        status: "Ativo",
        alertType: "Ambiental",
      },
      {
        id: "example-alert-1",
        title: "Batida de Trânsito",
        description: "Este é um alerta de exemplo.",
        date: "2023-10-01",
        location: "São Paulo, SP",
        status: "Encerrado",
        alertType: "Trânsito",
      },
    ]);
    
    fetchAlerts();
  }, [user.id]);
  
  const handleAlertClick = (alert) => {
    setExpandedAlert(expandedAlert === alert.id ? null : alert.id);
  };

  return (
    <div className="profile">
      <NavigationBar />
      <div className="profile-header">
        <h2>Perfil do Usuário</h2>
        <FaEdit onClick={() => navigate("/edit-profile")} className="profile-edit_icon" />
      </div>
      <div className="profile-info">
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>E-mail:</strong> {user.email}</p>
        <p><strong>CPF/CNPJ:</strong> {user.federalCodeClient}</p>
        <p><strong>Data de Nascimento:</strong> {user.birthdate}</p>
        <p><strong>Telefone:</strong> {user.phone}</p>
        <p><strong>Tipo de Usuário:</strong> {user.userType}</p>
      </div> 

      <h3>Meus Alertas</h3>
      <div className="user-alerts">
        {alerts.length > 0 ? (
          <ul>
            {alerts.map((alert) => (
              <li key={alert.id} onClick={() => handleAlertClick(alert)}>
                <strong>{alert.title}</strong> - {alert.date} - {alert.status}
                {expandedAlert === alert.id && (
                  <div className="alert-details">
                    <p><strong>Descrição:</strong> {alert.description}</p>
                    <p><strong>Data:</strong> {alert.date}</p>
                    <p><strong>Localização:</strong> {alert.location}</p>
                    <p><strong>Tipo de Alerta:</strong> {alert.alertType}</p>
                    {/* Adicione mais campos conforme necessário */}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Você ainda não criou nenhum alerta.</p>
        )}
      </div>
    </div>
  );
};
