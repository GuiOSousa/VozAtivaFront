import React from 'react';


const ReportView = ({ report }) => {
  return (
    <div className="report-view">
      <h2>{report.title}</h2>
      <p><strong>Descrição:</strong> {report.description}</p>
      <p><strong>Data:</strong> {report.date}</p>
      <p><strong>Status:</strong> {report.status}</p>
      <p><strong>Id:</strong> {report.id}</p>
    </div>
  );
};

export default ReportView;