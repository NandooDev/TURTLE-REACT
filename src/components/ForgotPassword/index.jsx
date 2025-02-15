import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./style.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  async function forgotPassword() {
    try {
      console.log(typeof(email));
      if (newPassword === repeatNewPassword) {
        const response = await api.patch(
          "/users/forgot-password",
          {
            email: email,
            newPassword: newPassword,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log(response.data);

        if (response.status === 200) {
          navigate("/entrar");
        } else if (response.data === "User not registered") {
          window.alert("Usuário não existe, por favor informe um email válido");
        } else if (
          response.data === "Error to the update password" ||
          response.data === "Something went wrong"
        ) {
          window.alert(
            "Erro ao atualizar senha, por favor recarregue a página e tente novamente"
          );
        }
      } else {
        window.alert("Repita a senha corretamente")
      }
    } catch (error) {
      window.alert("Erro ao atualizar senha, por favor recarregue a página e tente novamente");
      console.error("Erro ao atualizar senha:", error);
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
          <h2 className="title">Esqueceu a Senha</h2>

          <div className="input-group">
            <FaSign className="icon" />
            <input
              type="email"
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
              placeholder="Nova Senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Repita a Senha"
              value={repeatNewPassword}
              onChange={(e) => setRepeatNewPassword(e.target.value)}
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
              forgotPassword();
            }}
          >
            Atualizar Senha
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
