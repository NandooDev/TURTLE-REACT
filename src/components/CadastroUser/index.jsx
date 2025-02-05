import { useRef } from "react";
import "./style.css";
import api from "../../services/api";

function CadastroUser() {
  const inputProfilePhoto = useRef();
  const inputName = useRef();
  const inputUsername = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  async function createUser() {
    const formData = new FormData();
    formData.append("name", inputName.current.value);
    formData.append("username", inputUsername.current.value);
    formData.append("email", inputEmail.current.value);
    formData.append("password", inputPassword.current.value);
    formData.append("file", inputProfilePhoto.current.files[0]); // Pega o arquivo real
    formData.append("role", "user");

    await api.post("/users/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  return (
    <div className="container">
      <form action="" method="POST">
        <h1>Cadastro de Usuário</h1>
        <input type="file" name="profile_photo" ref={inputProfilePhoto} />
        <input
          type="text"
          name="name"
          placeholder="Nome"
          required
          ref={inputName}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          ref={inputUsername}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          ref={inputEmail}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          required
          ref={inputPassword}
        />
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            createUser();
          }}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroUser;
