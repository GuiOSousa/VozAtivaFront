import React, { useState, useEffect } from "react";
import ReportView from "../components/ReportView";
import ReportStatusUpdate from "../components/ReportStatusUpdate";
import api from "../axios/api";
import "./styles/ReportListPage.css";
import { userEmail } from "./loginScreen";
import { useNavigate } from "react-router-dom";

const ReportListPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const path = `/User/email/${userEmail}`;

  const getUser = async () => {
    try {
      const response = await api.get(path);
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const getAlerts = async (id) => {
    try {
      const response = await api.get("/Alert");
      const filteredAlerts = response.data.filter((a) => a.userId === id);
      setAlerts(filteredAlerts);
    } catch (error) {
      console.error("Erro ao buscar alertas:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatusValue) => {
    try {
      // Mapear o novo status para a string correspondente, se necessário
      const statusMap = {
        1: 'Aberto',
        3: 'Finalizado',
      };
  
      const newStatus = statusMap[newStatusValue] || 'Aberto';
  
      // Opcionalmente, exibir o status que será enviado
      console.log('Atualizando status para:', newStatus);
  
      // Fazer a requisição PUT para '/Alert/{id}' com o novo status no corpo
      const response = await api.put(`/Alert`, { status: newStatus });
  
      if (response.status === 200) {
        // Atualize o alerta específico na lista de alertas
        setAlerts((prevAlerts) =>
          prevAlerts.map((alert) =>
            alert.id === id ? { ...alert, status: newStatus } : alert
          )
        );
      } else {
        console.error(`Erro ao atualizar status: ${response.statusText}`);
      }
    } catch (error) {
      if (error.response) {
        console.error('Erro ao atualizar status:', error.response.data);
      } else {
        console.error('Erro ao atualizar status:', error.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      getAlerts(user.id);
    }
  }, [user]);

  return (
    <div className="report-list-page">
      <h2>Suas Denúncias</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : alerts && alerts.length > 0 ? (
        alerts.map((report) => (
          <div key={report.id} className="report-item">
            <h3>{report.title}</h3>
            <p>Descrição: {report.description}</p>
            <p>Data: {new Date(report.date).toLocaleString()}</p>
            <p>Status: {report.status}</p> {/* Exibe 1 ou 2 diretamente */}
            <p>Id: {report.id}</p>
            <ReportStatusUpdate
              currentStatus={report.status}
              onUpdateStatus={(newStatus) => updateStatus(report.id, newStatus)}
            />
          </div>
        ))
      ) : (
        <p>Nenhuma denúncia encontrada.</p>
      )}
    </div>
  );
};

export default ReportListPage;