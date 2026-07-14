import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiAward, FiExternalLink, FiCalendar, FiChevronRight } from 'react-icons/fi';
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
  
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // States for 3D card tilt
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glareX, setGlareX] = useState<number>(50);
  const [glareY, setGlareY] = useState<number>(50);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convert to percentage (-0.5 to 0.5)
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    // Rotate amount
    const maxRotation = 15; // Max 15 degrees tilt
    const rX = -yPct * maxRotation;
    const rY = xPct * maxRotation;
    
    setRotateX(rX);
    setRotateY(rY);
    
    // Glare position
    setGlareX((mouseX / width) * 100);
    setGlareY((mouseY / height) * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const currentCert = certificates[selectedIndex];

  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <section className="certificados-section">
      <p className="parra text-center">{t('certificados.parrafo')}</p>
      
      <div className="certificados-container">
        {/* Left Side: Navigation List */}
        <div className="cert-list">
          {certificates.map((cert, index) => (
            <button
              key={index}
              className={`cert-list-item ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Ver certificado ${cert.title}`}
            >
              <div className="cert-item-icon">
                <FiAward className="award-icon" />
              </div>
              <div className="cert-item-info">
                <h4>{cert.title}</h4>
                <p>{cert.issuer} • {cert.date}</p>
              </div>
              <FiChevronRight className="arrow-indicator" />
              {index === selectedIndex && (
                <motion.div
                  className="active-indicator"
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Side: Showcase with 3D Tilt Card */}
        <div className="cert-showcase">
          <div className="cert-card-wrapper">
            <motion.div
              ref={cardRef}
              className="cert-3d-card"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              animate={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000
              }}
              transition={{
                type: 'spring',
                stiffness: isHovered ? 400 : 150,
                damping: isHovered ? 30 : 20
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  className="cert-card-inner"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Certificate Image Frame */}
                  <div className="cert-image-frame">
                    <img src={currentCert.image} alt={currentCert.title} />
                    <div className="cert-image-overlay" />
                    {isHovered && (
                      <div
                        className="cert-card-glare"
                        style={{
                          background: `radial-gradient(circle 120px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.15), transparent)`
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Certificate Details */}
                  <div className="cert-details">
                    <div className="cert-meta">
                      <span className="cert-issuer">
                        <FiAward /> {currentCert.issuer}
                      </span>
                      <span className="cert-date">
                        <FiCalendar /> {currentCert.date}
                      </span>
                    </div>
                    
                    <h3 className="cert-title-display">{currentCert.title}</h3>
                    <p className="cert-description-display">{currentCert.description}</p>
                    
                    <a
                      href={currentCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-verify-btn"
                    >
                      <span>Verificar Credencial</span>
                      <FiExternalLink />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificados;
