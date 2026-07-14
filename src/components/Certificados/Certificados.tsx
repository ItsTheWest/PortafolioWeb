import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [direction, setDirection] = useState<number>(0); // -1 for left, 1 for right

  if (!certificates || certificates.length === 0) return null;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 150 : -150,
      opacity: 0
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + certificates.length) % certificates.length);
  };

  const currentCert = certificates[currentIndex];

  return (
    <section className="certificados-section">
      <p className="parra text-center">{t('certificados.parrafo')}</p>
      
      <div className="cert-carousel-container">
        {/* Left Arrow */}
        <button className="carousel-arrow left" onClick={handlePrev} aria-label="Anterior">
          <FiChevronLeft />
        </button>

        {/* Carousel Slide Area */}
        <div className="carousel-viewport">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="carousel-slide-card"
            >
              <div className="carousel-image-frame">
                <img src={currentCert.image} alt={currentCert.title} />
                <div className="carousel-image-overlay" />
              </div>
              <div className="carousel-details">
                <div className="carousel-meta">
                  <span className="carousel-issuer">
                    <FiAward /> {currentCert.issuer}
                  </span>
                  <span className="carousel-date">
                    <FiCalendar /> {currentCert.date}
                  </span>
                </div>
                <h3 className="carousel-title-display">{currentCert.title}</h3>
                <p className="carousel-description-display">{currentCert.description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
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
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setSelectedIndex(index);
            }}
            aria-label={`Ir al certificado ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );

  function setSelectedIndex(index: number) {
    setCurrentIndex(index);
  }
};

export default Certificados;
