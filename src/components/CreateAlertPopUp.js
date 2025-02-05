import { useState } from "react";

const MapPopup = ({ lat, lng }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("ambiental");

  const handleSubmit = () => {
    console.log("Título:", title);
    console.log("Descrição:", description);
    console.log("Categoria:", category);
    console.log("Latitude:", lat.toFixed(6));
    console.log("Longitude:", lng.toFixed(6));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <p>
        <strong>Você clicou em:</strong>
      </p>
      <p>Lat: {lat.toFixed(6)}</p>
      <p>Lng: {lng.toFixed(6)}</p>

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
        }}
      >
        Enviar
      </button>
    </div>
  );
};

export default MapPopup;
