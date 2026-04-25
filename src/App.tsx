import './App.css'
import Navegador, { Dropdown } from './components/menu/Navegador';
import Perfil, { Typewriter } from './components/Perfil/Perfil';
import Experiencia from './components/Experiencia/Experiencia';
import { ProyectosGrid } from './components/Proyectos/Proyectos';
import type { Proyecto } from './components/Proyectos/Proyectos';
import { Footer } from './components/footer/footer';
import Sobremi from './components/sobremi/Sobremi';
import Contacto from './components/Contacto/Contacto';
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import Squares from './componenty/Squares';
import LogoLoop from './componenty/LogoLoop';
import { ScrollReveal } from './components/ScrollReveal/ScrollReveal';
import { SiReact, SiTypescript, SiTailwindcss, SiAngular, SiLaravel, SiJavascript, SiSupabase, SiGithub, SiGit, SiMysql, SiDotnet } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiAngular />, title: "Angular", href: "https://angular.io" },
  { node: <SiLaravel />, title: "Laravel", href: "https://laravel.com" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
  { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com" },
  { node: <SiDotnet />, title: ".NET", href: "https://dotnet.microsoft.com/" },
];

// ─── Inline SVG helpers (kept here to avoid a separate file) ──────────────────
const htmlIcon = <svg height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" aria-label="HTML5" role="img" viewBox="0 0 512 512"><path fill="#e34f26" d="M71 460L30 0h451l-41 460-185 52" /><path fill="#ef652a" d="M256 472l149-41 35-394H256" /><path fill="#ebebeb" d="M256 208h-75l-5-58h80V94H114l15 171h127zm-1 147l-63-17-4-45h-56l7 89 116 32z" /><path fill="#ffffff" d="M255 208v57h70l-7 73-63 17v59l116-32 16-174zm0-114v56h137l5-56z" /></svg>;
const cssIcon = <svg height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" aria-label="CSS3" role="img" viewBox="0 0 512 512"><path fill="#264de4" d="M72 460L30 0h451l-41 460-184 52" /><path fill="#2965f1" d="M256 37V472l149-41 35-394" /><path fill="#ebebeb" d="m114 94h142v56H119m5 58h132v57H129m3 28h56l4 45 64 17v59L139 382" /><path fill="#ffffff" d="m256 208v57h69l-7 73-62 17v59l115-32 26-288H256v56h80l-5.5 58Z" /></svg>;
const jsIcon = <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 256"><path fill="#f7df1e" d="M0 0h256v256H0z" /><path d="m67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371c7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259c-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607c9.969 0 16.325-4.984 16.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044 13.747-31.792 35.228-31.792c15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046 0-11.514 4.468-11.514 10.31c0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804c0 21.654-17.012 33.51-39.867 33.51c-22.339 0-36.774-10.654-43.819-24.574" /></svg>;
const laravelIcon = <SiLaravel color="#ff2d20" />;
const mysqlIcon = <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 252"><path fill="#00546b" d="M235.648 194.212c-13.918-.347-24.705 1.045-33.752 4.872c-2.61 1.043-6.786 1.044-7.134 4.35c1.392 1.392 1.566 3.654 2.784 5.567c2.09 3.479 5.741 8.177 9.047 10.614c3.653 2.783 7.308 5.566 11.134 8.002c6.786 4.176 14.442 6.611 21.053 10.787c3.829 2.434 7.654 5.568 11.482 8.177c1.914 1.39 3.131 3.654 5.568 4.523v-.521c-1.219-1.567-1.567-3.828-2.784-5.568c-1.738-1.74-3.48-3.306-5.22-5.046c-5.045-6.784-11.308-12.7-18.093-17.571c-5.567-3.828-17.747-9.047-20.008-15.485c0 0-.175-.173-.348-.347c3.827-.348 8.35-1.74 12.005-2.784c5.915-1.567 11.308-1.218 17.398-2.784c2.783-.696 5.567-1.566 8.35-2.436v-1.565c-3.13-3.132-5.392-7.307-8.698-10.265c-8.873-7.657-18.617-15.137-28.707-21.4c-5.394-3.48-12.354-5.742-18.095-8.699c-2.086-1.045-5.567-1.566-6.784-3.306c-3.133-3.827-4.873-8.872-7.134-13.396c-5.044-9.57-9.917-20.182-14.267-30.272c-3.13-6.786-5.044-13.572-8.872-19.834c-17.92-29.577-37.406-47.497-67.33-65.07c-6.438-3.653-14.093-5.219-22.27-7.132c-4.348-.175-8.699-.522-13.048-.697c-2.784-1.218-5.568-4.523-8.004-6.089C34.006 4.573 8.429-8.996 1.122 8.924c-4.698 11.308 6.96 22.442 10.96 28.185c2.96 4.001 6.786 8.524 8.874 13.048c1.218 2.956 1.565 6.09 2.783 9.221c2.785 7.653 5.393 16.18 9.048 23.314c1.914 3.653 4.001 7.48 6.437 10.786c1.392 1.913 3.827 2.784 4.35 5.915c-2.435 3.48-2.61 8.7-4.003 13.049c-6.263 19.66-3.826 44.017 5.046 58.457c2.783 4.348 9.395 13.92 18.268 10.265c7.83-3.131 6.09-13.048 8.35-21.747c.524-2.09.176-3.48 1.219-4.872v.349c2.436 4.87 4.871 9.569 7.133 14.44c5.394 8.524 14.788 17.398 22.617 23.314c4.177 3.13 7.482 8.524 12.702 10.438v-.523h-.349c-1.044-1.566-2.61-2.261-4.001-3.48c-3.131-3.13-6.612-6.958-9.047-10.438c-7.306-9.744-13.745-20.53-19.486-31.665c-2.783-5.392-5.22-11.308-7.481-16.701c-1.045-2.09-1.045-5.22-2.784-6.263c-2.61 3.827-6.437 7.133-8.351 11.83c-3.304 7.481-3.653 16.702-4.871 26.27c-.696.176-.349 0-.697.35c-5.566-1.394-7.48-7.134-9.569-12.006c-5.22-12.352-6.09-32.186-1.565-46.452c1.218-3.654 6.438-15.136 4.35-18.616c-1.044-3.306-4.525-5.22-6.438-7.829c-2.261-3.306-4.698-7.48-6.263-11.135c-4.176-9.743-6.264-20.53-10.787-30.273c-2.088-4.524-5.74-9.22-8.699-13.396c-3.305-4.697-6.959-8.004-9.569-13.571c-.869-1.913-2.088-5.045-.696-7.133c.348-1.392 1.043-1.913 2.436-2.261c2.262-1.915 8.7.521 10.96 1.565c6.438 2.608 11.831 5.046 17.225 8.699c2.435 1.74 5.045 5.046 8.176 5.916h3.654c5.568 1.217 11.83.348 17.05 1.913c9.222 2.957 17.572 7.307 25.054 12.005c22.792 14.44 41.58 34.97 54.282 59.501c2.088 4 2.957 7.656 4.871 11.83c3.655 8.526 8.178 17.225 11.83 25.576c3.654 8.176 7.133 16.528 12.353 23.314c2.61 3.652 13.048 5.567 17.746 7.481c3.48 1.565 8.874 2.958 12.005 4.871c5.915 3.652 11.83 7.83 17.398 11.83c2.784 2.088 11.482 6.438 12.005 9.917" /></svg>;
const tailwindIcon = <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 154"><defs><linearGradient id="twGrad" x1="-2.778%" x2="100%" y1="32%" y2="67.556%"><stop offset="0%" stopColor="#2298bd" /><stop offset="100%" stopColor="#0ed7b5" /></linearGradient></defs><path fill="url(#twGrad)" d="M128 0Q76.8 0 64 51.2Q83.2 25.6 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8q51.2 0 64-51.2q-19.2 25.6-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0M64 76.8q-51.2 0-64 51.2q19.2-25.6 44.8-19.2c9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6q51.2 0 64-51.2q-19.2 25.6-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8" /></svg>;
const djangoIcon = <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 256"><rect width={256} height={256} fill="#092e20" rx={28} /><path fill="#fffffd" d="M186.377 94.198v66.226c0 22.82-1.67 33.764-6.678 43.225c-4.639 9.092-10.761 14.842-23.375 21.15l-26.53-12.615c12.616-5.936 18.738-11.13 22.633-19.11c4.082-8.161 5.382-17.623 5.382-42.481V94.198zm-45.449-44.12v132.239c-14.655 2.782-25.415 3.895-37.102 3.895c-34.877 0-53.057-15.767-53.057-46.007c0-29.126 19.294-48.047 49.16-48.047c4.638 0 8.163.37 12.43 1.483V50.08zm-38.215 65.082c-14.47 0-22.819 8.905-22.819 24.487c0 15.214 7.978 23.561 22.634 23.561c3.152 0 5.75-.185 9.831-.74v-45.825c-3.339-1.112-6.121-1.483-9.646-1.483m83.664-64.93v29.312h-28.568V50.231z" /></svg>;
const tsIcon = <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 256"><path fill="#3178c6" d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0" /><path fill="#fff" d="M150.518 200.475v27.62q6.738 3.453 15.938 5.179T185.849 235q9.934 0 18.874-1.899t15.678-6.257q6.738-4.359 10.669-11.394q3.93-7.033 3.93-17.391q0-7.51-2.246-13.163a30.8 30.8 0 0 0-6.479-10.055q-4.232-4.402-10.149-7.898t-13.347-6.602q-5.442-2.245-9.761-4.359t-7.342-4.316q-3.024-2.2-4.665-4.661t-1.641-5.567q0-2.848 1.468-5.135q1.469-2.288 4.147-3.927t6.565-2.547q3.887-.906 8.638-.906q3.456 0 7.299.518q3.844.517 7.732 1.597a54 54 0 0 1 7.558 2.719a41.7 41.7 0 0 1 6.781 3.797v-25.807q-6.306-2.417-13.778-3.582T198.633 107q-9.847 0-18.658 2.115q-8.811 2.114-15.506 6.602q-6.694 4.49-10.582 11.437Q150 134.102 150 143.769q0 12.342 7.127 21.06t21.638 14.759a292 292 0 0 1 10.625 4.575q4.924 2.244 8.509 4.66t5.658 5.265t2.073 6.474a9.9 9.9 0 0 1-1.296 4.963q-1.295 2.287-3.93 3.97t-6.565 2.632t-9.2.95q-8.983 0-17.794-3.151t-16.327-9.451m-46.036-68.733H140V109H41v22.742h35.345V233h28.137z" /></svg>;
const pythonIcon = <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 255"><defs><linearGradient id="pyGrad1" x1="12.959%" x2="79.639%" y1="12.039%" y2="78.201%"><stop offset="0%" stopColor="#387eb8" /><stop offset="100%" stopColor="#366994" /></linearGradient><linearGradient id="pyGrad2" x1="19.128%" x2="90.742%" y1="20.579%" y2="88.429%"><stop offset="0%" stopColor="#ffe052" /><stop offset="100%" stopColor="#ffc331" /></linearGradient></defs><path fill="url(#pyGrad1)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072M92.802 19.66a11.12 11.12 0 0 1 11.13 11.13a11.12 11.12 0 0 1-11.13 11.13a11.12 11.12 0 0 1-11.13-11.13a11.12 11.12 0 0 1 11.13-11.13" /><path fill="url(#pyGrad2)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897m34.114-19.586a11.12 11.12 0 0 1-11.13-11.13a11.12 11.12 0 0 1 11.13-11.131a11.12 11.12 0 0 1 11.13 11.13a11.12 11.12 0 0 1-11.13 11.13" /></svg>;
const supabaseIcon = <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 256 263"><defs><linearGradient id="sbGrad1" x1="20.862%" x2="63.426%" y1="20.687%" y2="44.071%"><stop offset="0%" stopColor="#249361" /><stop offset="100%" stopColor="#3ecf8e" /></linearGradient></defs><path fill="url(#sbGrad1)" d="M149.602 258.579c-6.718 8.46-20.338 3.824-20.5-6.977l-2.367-157.984h106.229c19.24 0 29.971 22.223 18.007 37.292z" /><path fill="#3ecf8e" d="M106.399 4.37c6.717-8.461 20.338-3.826 20.5 6.976l1.037 157.984H23.037c-19.241 0-29.973-22.223-18.008-37.292z" /></svg>;
const n8nIcon = <img src="/img/n8nLogo.svg" alt="n8n" width={20} height={20} />;
const nexticon = <img src="/nextjsicon.svg" alt="Next.js" width={20} height={20} />;

function App() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const { t } = useTranslation();

  // Build project list here so it re-evaluates with translations
  const proyectosData: Proyecto[] = [
    {
      title: t('proyectos.item1.title'),
      subtitle: t('proyectos.item1.subtitle'),
      description: t('proyectos.item1.description'),
      longDescription: t('proyectos.item1.description'),
      image: '/img/proyectoelvalle.png',
      githubUrl: 'https://github.com/ItsTheWest/SistemaWebDeAnalisis',
      liveUrl: 'https://github.com/ItsTheWest/SistemaWebDeAnalisis',
      tech: [
        { name: 'HTML', icon: htmlIcon },
        { name: 'CSS', icon: cssIcon },
        { name: 'JavaScript', icon: jsIcon },
        { name: 'Laravel', icon: laravelIcon },
        { name: 'MySQL', icon: mysqlIcon },
      ],
    },
    {
      title: t('proyectos.item2.title'),
      subtitle: t('proyectos.item2.subtitle'),
      description: t('proyectos.item2.description'),
      longDescription: t('proyectos.item2.description'),
      status: 'En Desarrollo',
      image: '/img/stockmanager.jpg',
      tech: [
        { name: 'Next.js', icon: nexticon },
        { name: 'Tailwind CSS', icon: tailwindIcon },
        { name: 'Django', icon: djangoIcon },
        { name: 'TypeScript', icon: tsIcon },
        { name: 'Python', icon: pythonIcon },
        { name: 'Supabase', icon: supabaseIcon },
        { name: 'n8n', icon: n8nIcon },
      ],
    },
    {
      title: t('proyectos.item3.title'),
      subtitle: t('proyectos.item3.subtitle'),
      description: t('proyectos.item3.description'),
      longDescription: t('proyectos.item3.description'),
      image: '/img/proyectiocadiz.png',
      tech: [
        { name: 'Next.js', icon: nexticon },
        { name: 'TypeScript', icon: tsIcon },
        { name: 'Supabase', icon: supabaseIcon },
        { name: 'Tailwind CSS', icon: tailwindIcon },
      ],
    },
  ];

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Actualizar el título de la página según el idioma
  useEffect(() => {
    const updateTitle = () => {
      const currentLang = localStorage.getItem('i18nextLng') || 'es';
      const title = currentLang === 'es' ? 'nfdev | Portafolio' : 'nfdev | Portfolio';
      document.title = title;
    };

    // Actualizar título inicial
    updateTitle();

    // Escuchar cambios en el localStorage para detectar cambio de idioma
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'i18nextLng') {
        updateTitle();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // También escuchar cambios en el mismo tab
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key: string, value: string) {
      originalSetItem.call(this, key, value);
      if (key === 'i18nextLng') {
        updateTitle();
      }
    };

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="offline-container">
        <div className="offline-card">
          <div className="wifi-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 24 24">
              <path fill="#ef4444" d="m19.75 22.6l-9.4-9.45q-1.175.275-2.187.825T6.35 15.35l-2.1-2.15q.8-.8 1.725-1.4t1.975-1.05L5.7 8.5q-1.025.525-1.913 1.163T2.1 11.1L0 8.95q.8-.8 1.663-1.437T3.5 6.3L1.4 4.2l1.4-1.4l18.4 18.4zM12 21q-1.05 0-1.775-.737T9.5 18.5q0-1.05.725-1.775T12 16t1.775.725t.725 1.775q0 1.025-.725 1.763T12 21m5.9-5.95l-.725-.725l-.725-.725l-3.6-3.6q2.025.2 3.787 1.025T19.75 13.2zm4-3.95q-1.925-1.925-4.462-3.012T12 7q-.525 0-1.012.038T10 7.15L7.45 4.6q1.1-.3 2.238-.45T12 4q3.55 0 6.625 1.325T24 8.95z" />
            </svg>
          </div>
          <h1>Sin conexión a internet</h1>
          <p>Por favor, verifica tu conexión Wi‑Fi o datos móviles para continuar.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <Squares
          speed={0.4}
          squareSize={40}
          direction='down'
          borderColor='#333'
          hoverFillColor='#444'
        />
      </div>
      <Suspense fallback="Cargando traduciones">
        <Navegador>

          <Dropdown></Dropdown>
        </Navegador>
        <main >
          <ScrollReveal animation="fade-up" delay={0.2} duration={1.8}>
            <Perfil>
              <Typewriter></Typewriter>
            </Perfil>
          </ScrollReveal>

          <hr></hr>

          <ScrollReveal animation="fade-up" duration={1.8}>
            <h2 id="Yo" className="title">{t('secciones.sobremi')}</h2>
            <Sobremi></Sobremi>
          </ScrollReveal>

          <hr></hr>

          <ScrollReveal animation="fade-up" duration={1.8}>
            <h2 id="Tec" className="title">{t('secciones.tecnologias')}</h2>
            <p className='parra'>{t('tecnologias.parrafo')}</p>
            <div style={{ height: '100px', position: 'relative', marginTop: '40px', width: '100%', maxWidth: '800px', margin: '40px auto', display: 'flex', alignItems: 'center' }}>
              <LogoLoop
                logos={techLogos}
                speed={60}
                direction="left"
                logoHeight={50}
                gap={60}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                ariaLabel="Technology partners"
              />
            </div>
          </ScrollReveal>

          <hr></hr>

          <ScrollReveal animation="fade-up" threshold={0.2} duration={1.8}>
            <h2 id="Ex" className="title">{t('secciones.experiencia')}</h2>
            <Experiencia></Experiencia>
          </ScrollReveal>

          <hr></hr>

          <ScrollReveal animation="fade-up" threshold={0.15} duration={1.8}>
            <h2 id="Pro" className="title">{t('secciones.proyectos')}</h2>
            <ProyectosGrid proyectos={proyectosData} />
          </ScrollReveal>

          <hr></hr>

          <ScrollReveal animation="fade-up" threshold={0.2} duration={1.8}>
            <Contacto />
          </ScrollReveal>

        </main>
        <Footer />
      </Suspense>
    </>

  )

}

export default App
