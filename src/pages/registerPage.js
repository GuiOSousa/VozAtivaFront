import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import "../pages/styles/RegisterPage.css";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [federalCodeClient, setFederalCodeClient] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("Citizen");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const validatePassword = (password) => {
    const errors = [];
  
    if (password.length < 6) {
      errors.push("A senha deve ter pelo menos 6 caracteres.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("A senha deve conter pelo menos um caractere especial.");
    }
    if (!/\d/.test(password)) {
      errors.push("A senha deve conter pelo menos um número.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("A senha deve conter pelo menos uma letra minúscula.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("A senha deve conter pelo menos uma letra maiúscula.");
    }
    if (new Set(password).size < 2) {
      errors.push("A senha deve conter pelo menos 2 caracteres diferentes.");
    }
  
    return errors;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrors(validatePassword(newPassword));
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      federalCodeClient,
      birthdate,
      phone,
      userType: 1,
    };

    const regData = {
      username: email,
      email,
      password
    }

    console.log(regData)
    console.log(data)

    if (errors.length > 0){
      alert("Senha inválida!")
      return
    }

    console.log("Enviando dados:", data);

    try {
      const response = await api.post("/user", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      

      if (response.status === 201) {
        const reg = await api.post("/api/Auth/register", regData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (reg.status !== 201) {
          alert("Erro na criação do Registro")
          return
        }
  
        console.log("Resposta da API:", response.data);
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        throw Error("Erro na criação do Registro.")
      }
    
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
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
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
