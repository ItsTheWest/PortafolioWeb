import React, { useState } from 'react';
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
  githubUrl?: string;
  liveUrl?: string;
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
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    if (liveUrl) {
      navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
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
          {liveUrl && (
            <button
              onClick={copyLink}
              title="Copiar link"
              className="action-btn copy-btn"
              aria-label="Copiar link"
              type="button"
            >
              <span className={`icon-wrapper${copied ? ' copied' : ''}`}>
                <i className="fa-solid fa-link icon icon-copy"></i>
                <i className="fa-solid fa-check icon icon-check"></i>
              </span>
            </button>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Ver en GitHub"
              className="action-btn"
              aria-label="Ver en GitHub"
              tabIndex={0}
            >
              <span className="icon-wrapper">
                <i className="fa-brands fa-github icon"></i>
              </span>
            </a>
          )}
        </div>
      </div>
      <div className="project-image">
        <img src={image} alt={`Imagen de ${title}`} />
      </div>
    </div>
  );
};