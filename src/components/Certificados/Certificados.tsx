import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiChevronLeft, FiChevronRight, FiCalendar, FiAward } from 'react-icons/fi';
import './certificados.css';

interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  link: string;
}

const Certificados: React.FC = () => {
  const { t } = useTranslation();
  const certificates = t('certificados.items', { returnObjects: true }) as CertificateItem[];
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  if (!certificates || certificates.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + certificates.length) % certificates.length);
  };

  const getCardIndex = (offset: number) => {
    return (currentIndex + offset + certificates.length) % certificates.length;
  };

  const positions = [-1, 0, 1]; // Prev, Active, Next

  return (
    <section className="certificados-section">
      <p className="parra text-center">{t('certificados.parrafo')}</p>
      
      <div className="cert-carousel-container">
        {/* Left Arrow */}
        <button className="carousel-arrow left" onClick={handlePrev} aria-label="Anterior">
          <FiChevronLeft />
        </button>

        {/* Carousel Slide Area (Track) */}
        <div className="carousel-track-container">
          <div className="carousel-track">
            {positions.map((offset) => {
              const index = getCardIndex(offset);
              const cert = certificates[index];
              const isActive = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              
              let cardClass = 'carousel-card';
              if (isActive) cardClass += ' active';
              if (isPrev) cardClass += ' prev';
              if (isNext) cardClass += ' next';

              return (
                <motion.div
                  key={index}
                  className={cardClass}
                  onClick={isPrev ? handlePrev : isNext ? handleNext : undefined}
                  initial={{ scale: isActive ? 1 : 0.85, opacity: isActive ? 1 : 0.4 }}
                  animate={{ 
                    scale: isActive ? 1 : 0.85, 
                    opacity: isActive ? 1 : 0.35,
                    x: offset * 30 // Subtle gap spacing adjustment
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                >
                  <div className="carousel-image-frame">
                    <img src={cert.image} alt={cert.title} />
                    <div className="carousel-image-overlay" />
                  </div>
                  
                  {isActive && (
                    <motion.div 
                      className="carousel-details"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    >
                      <div className="carousel-meta">
                        <span className="carousel-issuer">
                          <FiAward /> {cert.issuer}
                        </span>
                        <span className="carousel-date">
                          <FiCalendar /> {cert.date}
                        </span>
                      </div>
                      <h3 className="carousel-title-display">{cert.title}</h3>
                      <p className="carousel-description-display">{cert.description}</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
          
          {/* Side gradient overlays to fade out the prev/next cards on the edges */}
          <div className="carousel-fade-overlay left-fade" />
          <div className="carousel-fade-overlay right-fade" />
        </div>

        {/* Right Arrow */}
        <button className="carousel-arrow right" onClick={handleNext} aria-label="Siguiente">
          <FiChevronRight />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="carousel-dots">
        {certificates.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir al certificado ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Certificados;
