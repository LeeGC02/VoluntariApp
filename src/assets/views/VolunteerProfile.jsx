import "./VolunteerProfile.css";
import { useAuth } from "../../context/authContext";
import { useNavigate } from 'react-router-dom';

const VolunteerProfile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/LoginPage");
  }
  return (
    <div className="vol-profile-container">
        <button onClick={handleLogout}>Cerrar Sesion</button>
        <div className="vol-header-profile"></div>
        <div className="vol-information-container">
            {/* {photoURL && <img className="vol-avatar" src={photoURL} alt={displayName}/> } */}
            <img className="vol-avatar" src="/images/avatar-photo.svg" alt="avartar-volunteer" />
            <div className="vol-information-profile">
                <h2>Nombre de usuario</h2>
                {/* {displayName && <h2>{displayName}</h2> } */}
                <p className="p-profile">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis beatae quibusdam aperiam, excepturi dolor voluptas ratione voluptatem delectus reprehenderit itaque eos, totam praesentium nesciunt animi. Quaerat sunt voluptas laudantium distinctio.</p>
                <div className="location">
                    <span className="span-profile">ubicacion de la persona</span>
                </div>
            </div>
            <div className="about-container">
                <h3>A cerca de</h3>
                <hr className="hr-profile"/>
                <p className="p-profile">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, odit. Animi suscipit facilis doloremque placeat architecto. At aspernatur, possimus pariatur tenetur ex hic asperiores incidunt commodi voluptatem dicta accusamus nobis.</p>
            </div>
            <div className="experience-container">
                <h3>Experiencia del Voluntario</h3>
                <hr className="hr-profile"/>
                <div>
                    <span className="span-profile">nose</span>
                    <span className="span-profile">rol de la persona</span>
                    <span className="span-profile">calendario</span>
                </div>
            </div>
            <div className="skills-container">
                <h3>Habilidades del Voluntario</h3>
                <hr className="hr-profile"/>
            </div>
            <div className="achievements-container">
                <h3>Logros</h3>
                <hr className="hr-profile"/>
                <p className="p-profile">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolores omnis architecto est adipisci, eligendi neque beatae. Dolorem ipsum pariatur dolorum dolore, ducimus architecto distinctio, perspiciatis commodi doloribus hic esse!</p>
            </div>
        </div>
    </div>
  )
}

export default VolunteerProfile