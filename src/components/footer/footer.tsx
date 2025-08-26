import React from 'react';
import './footerstyle.css';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          {t('footer.texto', { name: 'Nelson', year })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;