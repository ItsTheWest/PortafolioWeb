import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiCode, FiPenTool, FiSettings } from 'react-icons/fi';
import './sobremi.css';

const CARDS_DATA = [
  { id: 1, img: '/img/imgcard3.png', bg: '#0a0a0a', title: 'sobremi.card1Title', icon: <FiCode /> },
  { id: 2, img: '/img/imgcard2.png', bg: '#0a0a0a', title: 'sobremi.card2Title', icon: <FiPenTool /> },
  { id: 3, img: '/img/imgcard1.jpg', bg: '#0a0a0a', title: 'sobremi.card3Title', icon: <FiSettings /> },
];

export default function CardSwap() {
  const { t } = useTranslation();
  const [cards, setCards] = useState(CARDS_DATA);

  const handleSwap = () => {
    setCards((prev) => {
      const newCards = [...prev];
      const topCard = newCards.shift();
      if (topCard) newCards.push(topCard);
      return newCards;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleSwap();
    }, 3500); // Auto swap every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-swap-container">
      {cards.map((card, index) => {
        const isTop = index === 0;
        return (
          <motion.div
            key={card.id}
            className="card-swap-item"
            initial={{ scale: 0.8, opacity: 0, y: 50, x: 0 }}
            animate={{
              scale: 1 - index * 0.05,
              x: index * 25, /* Shift right */
              y: index * -25, /* Shift up */
              zIndex: cards.length - index,
              opacity: 1 - index * 0.15,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              backgroundColor: card.bg,
              transformOrigin: "top right" /* Makes the scaling pull towards the top right */
            }}
            onClick={isTop ? handleSwap : undefined}
            whileHover={isTop ? { scale: 1.02, y: -5, x: -5 } : {}}
          >
            <div className="card-top-bar">
              <span className="card-icon">{card.icon}</span>
              <span className="card-title">{t(card.title)}</span>
            </div>
            <div className="card-img-wrapper">
              <img src={card.img} alt={t(card.title)} className="card-img" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
