import './perfilstyle.css'
import { useEffect, useState } from "react";
import type { ReactNode } from "react"; 

interface PerfilProps{
    children?:ReactNode;
}


function Perfil(props:PerfilProps) {
    const{children} = props;
  return (
  
    <div className="container-perfil">
    <div className="profile-pic">
      <img src="public/img/profile.jpeg" alt="Perfil"></img>
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
           <a href="#" className="btn btn-icon-only" title="CV">
            <i className="fa-regular fa-file"></i>
          </a>
          <a href="#" className="btn btn-icon-only" title="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" className="btn btn-icon-only" title="GitHub">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  </div>

  )
}

const palabras = ["Técnico Medio en Informática","Desarrollador Web Junior"];
const velocidad = 70;      // velocidad de escritura (más rápida)
const pausa = 2000;        // pausa entre palabras

export const Typewriter = () => {
  const [indice, setIndice] = useState(0);
  const [texto, setTexto] = useState("");
  const [borrando, setBorrando] = useState(false);

  useEffect(() => {
    const palabraActual = palabras[indice];
    let timeout: number;

    if (!borrando && texto.length < palabraActual.length) {
      // Escribiendo
      timeout = setTimeout(() => {
        setTexto(palabraActual.slice(0, texto.length + 1));
      }, velocidad);
    } else if (borrando && texto.length > 0) {
      // Borrando
      timeout = setTimeout(() => {
        setTexto(palabraActual.slice(0, texto.length - 1));
      }, velocidad / 3);
    } else if (!borrando && texto.length === palabraActual.length) {
      // Terminó de escribir, espera antes de borrar
      timeout = setTimeout(() => {
        setBorrando(true);
      }, pausa);
    } else if (borrando && texto.length === 0) {
      // Terminó de borrar, pasa a la siguiente palabra
      timeout = setTimeout(() => {
        setBorrando(false);
        setIndice((indice + 1) % palabras.length);
      }, velocidad);
    }

    return () => clearTimeout(timeout);
  }, [texto, borrando, indice]);

  return (
    <div className="typewriter">
      <span>{texto}</span>
      <span className="cursor">|</span>
    </div>
  );
};

export default Perfil