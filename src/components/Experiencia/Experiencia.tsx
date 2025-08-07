import React from 'react';
import './experiencia.css'


type ExperienceItem = {
  title: string;
  company: string;
  date: string;
  description: string;
};

const experiences: ExperienceItem[] = [
  {
    title: 'Analista en documentación',
    company: 'Clover International, C.A',
    date: 'Mayo 2025 - Julio 2025',
    description:
      "Encargado en el desarrollo de aplicación para la gestión de los procesos relacionados a una licitación, mediante las herramientas tecnológicas de Microsoft 365. Además de colaborar en el desarrollo de un sistema web de cotización empresarial, implementado con Angular CLI, MySQL y JavaScript."
  },
];

const Experiencia: React.FC = () => {
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
