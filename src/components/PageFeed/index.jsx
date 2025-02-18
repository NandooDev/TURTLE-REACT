import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaComment, FaHeart } from "react-icons/fa";
import "./style.css";

export default function PageFeed() {
  return (
    <div className="container">
      <div className="barra-pesquisa">
        <input type="text" placeholder="Buscar pessoas" />
      </div>
      <div className="posts">
        <div className="post">
          <div className="user-post">
            <img src="./src/assets/logoturtle.png" alt="foto de perfil" />
            <h3>turtleoficial</h3>
          </div>
          <div className="img-post">
            <img src="./src/assets/turtlelogo.jpg" alt="imagem do post" />
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
          <p className="descricao">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's
          </p>
        </div>        
      </div>      
    </div>
  );
}
