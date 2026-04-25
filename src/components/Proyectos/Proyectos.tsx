import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './proyectos.css';
import './ProyectoModal.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Tech = {
  name: string;
  icon: React.ReactNode;
};

export type Proyecto = {
  title: string;
  subtitle: string;
  description: string;
  tech: Tech[];
  image: string;
  /** Optional array of images for the carousel. Falls back to [image] if not set. */
  images?: string[];
  /** Optional video URL (mp4, webm, etc.) shown as an extra slide in the carousel */
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  /** Optional longer body shown only inside the modal */
  longDescription?: string;
  /** Badge / status label, e.g. "En Desarrollo" */
  status?: string;
};

// ─── Carousel arrows & dots ───────────────────────────────────────────────────

const ChevronLeft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps {
  proyecto: Proyecto;
  onClose: () => void;
}

const ProyectoModal: React.FC<ModalProps> = ({ proyecto, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Build slide list: images + optional video
  const imageSlides: string[] = proyecto.images && proyecto.images.length > 0
    ? proyecto.images
    : [proyecto.image];
  const hasVideo = !!proyecto.videoUrl;
  const totalSlides = imageSlides.length + (hasVideo ? 1 : 0);
  const showCarousel = totalSlides > 1;

  const goToSlide = (index: number) => {
    if (index < 0) setCurrentSlide(totalSlides - 1);
    else if (index >= totalSlides) setCurrentSlide(0);
    else setCurrentSlide(index);
  };

  // Trigger enter animation after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  });

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 320);
  }, [onClose]);

  const copyLink = () => {
    if (proyecto.liveUrl) {
      navigator.clipboard.writeText(proyecto.liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const isVideoSlide = hasVideo && currentSlide === totalSlides - 1;

  const modalContent = (
    <div
      className={`pm-overlay${visible ? ' pm-overlay--visible' : ''}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalles del proyecto: ${proyecto.title}`}
    >
      <div className={`pm-panel${visible ? ' pm-panel--visible' : ''}`}>

        {/* ── Close button ── */}
        <button className="pm-close" onClick={handleClose} aria-label="Cerrar modal">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" />
          </svg>
        </button>

        {/* ── Hero / Carousel ── */}
        <div className="pm-hero-wrapper">
          <div className="pm-hero">
            {isVideoSlide ? (
              <video
                src={proyecto.videoUrl}
                className="pm-hero-video"
                controls
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                src={imageSlides[currentSlide]}
                alt={`${proyecto.title} - ${currentSlide + 1}`}
                className="pm-hero-img"
                loading="lazy"
              />
            )}
            <div className="pm-hero-gradient" />

            {proyecto.status && (
              <span className="pm-status-badge">{proyecto.status}</span>
            )}

            {/* Carousel controls */}
            {showCarousel && (
              <>
                <button
                  className="pm-carousel-btn pm-carousel-btn--prev"
                  onClick={(e) => { e.stopPropagation(); goToSlide(currentSlide - 1); }}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft />
                </button>
                <button
                  className="pm-carousel-btn pm-carousel-btn--next"
                  onClick={(e) => { e.stopPropagation(); goToSlide(currentSlide + 1); }}
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight />
                </button>

                {/* Dot indicators */}
                <div className="pm-carousel-dots">
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                      key={i}
                      className={`pm-carousel-dot${i === currentSlide ? ' pm-carousel-dot--active' : ''}${hasVideo && i === totalSlides - 1 ? ' pm-carousel-dot--video' : ''}`}
                      onClick={(e) => { e.stopPropagation(); goToSlide(i); }}
                      aria-label={
                        hasVideo && i === totalSlides - 1
                          ? 'Ver video'
                          : `Imagen ${i + 1}`
                      }
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="pm-body">
          <div className="pm-header">
            <div>
              <h2 className="pm-title">{proyecto.title}</h2>
              <p className="pm-subtitle">{proyecto.subtitle}</p>
            </div>
          </div>

          <p className="pm-description">
            {proyecto.longDescription || proyecto.description}
          </p>

          {/* Tech stack */}
          <div className="pm-section">
            <h3 className="pm-section-label">Stack Tecnológico</h3>
            <div className="pm-tech-list">
              {proyecto.tech.map((t, i) => (
                <span key={i} className="pm-tech-chip">
                  <span className="pm-tech-icon">{t.icon}</span>
                  {t.name}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pm-actions">
            {proyecto.githubUrl && (
              <a
                href={proyecto.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pm-btn pm-btn--github"
                aria-label="Ver código en GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Ver en GitHub
              </a>
            )}
            {proyecto.liveUrl && (
              <button
                onClick={copyLink}
                className={`pm-btn pm-btn--copy${copied ? ' pm-btn--copied' : ''}`}
                aria-label={copied ? 'Link copiado' : 'Copiar link del proyecto'}
              >
                {copied ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Copiar Link
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// ─── Single Project Card ──────────────────────────────────────────────────────

interface CardProps {
  proyecto: Proyecto;
  index: number;
  onClick: () => void;
}

const ProyectoCard: React.FC<CardProps> = ({ proyecto, index, onClick }) => {
  // Use first image from images array, fall back to single image
  const coverImage = proyecto.images && proyecto.images.length > 0
    ? proyecto.images[0]
    : proyecto.image;

  return (
    <article
      className="pc-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${proyecto.title}`}
      style={{ animationDelay: `${index * 80}ms` }}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      {/* Image */}
      <div className="pc-img-wrap">
        <img src={coverImage} alt={proyecto.title} className="pc-img" loading="lazy" />
        <div className="pc-img-overlay" />
        {proyecto.status && <span className="pc-status">{proyecto.status}</span>}
        {/* Hover CTA */}
        <div className="pc-hover-cta" aria-hidden="true">
          <span className="pc-cta-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" />
            </svg>
          </span>
          <span>Ver detalles</span>
        </div>
      </div>

      {/* Info */}
      <div className="pc-info">
        <div className="pc-info-top">
          <h3 className="pc-title">{proyecto.title}</h3>
          <p className="pc-subtitle">{proyecto.subtitle}</p>
        </div>
        <p className="pc-desc">{proyecto.description}</p>

        {/* Tech pills (truncated to first 4) */}
        <div className="pc-tech-row">
          {proyecto.tech.slice(0, 5).map((t, i) => (
            <span key={i} className="pc-tech-pill">
              <span className="pc-pill-icon">{t.icon}</span>
              {t.name}
            </span>
          ))}
          {proyecto.tech.length > 5 && (
            <span className="pc-tech-pill pc-tech-pill--more">
              +{proyecto.tech.length - 5}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

// ─── Grid Container ───────────────────────────────────────────────────────────

interface ProyectosGridProps {
  proyectos: Proyecto[];
}

export const ProyectosGrid: React.FC<ProyectosGridProps> = ({ proyectos }) => {
  const [selected, setSelected] = useState<Proyecto | null>(null);

  return (
    <>
      <div className="pc-grid">
        {proyectos.map((p, i) => (
          <ProyectoCard
            key={i}
            proyecto={p}
            index={i}
            onClick={() => setSelected(p)}
          />
        ))}
      </div>

      {selected && (
        <ProyectoModal proyecto={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};

// ─── Keep backwards-compat named export ──────────────────────────────────────
export const Proyectos = ProyectosGrid;