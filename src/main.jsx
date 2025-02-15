import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CadastroUser from "./components/CadastroUser";
import LoginUser from "./components/LoginUser";
import PageMain from "./components/PageMain";
import PageEntrar from "./components/PageEntrar";
import ForgotPassword from "./components/ForgotPassword";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/entrar" element={<LoginUser />} />
        <Route path="/cadastrar" element={<CadastroUser />} />
        <Route path="/feed-turtle" element={<PageMain />} />
        <Route path="/turtle-entrar" element={<PageEntrar />} />
        <Route path="/esqueceu-a-senha" element={<ForgotPassword />} />
      </Routes>
    </Router>
  </StrictMode>
);
