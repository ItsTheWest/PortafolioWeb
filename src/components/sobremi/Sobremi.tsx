import './sobremi.css';
import { useTranslation } from 'react-i18next';
import CardSwap from './CardSwap';

function Sobremi() {
  const { t } = useTranslation();

  return (
    <section className="sobremi-section">
      <div className="sobremi-content">
        <div className="sobremi-text">
          <p>{t('sobremi.Parrafo1')}</p>
          <p className="sobremi-p2">{t('sobremi.Parrafo2')}</p>
        </div>
        <div className="sobremi-visual">
          <CardSwap />
        </div>
      </div>
    </section>
  );
}

export default Sobremi;