import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaComment, FaHeart, FaSearch } from "react-icons/fa";
import api from "../../services/api";
import "./style.css";

export default function PageFeed() {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [hasPosts, setHasPosts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await api.get("/posts/");
        const postsData = response.data;

        if (!postsData || postsData.length === 0) {
          setHasPosts(false);
          return;
        } else {
          setHasPosts(true);
        }

        const postsWithUserData = await Promise.all(
          postsData.map(async (post) => {
            try {
              const responseUser = await api.get(`/users/findId`, {
                params: { id: post.id_user },
              });

              return {
                ...post,
                username: responseUser.data.username,
                profile_photo: responseUser.data.profile_photo,
              };
            } catch (error) {
              console.error("Erro ao buscar usuário:", error);
              return {
                ...post,
                username: "Usuário desconhecido",
                profile_photo: "default-profile.png",
              };
            }
          })
        );

        setPosts(postsWithUserData);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    }
    getPosts();
  }, []);

  function pageCreatePost() {
    window.location.href = "/criar-post";
  }

  function buscarUser() {
    navigate(`/buscar-usuario?username=${username}`); // Passa o username para a URL
  }

  const handleProfileClick = () => {
    navigate(`/perfil/${username}`); // Redireciona para /perfil/nandoodev
  };

  return (
    <div className="container">
      <div></div>
      <div className="barra-pesquisa">
        <FaPlus className="icon" onClick={pageCreatePost} />
        <div>
          <input
            type="text"
            placeholder="Buscar pessoas"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaSearch className="icon" onClick={buscarUser}></FaSearch>
        </div>
      </div>

      {!hasPosts && <h2 id="notPosts">Nenhuma publicação até o momento!</h2>}

      <div id="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="user-post">
              <img
                onClick={handleProfileClick}
                src={
                  post.profile_photo ||
                  "https://i.pinimg.com/236x/df/fd/d1/dffdd1fda06ef0bab838e7e3504d898c.jpg"
                }
                alt="foto de perfil"
              />
              <h3 onClick={handleProfileClick}>{post.username}</h3>
            </div>

            {post.attachment && ( // Verifica se há imagem antes de renderizar
              <div className="img-post">
                <img src={post.attachment} alt="imagem do post" id="imgpost" />
              </div>
            )}

            <div className="buttons">
              <div>
                <FaHeart className="icon" />
                <p>10</p>
              </div>
              <div>
                <FaComment className="icon" />
                <p>10</p>
              </div>
            </div>

            <p className="descricao">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
