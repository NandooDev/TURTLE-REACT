import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./style.css";
import { decodeJWT } from "../../services/decodeJwt";

export default function CriarPost() {
  const navigate = useNavigate();

  const decodeToken = decodeJWT(localStorage.getItem("acessToken"));

  const [title, setTitle] = useState("");
  const [descricao, setDescricao] = useState("");
  const [file, setFile] = useState(null);

  async function createPost() {
    const newAcessToken = await api
      .post("/auth/refresh", {
        refreshToken: localStorage.getItem("refreshToken"),
      })
      .then((response) => {
        localStorage.setItem("acessToken", response.data);
        return true;
      })
      .catch((error) => {
        window.alert("Sua sessão expirou, faça login novamente...");
        console.log(error);
        navigate("/entrar");
        return false;
      });

    if (newAcessToken == true) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", descricao);
      if (file != null) {
        formData.append("file", file);
      }
      formData.append("published", true);
      formData.append("id_user", decodeToken.payload.id);

      const response = await api
        .post("/posts/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("acessToken")}`,
          },
        })
        .then((response) => {
          window.alert(
            "Publicação feita com sucesso! Redirecionando para Feed..."
          );
          navigate("/feed-turtle");
        })
        .catch((error) => {
          window.alert("Erro ao fazer publicação, por favor recarregue a página e tente novamente!")
          console.error("Erro ao criar post:", error);
        });
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
          <h2 className="title">Criar Post</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="Titulo do Post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="file"
              placeholder="Imagem"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Descrição do Post"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
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
              createPost();
            }}
          >
            Criar Post
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
}
