import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../axios/api";
import { NavigationBar } from "../components/navBar";

const AlertScreen = ({ onAlertCreated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lat, lng } = location.state || { lat: null, lng: null };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("ambiental");

  const getAlertType = () => {
    if (category === "ambiental") return 1;
    if (category === "transito") return 2;
    if (category === "seguranca") return 3;
    return 4;
  };

  const handleSubmit = async () => {
    const data = {
      title,
      description,
      date: new Date().toISOString(),
      userId: "11111111-1111-1111-1111-111111111111",
      publicAgentId: 1,
      alertTypeId: getAlertType(),
      latitude: lat,
      longitude: lng,
      status: 1,
    };

    console.log("Enviando dados:", data);

    try {
      const response = await api.post("/Alert", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Resposta da API:", response.data);
      if (onAlertCreated) {
        onAlertCreated(); // Chama a callback para atualizar
      }
      navigate(-1); // Volta para a tela anterior
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
    <div>
    <div className="create_alert">
      <h2>Novo Alerta</h2>
      <div className="create_alert-lat_long_div">
      <input
        type="text"
        placeholder="Latitude"
        value={title}
        className="input"
      />
      <input
        type="text"
        placeholder="Longitude"
        value={title}
        className="input"
      />
      </div>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
      />

      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input"
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} className="select-input">
        <option value="ambiental">Ambiental</option>
        <option value="transito">Trânsito</option>
        <option value="seguranca">Segurança</option>
        <option value="outros">Outros</option>
      </select>
      <div className="create_alert-button_div">
        <button onClick={handleSubmit} className="create_alert-button_div-button">Enviar</button>
        <button onClick={() => navigate(-1)} className="create_alert-button_div-button_gray">Cancelar</button>
      </div>
      
    </div>
    <NavigationBar/>
    </div>
  );
};


export default AlertScreen;
