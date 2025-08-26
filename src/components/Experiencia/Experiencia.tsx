import React from 'react';
import './experiencia.css'
import { useTranslation } from "react-i18next";

type ExperienceItem = {
  title: string;
  company: string;
  date: string;
  description: string;
};

const Experiencia: React.FC = () => {
  const { t } = useTranslation();
  // Type assertion para evitar error de tipos
  const experiences = t('experiencia', { returnObjects: true }) as ExperienceItem[];

  return (
    <section className="timeline-section">
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-icon">
              <i className="fa-solid fa-brain"></i>
            </div>
            <div className="timeline-content">
              <h3>{exp.title} - <span>{exp.company}</span></h3>
              <p><strong>{exp.date}</strong></p>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiencia;

