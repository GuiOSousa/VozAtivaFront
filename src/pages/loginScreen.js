import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Senha:", password);
    
    // Aqui você pode adicionar a lógica de autenticação, como uma requisição à API.
    alert("Login realizado! (Simulação)");

    // Redireciona para a tela inicial após o login
    navigate("/");
  };

  return (
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
  );
};

export default LoginScreen;
