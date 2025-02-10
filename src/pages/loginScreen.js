import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/styles/LoginScreen.css";
import api from "../axios/api";

// Flag global para indicar se o usuário está logado
export let isLoggedIn = false;

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const logData = {
      email,
      password
    }
    
    try {
      const login = await api.post("/api/Auth/login", logData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(login)

      if (login.status === 200) {
        isLoggedIn = true;
        navigate("/");
      }
    } catch(error) {
      alert("E-mail ou senha incorreto(s)")
    }

  };

  return (
    <div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button">Entrar</button>
        </form>
        <p>
          Não tem uma conta?{" "}
          <span onClick={() => navigate("/register")} className="link">
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
