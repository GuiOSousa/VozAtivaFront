import React from 'react';


const ReportView = ({ report }) => {
  return (
    <div className="report-view">
      <h2>Detalhes da Denúncia</h2>
      <p><strong>Título:</strong> {report.title}</p>
      <p><strong>Descrição:</strong> {report.description}</p>
      <p><strong>Status Atual:</strong> {report.status}</p>
    </div>
  );
};

export default ReportView;