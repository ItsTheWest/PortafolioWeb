import React from 'react';
import './proyectos.css';

type Tech = {
  name: string;
  icon: React.ReactNode;
};

type ProyectosProps = {
  title: string;
  subtitle: string;
  description: string;
  tech: Tech[];
  image: string;
  githubUrl: string;
  liveUrl: string;
};

export const Proyectos: React.FC<ProyectosProps> = ({
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
  };

  return (
    <div className="project-card">
      <div className="project-info">
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
        <p>{description}</p>
        <div className="tech-list">
          {tech.map((t, i) => (
            <span key={i} className="tech-item">
              <span style={{ marginRight: '0.5em', display: 'inline-flex', verticalAlign: 'middle' }}>
                {t.icon}
              </span>
              {t.name}
            </span>
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