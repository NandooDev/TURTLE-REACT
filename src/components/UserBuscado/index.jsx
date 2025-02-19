import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import "./style.css";

export default function UserBuscado() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [hasUser, setHasUser] = useState(false);
  const [searched, setSearched] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const usernameFromURL = queryParams.get("username");

    if (usernameFromURL) {
      setUsername(usernameFromURL);
    }
  }, []);

  const handleSearch = async () => {
    if (!username) {
      setHasUser(false);
      setUser(null);
      setSearched(true);
      return;
    }
    try {
      const response = await api.post("/users/findUsername/", {
        username: username,
      });
      const usernameData = response.data;

      if (!usernameData || usernameData.length === 0) {
        setHasUser(false);
        setUser(null);
      } else {
        setHasUser(true);
        setUser(usernameData);
      }
      setSearched(true);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      setSearched(true);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    setSearched(false); 
  };

  return (
    <div className="container">
      <div></div>
      <div className="barra-pesquisa">
        <div>
          <input
            type="text"
            placeholder="Buscar pessoas"
            value={username}
            onChange={handleInputChange}
            id="inputsearch"
          />
          <FaSearch className="icon" onClick={handleSearch} />
        </div>
      </div>

      {hasUser && user && (
        <div className="userFound" key={user.id}>
          <img
            src={
              user.profile_photo ||
              "https://i.pinimg.com/236x/df/fd/d1/dffdd1fda06ef0bab838e7e3504d898c.jpg"
            }
            alt="foto de perfil"
          />
          <h3>{user.username}</h3>
        </div>
      )}

      {searched && !hasUser && username && <h2>Nenhum usuário encontrado!</h2>}
    </div>
  );
}
