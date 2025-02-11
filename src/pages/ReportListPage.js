import React, { useState, useEffect } from "react";
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

  const updateStatus = async (alertData, newStatusValue) => {
    try {
      console.log('Atualizando status para:', newStatusValue);
      console.log(typeof(newStatusValue))
      
      const id = parseInt(newStatusValue)
      console.log(typeof(id))

      console.log(alertData.id)

      alertData.status = id
  
  
      const response = await api.put(`/Alert`, alertData);
  
      if (response.status === 200) {
          getAlerts(user.id)
          alert("Alerta atualizado com sucesso!")
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
            <h2>{report.title}</h2>
            <p>Id: {report.id}</p>
            <p>Descrição: {report.description}</p>
            <p>Data: {new Date(report.date).toLocaleString()}</p>
            <p>Status:<strong> {report.status === 1 ? "Aberto" : "Finalizado"}</strong></p>
            <ReportStatusUpdate
              currentStatus={report.status}
              onUpdateStatus={(newStatus) => updateStatus(report, newStatus)}
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