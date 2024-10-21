import './RegisterPage.css';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase.config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
const RegisterPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [rolRegister, setRolRegister] = useState(""); // Para el registro con email y contraseña
  const [error, setError] = useState("");

  console.log(emailRegister, passwordRegister, rolRegister);
  // registro con email
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!emailRegister || !passwordRegister || !rolRegister) {
      return setError("Ingresa un correo por favor");
    }
    try {
      const userCredential = await auth.register(emailRegister, passwordRegister,);
      const user = userCredential.user;

      await setDoc(doc(db, "usuario", user.uid), {
        email: user.email,
        rol: rolRegister,
      });

      if(rolRegister === "volunteer")
        navigate("/VolunteerPage");
      else if(rolRegister === "organization"){
        navigate("/OrganizationPage");
      }
 
      setError("");
    } catch (error) {
      console.error("Error en el registro", error);
      setError("Hubo un problema al crear la cuenta.");
    }
  };
  
  // registro con google si seleccionas antes el rol
  const handleGoogle = async (e) => {
    e.preventDefault();
    if (!rolRegister) {
      return setError("Por favor, selecciona un rol antes de registrarte con Google.");
    }
    try {
      const userCredential = await auth.loginWithGoogle();
      const user = userCredential.user;

      const docRef = doc(db, "usuario", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Si el documento no existe, crearlo con el rol seleccionado
        await setDoc(doc(db, "usuario", user.uid), {
          email: user.email,
          rol: rolRegister, // Guardamos el rol seleccionado
        });
      }

      if(rolRegister === "volunteer")
        navigate("/VolunteerPage");
      else if(rolRegister === "organization"){
        navigate("/OrganizationPage");
      }
      setError("");

    } catch (error) {
      console.error("Error en el registro con Google", error);
      setError("Hubo un problema al registrarte con Google.");    }
  };

  //console.log(emailRegister, passwordRegister, "stateFormsFirebase");
  return (

    <div className="register-container">
      <div className="group-img-container-register">
        <img src="/images/compu2.png" alt="compu"/>
      </div>
      <div className='rectangle-bg-two'></div>
      <div className="group-form-container-register">
        <img className='logo' src="/VoluntariAppLogo.png" alt="logo" />
        <h1 className='title-access-register'>¡Registrate para Empezar!</h1>
        <form className='form-register'>  
          <div className='group-form'>
              <span className='span-form'>Email: </span>
              <input className='input-form' type="email" required placeholder='pruebita200g@mail.com' onChange={(e)=>setEmailRegister(e.target.value)} />
          </div>
          <div className='group-form'>
              <span className='span-form'>Contraseña: </span>
              <input className='input-form' type="password" required onChange={(e)=>setPasswordRegister(e.target.value)} />
          </div>
          <div className='group-form'>
              <span className='span-form'>Tipo de usuario: </span>
              <select className='combo-rol-container' required name="id_rol" id="id_rol" onChange={(e)=>setRolRegister(e.target.value)}>
                <option className='combo-rol' value="default" disabled >Selecciona tu tipo de usuario</option>
                <option className='combo-rol' value="volunteer">Voluntario</option>
                <option className='combo-rol' value="organization">Organización</option>
              </select>
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="btn-container">
            <button className='span-btn' onClick={(e)=>handleRegister(e)} >Crear Cuenta</button>
          </div>
          <div className="btn-container">
              <button className='span-btn-g' onClick={(e)=>handleGoogle(e)}>Ingresar con Google
                <Icon icon="flat-color-icons:google" width="24" height="24" />
              </button>
          </div>
        </form>
        <span className='span-remember-register' >¿Si tengo una cuenta? <a className='a-ref-register-register' href="/LoginPage">Iniciar Sesión</a></span>
        <div className="social-nets-container-register">
            <Icon icon="line-md:facebook" width="24" height="24"  style={{color: "#FF6E52"}} />
            <Icon icon="line-md:twitter-x" width="24" height="24"  style={{color: "#FF6E52"}} />
            <Icon icon="line-md:instagram" width="24" height="24"  style={{color: "#FF6E52"}} />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage