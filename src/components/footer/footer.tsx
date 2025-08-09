import React from 'react';
import './footerstyle.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Desarrollado por Nelson &copy; {new Date().getFullYear()}  Transformando ideas en código.
        </p>
      </div>
    </footer>
  );
};

export default Footer;