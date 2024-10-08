import Footer from '../components/Footer';
import HeaderMaster from '../components/HeaderMaster'
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
      <div className="b">
        <HeaderMaster />
        <div className="a">


        <div className='Bienvenida' id='Bienvenida'>

            <div className='B-izquierda'>
            <div className='Bienvenida-title'>
                <p>Te Damos la Bienvenida a VoluntariApp!!!</p>
            </div>
            <div className='Bienvenida-txt'>
                <p>Explora oportunidades de voluntariado diseñadas especialmente para ti. Conéctate con organizaciones que comparten tus intereses y habilidades, y participa en proyectos que marcan la diferencia en tu comunidad.</p>
            </div>
            <div className='Bienvenida-Button'>
                <button className='' onClick={() => navigate('/RegisterPage')}>¡Únete y sé parte del cambio!</button>
            </div> 
            </div>

            <div className='B-derecha'>
            <div className='Bienvenida-img'>
                <img className='img-VoluntariApp' src="/VoluntariAppLogo.png" alt="logo VoluntariApp" />
            </div>
            </div>
            

        </div>
        <br />
        <div className='LineaDivisoraN'>

        </div>
        <br />




        <div className='QueEs' id='QueEs'>
            <div className='QueEs-title'>
                <p>¿Qué es VoluntariApp?</p>
            </div>
            <div className='QueEs-txt'>
                <p>VoluntariApp es una plataforma innovadora que conecta a voluntarios con organizaciones, ONGs, y fundaciones que buscan apoyo para sus proyectos. Nuestro objetivo es facilitar el acceso a oportunidades de voluntariado, creando un espacio donde las personas interesadas en ayudar puedan descubrir propuestas que se alineen con sus intereses, habilidades y disponibilidad. A través de VoluntariApp, queremos hacer más sencillo el proceso de encontrar y unirse a iniciativas que generan un impacto positivo en la sociedad.</p>
            </div> 
            <div className='QueEs-img'>
                <img className='img-VoluntariApp' src="/VoluntariAppLogo.png" alt="logo VoluntariApp" />
            </div>
        </div>



        <div className='Quienes Somos' id='Quienes Somos'>
            <div className='Quienes-title'>
                <p>¿Quiénes Somos?</p>
            </div>
            <div className='Quienes-txt'>
                <p>Somos un equipo comprometido con el fortalecimiento de la participación comunitaria y el trabajo voluntario. VoluntariApp nace con la visión de potenciar las conexiones entre personas que quieren hacer la diferencia y las organizaciones que necesitan apoyo. Nos enfocamos en ofrecer una plataforma accesible, segura y confiable, donde tanto voluntarios como organizaciones puedan interactuar de manera efectiva, facilitando la creación de redes de apoyo solidarias y sostenibles.</p>
            </div> 
            <div className='Quienes-img'>
                <img className='img-VoluntariApp' src="/VoluntariAppLogo.png" alt="logo VoluntariApp" />
            </div>
        </div>



        <div className='Dirigido' id='Dirigido'>
            <div className='Dirigido-title'>
                <p>¿A Quién Está Dirigida?</p>
            </div>
            <div className='Dirigido-txt'>
                <p>VoluntariApp está diseñada tanto para voluntarios que desean contribuir a causas importantes, como para organizaciones, ONGs, y fundaciones que buscan personas comprometidas para apoyar sus proyectos. Los voluntarios pueden encontrar oportunidades que coincidan con sus habilidades y motivaciones, mientras que las organizaciones pueden publicar sus necesidades y gestionar sus convocatorias de manera eficiente. Nos dirigimos a todas aquellas personas y entidades que desean colaborar y generar un impacto positivo en sus comunidades.</p>
            </div> 
            <div className='Dirigido-img'>
                <img className='img-VoluntariApp' src="/VoluntariAppLogo.png" alt="logo VoluntariApp" />
            </div>
        </div>
        <br />
        <div className='LineaDivisoraA'>
            
        </div>
        <br />



        <div className='Nuestros servicios' id='Servicios'>
            <div className='Servicios-title'>
                <p>Nuestros Servicios</p>
            </div>
            <div className='Servicios-txt'>
                <p>En VoluntariApp ofrecemos una gama de servicios diseñados para facilitar la conexión entre voluntarios y organizaciones, brindando herramientas que optimicen la gestión de oportunidades de voluntariado y la participación comunitaria.</p>
            </div> 
            <div className='Servicios-Cards'>

                <div className='Card#1'>
                    <img src="/public/images/Frame.png" alt="Pic1" />
                    <h1>Publicación de Oportunidades</h1>
                    <p>Las organizaciones publican proyectos con detalles específicos para voluntarios, facilitando la búsqueda de la oportunidad adecuada.</p>
                </div>

                <div className='Card#2'>
                    <img src="/public/images/Frame.png" alt="Pic1" />
                    <h1>Búsqueda y Aplicación</h1>
                    <p>Los voluntarios pueden acceder a un catálogo filtrado por ubicación, actividad y áreas de interés, postulándose fácilmente.</p>
                </div>

                <div className='Card#3'>
                    <img src="/public/images/Frame.png" alt="Pic1" />
                    <h1>Gestión de Perfiles</h1>
                    <p>Voluntarios y organizaciones personalizan sus perfiles, mostrando habilidades, experiencias y proyectos para encontrar mejores coincidencias.</p>
                </div>

                <div className='Card#4'>
                    <img src="/public/images/Frame.png" alt="Pic1" />
                    <h1>Calificación y Reseñas</h1>
                    <p>Los voluntarios califican organizaciones y dejan reseñas, promoviendo transparencia y decisiones informadas.</p>
                </div>

                <div className='Card#5'>
                    <img src="/public/images/Frame.png" alt="Pic1" />
                    <h1>Gestión de Proyectos</h1>
                    <p>Herramientas para que las organizaciones gestionen convocatorias y el progreso de proyectos de manera eficiente.</p>
                </div>

                <div className='Card#6'>
                    <img src="/public/images/Frame.png" alt="Pic1" />
                    <h1>Notificaciones y Alertas</h1>
                    <p>Notificaciones personalizadas y recordatorios de actividades y oportunidades relevantes.</p>
                </div>
            </div>
        </div>
        </div>
        <Footer/>
      </div>
      
    )
    
  }
  
  export default Home
  