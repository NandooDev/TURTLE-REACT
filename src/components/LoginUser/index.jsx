import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./style.css";

export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function loginUser() {
    try {
      const response = await api.post(
        "/users/login",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" }, // Corrigido
        }
      );

      if (response.status === 201) {
        localStorage.setItem("acessToken", response.data.acessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        navigate("/feed-turtle");
      }
    } catch (error) {
      window.alert("Erro ao entrar, por favor tente novamente!")
      console.error("Erro ao entrar:", error);
    }
  }

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login-box"
      >
        <h2 className="title">Entrar</h2>

        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="options">
          <label className="checkbox">
            <input type="checkbox" /> Lembrar de mim
          </label>
          <a href="#" className="forgot">
            Esqueceu a senha?
          </a>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="login-button"
          onClick={(event) => {
            event.preventDefault();
            loginUser();
          }}
        >
          Entrar
        </motion.button>

        <p className="signup-text">
          ou{" "}
          <Link className="link" to="/cadastrar">
            Cadastrar
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
