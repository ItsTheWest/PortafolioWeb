import React from 'react';
import './proyectos.css'

type Proyectos = {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
};

export const Proyectos: React.FC<Proyectos> = ({
  title,
  subtitle,
  description,
  tech,
  image,
  githubUrl,
  liveUrl,
}) => {
  const copyLink = () => {
    navigator.clipboard.writeText(liveUrl);
    alert('¡Link copiado al portapapeles!');
  };

  return (
    <div className="project-card">
      <div className="project-info">
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
        <p>{description}</p>
        <div className="tech-list">
          {tech.map((t, i) => (
            <span key={i} className="tech-item">{t}</span>
          ))}
        </div>
        <div className="project-actions">
          <button onClick={copyLink} title="Copiar link">
            🔗
          </button>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" title="Ver en GitHub">
            🐙
          </a>
        </div>
      </div>
      <div className="project-image">
        <img src={image} alt={`Imagen de ${title}`} />
      </div>
    </div>
  );
};