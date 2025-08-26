import './App.css'
import Navegador,{Dropdown} from './components/menu/Navegador'
import Perfil,{Typewriter} from './components/Perfil/Perfil'
import Tecnologias from './components/tecnologias/Tecnologias';
import Experiencia from './components/Experiencia/Experiencia'; 
import { Proyectos } from './components/Proyectos/Proyectos';
import { Footer } from './components/footer/footer';
import Sobremi from './components/sobremi/Sobremi';
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

function App() {
const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
const { t } = useTranslation();
const skills = [
  { icon: '/img/htmlLogo.svg', name: 'HTML5', bgColor: '#e44d26' },     
  { icon: '/img/cssLogo.svg', name: 'CSS3', bgColor: '#264de4' },      
  { icon: '/img/jsLogo.svg', name: 'JavaScript', bgColor: '#f0db4f' }, 
   { icon: '/img/tsLogo.svg', name: 'TypeScript', bgColor: 'rgba(22, 93, 247, 1)' } ,
  { icon: '/img/phpLogo.svg', name: 'PHP', bgColor: '#8892BF' },        
  { icon: '/img/cLogo.svg', name: 'C++', bgColor: '#00599C' },  
  { icon: '/img/365Logo.png', name: 'M365', bgColor: '#00758F' },        
  { icon: '/img/reactLogo.svg', name: 'React', bgColor: '#61DBFB' },   
  { icon: '/img/angularLogo.svg', name: 'Angular', bgColor: '#dd0031' },
  { icon: '/img/laravelLogo.svg', name: 'Laravel', bgColor: '#FF2D20' },
  { icon: '/img/mysqlLogo.svg', name: 'Mysql', bgColor: '#00758F' }, 
  { icon: '/img/gitLogo.svg', name: 'GitHub', bgColor: 'rgba(255, 255, 255, 1)' },
  { icon: '/img/git2Logo.svg', name: 'Git', bgColor: '#FF2D20' } ,
 
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
   localStorage.setItem = function(key: string, value: string) {
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

 return(
  <>
  <Suspense fallback="Cargando traduciones">
  <Navegador>
   
    <Dropdown></Dropdown>
  </Navegador>
  <main >
  <Perfil>
    <Typewriter></Typewriter>
  </Perfil>
  <hr></hr>
   <h2 id="Yo"className="title">{t('secciones.sobremi')}</h2>
   <Sobremi></Sobremi>
   <hr></hr>
   <h2 id="Tec"className="title">{t('secciones.tecnologias')}</h2>
  <p className='parra'>{t('tecnologias.parrafo')}</p>
  <Tecnologias skills={skills} />
   <hr></hr>
   <h2 id="Ex" className="title">{t('secciones.experiencia')}</h2>
  <Experiencia></Experiencia>
  <hr></hr>
   <h2 id="Pro"className="title">{t('secciones.proyectos')}</h2>
    <Proyectos
  title={t('proyectos.item1.title')}
  subtitle={t('proyectos.item1.subtitle')}
  description={t('proyectos.item1.description')}
  tech={[
    {
      name: "HTML",
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 128 128"><path fill="#a4a4a5" d="m9.032 2l10.005 112.093l44.896 12.401l45.02-12.387L118.968 2zm89.126 26.539l-.627 7.172L97.255 39H44.59l1.257 14h50.156l-.336 3.471l-3.233 36.119l-.238 2.27L64 102.609v.002l-.034.018l-28.177-7.423L33.876 74h13.815l.979 10.919L63.957 89H64v-.546l15.355-3.875L80.959 67H33.261l-3.383-38.117L29.549 25h68.939z"/></svg>
      ),
    },
    {
      name: "CSS",
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 128 128"><path fill="#a4a4a5" d="m8.76 1l10.055 112.883l45.118 12.58l45.244-12.626L119.24 1zm89.591 25.862l-3.347 37.605l.01.203l-.014.467v-.004l-2.378 26.294l-.262 2.336L64 101.607v.001l-.022.019l-28.311-7.888L33.75 72h13.883l.985 11.054l15.386 4.17l-.004.008v-.002l15.443-4.229L81.075 65H48.792l-.277-3.043l-.631-7.129L47.553 51h34.749l1.264-14H30.64l-.277-3.041l-.63-7.131L29.401 23h69.281z"/></svg>
      ),
    },
    {
      name: "JavaScript",
      icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 128 128"><path fill="#a4a4a5" d="M2 1v125h125V1zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401c-6.271 1.44-12.269.619-16.731-2.059c-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071c1.214 2.034 2.261 3.474 4.319 4.485c2.022.69 6.461 1.131 8.175-2.427c1.047-1.81.714-7.628.714-14.065C58.433 78.073 58.48 68 58.48 58h11.709c0 11 .06 21.418 0 32.152c.025 6.58.596 12.446-2.07 17.361m48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176c-1.916-2.165-3.117-3.296-4.26-5.795c4.819-2.772 4.819-2.772 9.508-5.485c2.547 3.915 4.902 6.068 9.139 6.949c5.748.702 11.531-1.273 10.234-7.378c-1.333-4.986-11.77-6.199-18.873-11.531c-7.211-4.843-8.901-16.611-2.975-23.335c1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355c.904.916 1.642 1.904 3.022 4.045c-3.772 2.404-3.76 2.381-9.163 5.879c-1.154-2.486-3.069-4.046-5.093-4.724c-3.142-.952-7.104.083-7.926 3.403c-.285 1.023-.226 1.975.227 3.665c1.273 2.903 5.545 4.165 9.377 5.926c11.031 4.474 14.756 9.271 15.672 14.981c.882 4.916-.213 8.105-.38 8.581"/></svg>
      ),
    },
    {
      name: "Laravel",
      icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 128 128"><path fill="#a4a4a5" d="M27.271.11c-.2.078-5.82 3.28-12.487 7.112c-8.078 4.644-12.227 7.09-12.449 7.32c-.19.225-.34.482-.438.76c-.167.564-.179 82.985-.01 83.578c.061.23.26.568.44.754c.436.46 48.664 28.19 49.25 28.324c.272.065.577.054.88-.03c.658-.165 48.76-27.834 49.188-28.286c.175-.195.375-.532.44-.761c.084-.273.115-4.58.115-13.655v-13.26l11.726-6.735c11.056-6.357 11.733-6.755 12.017-7.191l.29-.47V43.287c0-15.548.03-14.673-.585-15.235c-.165-.146-5.798-3.433-12.53-7.31L100.89 13.71h-1.359l-11.963 6.87c-6.586 3.788-12.184 7.027-12.457 7.203c-.272.18-.597.512-.73.753l-.242.417l-.054 13.455l-.048 13.46l-9.879 5.69c-5.434 3.124-9.957 5.71-10.053 5.734c-.175.049-.187-1.232-.187-25.966V15.293l-.26-.447c-.326-.545 1.136.324-13.544-8.114C27.803-.348 28.098-.2 27.27.11zm11.317 10.307c5.15 2.955 9.364 5.4 9.364 5.43c0 .031-4.516 2.641-10.035 5.813l-10.041 5.765l-10.023-5.764c-5.507-3.173-10.02-5.783-10.02-5.814s4.505-2.64 10.013-5.805l9.999-5.752l.69.376q5.036 2.86 10.053 5.751m71.668 13.261c5.422 3.122 9.908 5.702 9.95 5.744c.114.103-19.774 11.535-20.046 11.523c-.272-.008-19.915-11.335-19.907-11.473c.01-.157 19.773-11.527 19.973-11.496c.091.022 4.607 2.59 10.03 5.702M16.3 25.328l9.558 5.503l.055 27.247l.05 27.252l.233.368c.122.194.352.459.52.581c.158.115 5.477 3.146 11.818 6.724l11.52 6.506v11.527c0 6.326-.043 11.516-.097 11.516c-.041 0-10-5.699-22.124-12.676L5.793 97.201l-.03-38.966l-.019-38.954l.49.271c.283.15 4.807 2.748 10.065 5.775zm33.754 19.18v25.109l-.387.253c-.525.332-19.667 11.335-19.732 11.335c-.03 0-.054-11.336-.054-25.193l.012-25.182l10-5.752c5.499-3.165 10.034-5.733 10.088-5.714c.039.024.073 11.34.073 25.144m38.15-5.775l10.023 5.763V55.92c0 10.838-.011 11.42-.176 11.357c-.107-.041-4.642-2.64-10.083-5.774l-9.91-5.69v-11.42c0-6.287.032-11.424.062-11.424c.043 0 4.577 2.592 10.084 5.764m34.164 5.587c0 6.254-.042 11.412-.084 11.462c-.072.115-19.896 11.538-20.022 11.538c-.031 0-.062-5.135-.062-11.423v-11.42l10-5.756c5.507-3.16 10.042-5.752 10.084-5.752c.053 0 .084 5.105.084 11.351M95.993 70.933L52.005 96.04L32.056 84.693S76 59.277 76.176 59.343zm2.215 14.827l-.034 11.442l-22.028 12.676c-12.12 6.976-22.082 12.675-22.132 12.675c-.053 0-.095-4.658-.095-11.516V99.51l22.08-12.592c12.132-6.923 22.101-12.59 22.154-12.602c.043 0 .062 5.148.054 11.443z"/></svg>
      ),
    },
     {
      name: "Mysql",
      icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 128 128">
	<path fill="#a4a4a5" d="M64 8.25c-3.465.008-6.93.164-10.383.477a99 99 0 0 0-6.27.773q-2.813.457-5.585 1.125c-1.602.39-3.188.86-4.75 1.398q-1.015.374-2.012.813q-1.307.576-2.531 1.316q-.361.22-.711.461a9 9 0 0 0-2.035 1.969a4.7 4.7 0 0 0-.532 1.047a3.5 3.5 0 0 0-.148 1.535q.07.48.262.926c.14.312.316.61.527.879c.36.472.77.902 1.223 1.281a12.5 12.5 0 0 0 2.418 1.602a23 23 0 0 0 3.218 1.421l-.355.114a81 81 0 0 0 6.758 1.847c2.281.524 4.586.946 6.906 1.266c2.316.324 4.648.547 6.988.668a79 79 0 0 0 7.012.05c2.273.063 4.55.028 6.82-.105a81 81 0 0 0 6.778-.71c.468-.06.922-.13 1.37-.192q.914-.134 1.821-.285a57 57 0 0 0 3.89-.746a55 55 0 0 0 6.63-1.899c.89-.34 1.77-.715 2.629-1.133a20 20 0 0 0 2.148-1.242a11.4 11.4 0 0 0 1.578-1.324c.39-.418.727-.89.988-1.402c.211-.461.325-.961.336-1.47a3.26 3.26 0 0 0-.406-1.585a4.7 4.7 0 0 0-.71-1.027a9 9 0 0 0-1.024-.973a10 10 0 0 0-.614-.484a15 15 0 0 0-1.484-.903a22.6 22.6 0 0 0-3.77-1.683a53.4 53.4 0 0 0-7.453-2.016a78 78 0 0 0-5.93-.973a97 97 0 0 0-6.558-.609c-2.344-.145-4.691-.21-7.039-.207M18.418 20.055v87.89c0 9.032 20.055 16.356 44.941 16.5H64c25.172 0 45.582-7.113 45.582-16.5v-87.89c0 9.172-20.41 16.496-45.582 16.496s-45.582-7.11-45.582-16.496m22.117 36.48c2.422-.097 4.836.29 7.11 1.137v6.113a11.53 11.53 0 0 0-7.11-2.062a4.85 4.85 0 0 0-2.988.855a2.42 2.42 0 0 0-1.067 2.133a3.13 3.13 0 0 0 .852 2.277a13 13 0 0 0 3.629 2.203a17.2 17.2 0 0 1 5.902 4.055a7.46 7.46 0 0 1 1.778 4.977a7.68 7.68 0 0 1-2.348 6.468a13.36 13.36 0 0 1-8.39 2.348a15.4 15.4 0 0 1-7.61-1.707v-6.613a11.8 11.8 0 0 0 7.75 2.988a5.8 5.8 0 0 0 3.203-.781a2.71 2.71 0 0 0 1.137-2.207a2.98 2.98 0 0 0-1.067-2.274a20.6 20.6 0 0 0-4.41-2.562c-4.836-2.133-7.11-4.977-7.11-8.602a7.68 7.68 0 0 1 2.985-6.332a11.67 11.67 0 0 1 7.754-2.414m25.598.281a14.2 14.2 0 0 1 7.113 1.852A12.87 12.87 0 0 1 78.223 64a16.5 16.5 0 0 1 2.347 7.54a16.63 16.63 0 0 1-2.347 8.956a12.74 12.74 0 0 1-7.114 5.406l8.75 7.82h-8.605l-6.117-7.109a14.7 14.7 0 0 1-7.11-2.133a12.53 12.53 0 0 1-4.906-5.261a16.06 16.06 0 0 1-1.707-7.114A17.5 17.5 0 0 1 53.262 64a13.2 13.2 0 0 1 5.191-5.262a15 15 0 0 1 7.68-1.922m19.199.075h6.402v24.175h11.094v5.192H85.332Zm-19.484 4.906a7.1 7.1 0 0 0-5.547 2.629a10.9 10.9 0 0 0-2.063 7.113a10.84 10.84 0 0 0 2.063 7.11a6.54 6.54 0 0 0 5.406 2.558a6.67 6.67 0 0 0 5.402-2.488a10.36 10.36 0 0 0 1.993-7.18c.156-2.52-.52-5.016-1.918-7.113a6.18 6.18 0 0 0-5.336-2.63Zm0 0" />
</svg>
      ),
    },
  ]}
  image="/img/proyectoelvalle.png"
  githubUrl="https://github.com/ItsTheWest/SistemaWebDeAnalisis"
  liveUrl="https://github.com/ItsTheWest/SistemaWebDeAnalisis"
/>


  </main>
 <Footer />
 </Suspense>
  </>
  
 )

}

export default App

