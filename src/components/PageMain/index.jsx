import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function PageMain() {
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyLogin() {
      if (!localStorage.getItem("acessToken")) {
        navigate("/entrar");
      }
    }
    verifyLogin();
  }, [navigate]);

  return <h1>HELLO WORLD</h1>;
}
