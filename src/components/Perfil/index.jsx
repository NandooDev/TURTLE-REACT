import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";
import "./style.css";

export default function Perfil() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [hasPosts, setHasPosts] = useState(false);
  const location = useLocation();

  // Pegando o ID do usuário da URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const idUserFromURL = queryParams.get("idUser");

    if (idUserFromURL) {
      fetchUserInfo(idUserFromURL);
      fetchUserPosts(idUserFromURL);
    }
  }, [location.search]);

  // Buscar dados do usuário pelo ID
  async function fetchUserInfo(idUser) {
    try {
      const response = await api.get(`/users/findId?id=${idUser}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
    }
  }

  // Buscar os posts do usuário
  async function fetchUserPosts(idUser) {
    try {
      const response = await api.post("/posts/myPosts", {
        id_user: idUser,
      });

      if (!response.data || response.data.length === 0) {
        setHasPosts(false);
        setPosts([]);
      } else {
        setHasPosts(true);
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  }

  return (
    <div className="container">
      <div></div>
      <div className="mainInfos">
        <div className="profile_photo">
          <div className="photo">
            <img
              src={
                userInfo?.profile_photo ||
                "https://i.pinimg.com/236x/df/fd/d1/dffdd1fda06ef0bab838e7e3504d898c.jpg"
              }
              alt="foto de perfil"
            />
          </div>
          <div className="username">
            <h3>{userInfo?.username || "Usuário desconhecido"}</h3>
          </div>
        </div>
        <div className="infos">
          <div className="um">
            <h3>{userInfo?.followers || 0} Seguidores</h3>
            <h3>{posts.length} Posts</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="seguir-button"
            >
              Seguir
            </motion.button>
          </div>
          <div className="dois">
            <h5>
              {userInfo?.bio || "Este usuário ainda não escreveu uma bio."}
            </h5>
          </div>
        </div>
      </div>

      <div className="posts">
        {!hasPosts ? (
          <h3>Nenhuma postagem encontrada.</h3>
        ) : (
          posts.map((post) =>
            post.attachment ? (
              <div key={post.id}>
                <img src={post.attachment} alt="imagem do post" />
              </div>
            ) : null
          )
        )}
      </div>
    </div>
  );
}
