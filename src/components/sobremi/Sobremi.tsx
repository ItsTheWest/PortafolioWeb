import './sobremi.css';
import { motion } from "framer-motion";

function Sobremi() {
   return (
    <section className="contenedor-sobremi">
      {/* Texto */}
      <div className="sobremi-texto">
        <p>
          Soy un apasionado del desarrollo web y la programación. Me encanta
          crear aplicaciones que mejoren la vida de las personas y resuelvan
          problemas reales. Siempre estoy aprendiendo nuevas tecnologías y
          buscando formas de mejorar mis habilidades.
        </p>
        <p style={{ marginTop: "1.2rem" }}>
          En mi tiempo libre, disfruto explorando nuevas herramientas,
          contribuyendo a proyectos de código abierto y compartiendo mis
          conocimientos con la comunidad.
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