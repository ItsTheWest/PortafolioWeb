import './menustyle.css';
import React, { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react"; 

interface NavegadorProps{
  children?:ReactNode;
}

function Navegador(props:NavegadorProps) {
 const{children} = props;
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const toggleMenu = () => {
   setIsMenuOpen(!isMenuOpen);
 };

 const closeMenu = () => {
   setIsMenuOpen(false);
 };

 // Cerrar menú al hacer clic fuera
 useEffect(() => {
   const handleClickOutside = (e: MouseEvent) => {
     const target = e.target as Element;
     if (!target.closest('.menu-container') && !target.closest('.hamburger-btn')) {
       setIsMenuOpen(false);
     }
   };
   document.addEventListener("mousedown", handleClickOutside);
   return () => document.removeEventListener("mousedown", handleClickOutside);
 }, []);

  return (
    <>
    <header>
    <div className="contenedorMenu">
      <div className="logo">MiLogo</div>
      
      {/* Menú de escritorio */}
      <nav className="desktop-nav">
        <a href="#">Sobre mi</a>
        <a href="#">Tegnologías</a>
        <a href="#">Experiencia</a>
        <a href="#">Proyectos</a>
      </nav>
      <div className="acciones desktop-actions">
        {children}
      </div>
    </div>
  </header>

  {/* Botón hamburguesa para móvil - fuera del header */}
  <button className="hamburger-btn" onClick={toggleMenu}>
    <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
    <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
    <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
  </button>

  {/* Menú lateral móvil */}
  <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
    <div className="menu-overlay" onClick={closeMenu}></div>
    <div className="menu-sidebar">
      <div className="menu-header">
        <h3>Menú</h3>
      </div>
      <nav className="mobile-nav">
        <a href="#" onClick={closeMenu}><i className="fa-solid fa-user"></i>Sobre mi</a>
        <a href="#" onClick={closeMenu}><i className="fa-solid fa-code"></i>Tegnologías</a>
        <a href="#" onClick={closeMenu}><i className="fa-solid fa-briefcase"></i>Experiencia</a>
        <a href="#" onClick={closeMenu}><i className="fa-solid fa-folder-open"></i>Proyectos</a>
      </nav>
      <div className="mobile-actions">
        {children}
      </div>
    </div>
  </div>
  </>
  )
}


    
const ALL_LANGUAGES = ["Español", "Inglés", "Alemán"];

export const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Español");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  // Cierre automático al hacer clic fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = ALL_LANGUAGES.filter(lang => lang !== selected);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {selected}
        <span className={`triangle ${isOpen ? "rotate" : ""}`}>▾</span>
      </button>
      <ul className={`dropdown-menu ${isOpen ? "open" : ""}`}>
        {options.map(lang => (
          <li key={lang} onClick={() => handleSelect(lang)}>
            {lang}
          </li>
        ))}
      </ul>
    </div>
  );
};
    
    

export default Navegador