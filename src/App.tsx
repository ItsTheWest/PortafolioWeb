import './App.css'
import Navegador,{Dropdown} from './components/menu/Navegador'
import Perfil,{Typewriter} from './components/Perfil/Perfil'
import Tecnologias from './components/tecnologias/Tecnologias';
import Experiencia from './components/Experiencia/Experiencia'; 
import { Proyectos } from './components/Proyectos/Proyectos';

function App() {
const skills = [
  { icon: '/img/htmlLogo.svg', name: 'HTML5', bgColor: '#e44d26' },     
  { icon: '/img/cssLogo.svg', name: 'CSS3', bgColor: '#264de4' },      
  { icon: '/img/jsLogo.svg', name: 'JavaScript', bgColor: '#f0db4f' }, 
  { icon: '/img/phpLogo.svg', name: 'PHP', bgColor: '#8892BF' },        
  { icon: '/img/cLogo.svg', name: 'C++', bgColor: '#00599C' },  
  { icon: '/img/365Logo.png', name: 'M365', bgColor: '#00758F' },        
  { icon: '/img/reactLogo.svg', name: 'React', bgColor: '#61DBFB' },   
  { icon: '/img/angularLogo.svg', name: 'Angular', bgColor: '#dd0031' },
  { icon: '/img/laravelLogo.svg', name: 'Laravel', bgColor: '#FF2D20' },
  { icon: '/img/mysqlLogo.svg', name: 'Mysql', bgColor: '#00758F' }, 
  { icon: '/img/gitLogo.svg', name: 'GitHub', bgColor: 'rgba(255, 255, 255, 1)' } // Fondo blanco para GitHub
];

  


 return(
  <>
  <Navegador>
    <Dropdown></Dropdown>
  </Navegador>
  <main>
  <Perfil>
    <Typewriter></Typewriter>
  </Perfil>
   <hr></hr>
   <h2 className="title">Tecnologías</h2>
  <p className='parra'>Este apartado reúne los lenguajes y tecnologías aplicados en el ámbito del desarrollo web interfaces dinámicas, aplicaciones escalables y soluciones robustas</p>
  <Tecnologias skills={skills} />
   <hr></hr>
   <h2 className="title">Experiencia</h2>
  <Experiencia></Experiencia>
  <hr></hr>
   <h2 className="title">Proyectos</h2>
    
    <Proyectos
  title="Hackeo Matrix"
  subtitle="Mi obra maestra"
  description="Migración del Matrix al mundo real y hackeo del sistema ficticio para salvar a la humanidad."
  tech={["Binario", "React", "TypeScript", "CSS"]}
  image="/img/buchanans.jpeg"
  githubUrl="https://github.com/usuario/hackeo-matrix"
  liveUrl="https://hackeo-matrix.vercel.app"
/>
 <hr></hr>
  </main>
 

 
  
  </>
  
 )

}

export default App
