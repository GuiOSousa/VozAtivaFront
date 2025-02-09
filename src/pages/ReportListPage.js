import React, { useState, useEffect } from 'react';
import ReportView from '../components/ReportView';
import ReportStatusUpdate from '../components/ReportStatusUpdate';
import api from "../axios/api"; // Sua instância do axios

const initialReports = [
    { id: 1, title: "Denúncia 1", description: "Descrição 1", status: "Aberto" },
    { id: 2, title: "Denúncia 2", description: "Descrição 2", status: "Em progresso" },
    { id: 3, title: "Denúncia 3", description: "Descrição 3", status: "Concluído" },
  ];
const ReportListPage = () => {
  const initialReports = [
    { id: 1, title: "Denúncia Exemplo 1", description: "Descrição exemplo 1", status: "Aberto" },
    { id: 2, title: "Denúncia Exemplo 2", description: "Descrição exemplo 2", status: "Em progresso" },
    { id: 3, title: "Denúncia Exemplo 3", description: "Descrição exemplo 3", status: "Concluído" },
  ];

  const [reports, setReports] = useState(initialReports);
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/reports'); // Endpoint que retorna as denúncias
        setReports(response.data);
      } catch (error) {
        console.error("Erro ao buscar denúncias:", error);
      }
    };

    fetchReports();
  }, []); // Executa uma vez ao montar

  // Define a função updateStatus
  const updateStatus = (id, newStatus) => {
    setReports(reports.map(report =>
      report.id === id ? { ...report, status: newStatus } : report
    ));
  };

  return (
    <div className="report-list-page">
      <h2>Lista de Denúncias</h2>
      {reports.map(report => (
        <div key={report.id} className="report-item">
          <ReportView report={report} />
          <ReportStatusUpdate
            currentStatus={report.status}
            onUpdateStatus={(newStatus) => updateStatus(report.id, newStatus)}
          />
        </div>
      ))}
    </div>
  );
};

export default ReportListPage;