import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirecionamento
import api from "../axios/api";
import { isLoggedIn } from "../pages/loginScreen"; // Importe a flag global
import "./styles/CreateAlertPopUp.css";
import { userEmail } from "../pages/loginScreen";

const MapPopup = ({ lat, lng, popup }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("ambiental");
  const navigate = useNavigate(); // Hook para redirecionamento
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const path = `/User/email/${userEmail}`;
    try {
      const response = await api.get(path);
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  const getAlertType = () => {
    if (category === 'ambiental')
      return 1;

    if (category === 'transito')
      return 2;

    if (category === 'seguranca')
      return 3;

    return 4;
  };

  const handleSubmit = async () => {
    //if (!isLoggedIn) {
    //  return null;
    //}

    const data = {
      title,
      description,
      date: new Date().toISOString(),
      userId: user.id,
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
      popup.close();
    } catch (error) {
      if (error.response) {
        console.error("Erro da API:", error.response.data);  
        console.error("Status:", error.response.status);      
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  };  

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="popup-container">
      <p>
        <strong>Dados do Alerta:</strong>
      </p>

      {!isLoggedIn ? (
        <button onClick={() => navigate('/login')}>
          Faça login para enviar um alerta
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="ambiental">Ambiental</option>
            <option value="transito">Trânsito</option>
            <option value="seguranca">Segurança</option>
            <option value="outros">Outros</option>
          </select>

          <button onClick={handleSubmit}>
            Enviar
          </button>
        </>
      )}
    </div>
  );
};

export default MapPopup;
