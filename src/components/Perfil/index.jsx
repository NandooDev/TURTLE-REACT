import api from "../../services/api";
import "./style.css";

export default function Perfil() {
  return (
    <div className="container">
      <div></div>
      <div className="mainInfos">
        <div className="profile_photo">
          <div className="photo">
            <img
              src="https://i.pinimg.com/236x/df/fd/d1/dffdd1fda06ef0bab838e7e3504d898c.jpg"
              alt=""
            />
          </div>
          <div className="username">
            <h3>nandoodev</h3>
          </div>
        </div>
        <div className="infos">
          <div className="um">
            <h3>1000 Seguidores</h3>
            <h3>12 Posts</h3>
          </div>
          <div className="dois">
            <h5>Olá eu me chamo Fernando Henrique Correia de Albuqeurque</h5>
          </div>
        </div>
      </div>
      <div className="posts">
        <div>
          <img
            src="https://assets.papelpop.com/wp-content/uploads/2022/02/the-batman.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://assets.papelpop.com/wp-content/uploads/2022/02/the-batman.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://assets.papelpop.com/wp-content/uploads/2022/02/the-batman.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://assets.papelpop.com/wp-content/uploads/2022/02/the-batman.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://assets.papelpop.com/wp-content/uploads/2022/02/the-batman.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://assets.papelpop.com/wp-content/uploads/2022/02/the-batman.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
