import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 40;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 600
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
};

const Certificados: React.FC = () => {
  const { t } = useTranslation();
  const certificates = t('certificados.items', { returnObjects: true }) as CertificateItem[];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const isMobile = useIsMobile();

  // Touch / drag state
  const touchStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  if (!certificates || certificates.length === 0) return null;

  const total = certificates.length;

  const getAdjacentIndex = (offset: number) =>
    (currentIndex + offset + total) % total;

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Auto-play on all screen sizes
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      if (!isDragging.current) handleNext();
    }, AUTOPLAY_MS);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [handleNext]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      if (delta > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
    isDragging.current = false;
  };

  const prevIdx = getAdjacentIndex(-1);
  const nextIdx = getAdjacentIndex(1);

  return (
    <section className="certificados-section">
      <div className="cert-strip">
        {/* Left Arrow — hidden on mobile */}
        <button
          className="strip-arrow strip-arrow--left strip-arrow--hide-mobile"
          onClick={handlePrev}
          aria-label="Anterior"
        >
          <FiChevronLeft />
        </button>

        {/* Strip */}
        <div
          className="strip-viewport"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
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

        {/* Right Arrow — hidden on mobile */}
        <button
          className="strip-arrow strip-arrow--right strip-arrow--hide-mobile"
          onClick={handleNext}
          aria-label="Siguiente"
        >
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
