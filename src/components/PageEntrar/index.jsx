import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./style.css";

export default function PageEntrar() {
  return (
    <div className="container">
        <img src="./src/assets/logoturtle.png" alt="Minha Figura"></img>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="button"
        >
          <Link className="link" to="/entrar">
            Entrar
          </Link>
        </motion.button>
    </div>
  );
}
