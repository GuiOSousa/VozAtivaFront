import React, { useState, useEffect } from "react";
import ReportView from "../components/ReportView";
import ReportStatusUpdate from "../components/ReportStatusUpdate";
import api from "../axios/api"; // Sua instância do axios
import "./styles/ReportListPage.css";
import { userEmail } from "./loginScreen";
import { useNavigate } from "react-router-dom";

const ReportListPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
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

  const updateStatus = async (id, status) => {
    const path = `/Alert/${id}`
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
  }, [user]); // Dispara quando `user` for atualizado

  return (
    <div className="report-list-page">
      <h2>Suas Denúncias</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : alerts && alerts.length > 0 ? (
        alerts.map((report) => (
          <div key={report.id} className="report-item">
            <ReportView report={report} />
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
