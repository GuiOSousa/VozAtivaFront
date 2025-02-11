import React, { useState } from 'react';


const ReportStatusUpdate = ({ currentStatus, onUpdateStatus }) => {
  const [newStatus, setNewStatus] = useState(currentStatus);

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleSubmit = () => {
    onUpdateStatus(newStatus);
  };

  return (
    <div className="report-status-update">
      <h3>Alterar Status da Denúncia</h3>
      <select value={newStatus} onChange={handleStatusChange}>
        <option value="1">Aberto</option>
        <option value="2">Finalizado</option>
      </select>
      <button onClick={handleSubmit}>Atualizar Status</button>
    </div>
  );
};

export default ReportStatusUpdate;