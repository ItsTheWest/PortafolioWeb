import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
  const [direction, setDirection] = useState<number>(0);

  if (!certificates || certificates.length === 0) return null;

  const total = certificates.length;

  const getAdjacentIndex = (offset: number) =>
    (currentIndex + offset + total) % total;

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(getAdjacentIndex(-1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(getAdjacentIndex(1));
  };

  const prevIdx = getAdjacentIndex(-1);
  const nextIdx = getAdjacentIndex(1);

  return (
    <section className="certificados-section">
      <div className="cert-strip">
        {/* Left Arrow */}
        <button className="strip-arrow strip-arrow--left" onClick={handlePrev} aria-label="Anterior">
          <FiChevronLeft />
        </button>

        {/* Strip */}
        <div className="strip-viewport">
          <div className="strip-track">
            {/* Prev image — partially visible */}
            <div
              className="strip-img-wrapper strip-img--side strip-img--prev"
              onClick={handlePrev}
            >
              <img src={certificates[prevIdx].image} alt={certificates[prevIdx].title} />
            </div>

            {/* Center image — main focus */}
            <div className="strip-img-wrapper strip-img--center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={currentIndex}
                  src={certificates[currentIndex].image}
                  alt={certificates[currentIndex].title}
                  custom={direction}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </AnimatePresence>
            </div>

            {/* Next image — partially visible */}
            <div
              className="strip-img-wrapper strip-img--side strip-img--next"
              onClick={handleNext}
            >
              <img src={certificates[nextIdx].image} alt={certificates[nextIdx].title} />
            </div>
          </div>

        </div>

        {/* Right Arrow */}
        <button className="strip-arrow strip-arrow--right" onClick={handleNext} aria-label="Siguiente">
          <FiChevronRight />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="strip-dots">
        {certificates.map((_, index) => (
          <button
            key={index}
            className={`strip-dot${index === currentIndex ? ' active' : ''}`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            aria-label={`Certificado ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Certificados;
