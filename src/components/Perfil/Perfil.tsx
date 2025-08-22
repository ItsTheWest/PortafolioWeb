import './perfilstyle.css'
import { useEffect, useState } from "react";
import type { ReactNode, FC } from "react";

interface PerfilProps{
    children?:ReactNode;
}

const abrirDocumento = () => {
  window.open("/documents/CV-NelsonFigueroa-2025.pdf", "_blank");
};

const Perfil: FC<PerfilProps> = (props) => {
  const { children } = props;
  return (
    <div className="container-perfil">
      <div className="profile-pic">
        <img src="/img/profile.jpeg" alt="Perfil" />
      </div>
      <div className="info">
        <h1>Hola, <span>soy Nelson</span></h1>
        {children}
        <p className="description">
          Transformo el tiempo en conocimiento, el conocimiento en soluciones, y las soluciones en oportunidades que impulsan mi 
          evolución personal y profesional.
        </p>
        <div className="buttons">
          <a href="mailto:nelson@email.com" className="btn btn-email">
            <i className="fas fa-envelope"></i> nelsonjosue0407@gmail.com
          </a>
          <div className="icon-buttons">
            <a onClick={abrirDocumento} target='_blank' rel="noopener noreferrer" className="btn btn-icon-only" title="CV">
              <i className="fa-regular fa-file"></i>
            </a>
            <a href="https://www.linkedin.com/in/figueroa2007" target='_blank' rel="noopener noreferrer" className="btn btn-icon-only" title="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/ItsTheWest" target='_blank' rel="noopener noreferrer" className="btn btn-icon-only" title="GitHub">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const palabras = ["Técnico Medio en Informática","Desarrollador Web Junior"];
const velocidad = 70;
const pausa = 2000;

export const Typewriter: FC = () => {
  const [indice, setIndice] = useState(0);
  const [texto, setTexto] = useState("");
  const [borrando, setBorrando] = useState(false);

  useEffect(() => {
    const palabraActual = palabras[indice];
    let timeout: number;

    if (!borrando && texto.length < palabraActual.length) {
      timeout = window.setTimeout(() => {
        setTexto(palabraActual.slice(0, texto.length + 1));
      }, velocidad);
    } else if (borrando && texto.length > 0) {
      timeout = window.setTimeout(() => {
        setTexto(palabraActual.slice(0, texto.length - 1));
      }, velocidad / 3);
    } else if (!borrando && texto.length === palabraActual.length) {
      timeout = window.setTimeout(() => {
        setBorrando(true);
      }, pausa);
    } else if (borrando && texto.length === 0) {
      timeout = window.setTimeout(() => {
        setBorrando(false);
        setIndice((indice + 1) % palabras.length);
      }, velocidad);
    }

    return () => clearTimeout(timeout);
  }, [texto, borrando, indice, palabras]);

  return (
    <div className="typewriter">
      <span>{texto}</span>
      <span className="cursor">|</span>
    </div>
  );
};

export default Perfil