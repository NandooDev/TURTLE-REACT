import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CadastroUser from "./components/CadastroUser";
import LoginUser from "./components/LoginUser";
import PageFeed from "./components/PageFeed";
import PageEntrar from "./components/PageEntrar";
import ForgotPassword from "./components/ForgotPassword";
import CriarPost from "./components/CriarPost";
import UserBuscado from "./components/UserBuscado";
import Perfil from "./components/Perfil";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/entrar" element={<LoginUser />} />
        <Route path="/cadastrar" element={<CadastroUser />} />
        <Route path="/feed-turtle" element={<PageFeed />} />
        <Route path="/" element={<PageEntrar />} />
        <Route path="/esqueceu-a-senha" element={<ForgotPassword />} />
        <Route path="/criar-post" element={<CriarPost />} />
        <Route path="/buscar-usuario" element={<UserBuscado />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  </StrictMode>
);
