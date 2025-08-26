import './sobremi.css';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function Sobremi() {
    const { t } = useTranslation();
   return (
    <section className="contenedor-sobremi">
      {/* Texto */}
      <div className="sobremi-texto">
        <p>
          {t("sobremi.Parrafo1")}
        </p>
        <p style={{ marginTop: "1.2rem" }}>
          {t("sobremi.Parrafo2")}
        </p>
      </div>

      {/* Imagen animada */}
      <div className="sobremi-imagen">
        <motion.img
          src="/img/imgyo.png"
          alt="imgen animada"
          className="sobremi-imagen-img"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.6 }}
        />
      </div>
    </section>
  );
}

export default Sobremi;