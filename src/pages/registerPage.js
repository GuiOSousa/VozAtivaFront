import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";


const RegisterScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [federalCodeClient, setFederalCodeClient] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("Citizen");

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      federalCodeClient,
      birthdate,
      phone,
      userType,
    };

    console.log("Enviando dados:", data);

    try {
      const response = await api.post("/User", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Resposta da API:", response.data);
      alert("Cadastro realizado com sucesso!");
      navigate("/login"); // Redireciona para login após cadastro
    } catch (error) {
      if (error.response) {
        console.error("Erro da API:", error.response.data);
        console.error("Status:", error.response.status);
        alert("Erro ao cadastrar: " + error.response.data.message);
      } else {
        console.error("Erro desconhecido:", error);
        alert("Erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <div className="register">
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister} className="login-form">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input"
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />

        <input
          type="text"
          placeholder="CPF/CNPJ"
          value={federalCodeClient}
          onChange={(e) => setFederalCodeClient(e.target.value)}
          required
          className="input"
        />

        <input
          type="date"
          placeholder="Data de Nascimento"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
          className="input"
        />

        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="input"
        />

        <button type="submit" className="button">Cadastrar</button>
      </form>

      <p>
        Já tem uma conta?{" "}
        <span onClick={() => navigate("/login")} className="link">
          Faça login
        </span>
      </p>
    </div>
  );
};

export default RegisterScreen;
