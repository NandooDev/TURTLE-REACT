import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBorderNone, FaComment, FaHeart } from "react-icons/fa";
import api from "../../services/api";
import "./style.css";

export default function PageFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await api.get("/posts/");
        const postsData = response.data;

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

  return (
    <div className="container">
      <div></div>
      <div className="barra-pesquisa">
        <input type="text" placeholder="Buscar pessoas" />
      </div>
      <div id="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="user-post">
              <img
                src={
                  post.profile_photo ||
                  "https://i.pinimg.com/236x/df/fd/d1/dffdd1fda06ef0bab838e7e3504d898c.jpg"
                }
                alt="foto de perfil"
              />
              <h3>{post.username}</h3>
            </div>
            <div className="img-post">
              <img src={post.attachment} alt="imagem do post" />
            </div>
            <div className="buttons">
              <div>
                <FaHeart className="icon"></FaHeart>
                <p>10</p>
              </div>
              <div>
                <FaComment className="icon"></FaComment>
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
