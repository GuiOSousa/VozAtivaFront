import { useState } from "react";
import api from "../axios/api";

const MapPopup = ({ lat, lng, popup }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("ambiental");  

  const getAlertType = () => {
    if (category === 'ambiental')
      return 1

    if (category === 'transito')
      return 2

    if (category === 'seguranca')
      return 3

    return 4
  }

  const handleSubmit = async () => {
    const data = {
      title,
      description,
      date: "2025-02-05T20:34:50.648Z",
      userId: "11111111-1111-1111-1111-111111111111",
      publicAgentId: 1,
      alertTypeId: getAlertType(),
      latitude: lat,
      longitude: lng,
      status: 1
    };
  
    console.log("Enviando dados:", data);
  
    try {
      const response = await api.post('/Alert', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Resposta da API:", response.data);
      popup.close()
    } catch (error) {
      if (error.response) {
        console.error("Erro da API:", error.response.data);  
        console.error("Status:", error.response.status);      
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  };  

  return (
    <div style={{ textAlign: "center" }}>
      <p>
        <strong>Dados do Alerta:</strong>
      </p>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "90%",
          padding: "8px",
          margin: "5px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "90%",
          height: "60px",
          padding: "8px",
          margin: "5px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      ></textarea>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          width: "90%",
          padding: "8px",
          margin: "5px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <option value="ambiental">Ambiental</option>
        <option value="transito">Trânsito</option>
        <option value="seguranca">Segurança</option>
        <option value="outros">Outros</option>
      </select>

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background 0.3s",
          marginTop: "8px"
        }}
      >
        Enviar
      </button>
    </div>
  );
};

export default MapPopup;
