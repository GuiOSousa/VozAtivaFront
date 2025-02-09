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
      <h2>Alterar Status da Denúncia</h2>
      <select value={newStatus} onChange={handleStatusChange}>
        <option value="Aberto">Aberto</option>
        <option value="Em progresso">Em progresso</option>
        <option value="Concluído">Concluído</option>
      </select>
      <button onClick={handleSubmit}>Atualizar Status</button>
    </div>
  );
};

export default ReportStatusUpdate;