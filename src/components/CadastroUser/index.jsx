import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./style.css";

export default function CadastroUser() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function createUser() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    //formData.append("file", inputProfilePhoto.current.files[0]); // Pega o arquivo real
    formData.append("role", "user");

    try {
      const response = await api.post("/users/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        navigate("/entrar");
      }
    } catch (error) {
      window.alert("Erro ao criar usuário, por favor tente novamente!")
      console.error("Erro ao criar usuário:", error);
    }
  }

  return (
    <div className="container">
      <form action="" method="POST">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="login-box"
        >
          <h2 className="title">Cadastrar</h2>

          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Nome de Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <FaSign className="icon" />
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

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="login-button"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              createUser();
            }}
          >
            Cadastrar
          </motion.button>

          <p className="signup-text">
            ou{" "}
            <Link className="link" to="/entrar">
              Entrar
            </Link>
          </p>
        </motion.div>
      </form>
    </div>
  );
}
