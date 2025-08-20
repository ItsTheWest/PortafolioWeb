import './menustyle.css';
import React, { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react"; 

interface NavegadorProps{
  children?:ReactNode;
}

function Navegador(props:NavegadorProps) {
 const{children} = props;
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [selectedMenu, setSelectedMenu] = useState<string>("#");
 const [showLangSubmenu, setShowLangSubmenu] = useState(false); // Nuevo estado para submenú idiomas

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

  // Opciones del menú lateral
  const menuOptions = [
    { href: "#Yo", icon: "fa-solid fa-user", label: "Sobre mi" },
    { href: "#Tec", icon: "fa-solid fa-code", label: "Tecnologías" },
    { href: "#Ex", icon: "fa-solid fa-briefcase", label: "Experiencia" },
    { href: "#Pro", icon: "fa-solid fa-folder-open", label: "Proyectos" },
    { href: "#Lang", icon: "fa-solid fa-globe", label: "Idiomas", isLang: true }
  ];

  // Opciones de idioma
  const LANGUAGES = [
    { code: "es", label: "Español", icon: "/img/banderas/spain.svg" },
    { code: "en", label: "Inglés", icon: "/img/banderas/eeuu.svg" },
    { code: "de", label: "Portugues", icon: "/img/banderas/portugal.svg" }
  ];
  const [selectedLang, setSelectedLang] = useState("es");

  return (
    <>
    <header>
    <div className="contenedorMenu">
      <div className="logo">
          <a href="#">
        <img src="/img/logo-nfdev.png"></img>
         </a>
        </div>
      
      {/* Menú de escritorio */}
      <nav className="desktop-nav">
        <a href="#Yo">Sobre mi</a>
        <a href="#Tec">Tecnologías</a>
        <a href="#Ex">Experiencia</a>
        <a href="#Pro">Proyectos</a>
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
        {menuOptions.map(opt => (
          !opt.isLang ? (
            <a
              key={opt.href}
              href={opt.href}
              onClick={() => { 
                setSelectedMenu(opt.href); 
                setShowLangSubmenu(false); // <-- Cierra el submenú de idiomas si estaba abierto
                closeMenu(); 
              }}
              className={selectedMenu === opt.href ? "selected" : ""}
            >
              <i className={opt.icon}></i>{opt.label}
            </a>
          ) : (
            <div key={opt.href} style={{position: "relative"}}>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setSelectedMenu(""); // Limpiar selección al abrir idiomas
                  setShowLangSubmenu(v => !v);
                }}
                className={showLangSubmenu ? "selected" : ""}
                style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}
              >
                <span>
                  <i className={opt.icon}></i>{opt.label}
                </span>
                <i className={`fa-solid fa-chevron-${showLangSubmenu ? "up" : "down"}`} style={{marginLeft: 8}}></i>
              </a>
              {showLangSubmenu && (
                <div
                  className={`lang-submenu${showLangSubmenu ? " open" : ""}`}
                  aria-expanded={showLangSubmenu}
                >
                  {LANGUAGES.map(lang => (
                    <a
                      key={lang.code}
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        setSelectedLang(lang.code);
                        // Espera un frame para actualizar el estado visual antes de cerrar el menú
                        setTimeout(() => {
                          setShowLangSubmenu(false);
                          closeMenu();
                        }, 0);
                      }}
                      className={`lang-option${selectedLang === lang.code ? " selected" : ""}`}
                    >
                      <img src={lang.icon} alt={lang.label} className="lang-flag-svg" />
                      {lang.label}
                      {selectedLang === lang.code && (
                        <i className="fa-solid fa-check lang-check"></i>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        ))}
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
    
    

export default Navegador;