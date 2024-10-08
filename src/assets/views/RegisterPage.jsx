// import FormOrganization from '../components/FormOrganization';
// import FormVolunteer from '../components/FormVolunteer';
import './RegisterPage.css';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  // const [selectedForm, setSelectedForm] = useState(null);
  // const handleFormSelection = (formType) => {
  //   setSelectedForm(formType);
  // };
  const auth = useAuth();
  const navigate = useNavigate();
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await auth.register(emailRegister, passwordRegister);
      navigate("/HomePage");  
    } catch (error) {
      console.error("Error en el registro", error);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      await auth.loginWithGoogle();
      navigate("/HomePage");
    } catch (error) {
      console.error("Error en el login con Google", error);
    }
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
              <input className='input-form' type="email" placeholder='pruebita200g@mail.com' onChange={(e)=>setEmailRegister(e.target.value)} />
          </div>
          <div className='group-form'>
              <span className='span-form'>Contraseña: </span>
              <input className='input-form' type="password" onChange={(e)=>setPasswordRegister(e.target.value)} />
          </div>
          <div className="btn-container">
            <button className='span-btn' onClick={(e)=>handleRegister(e)} >Crear Cuenta</button>
          </div>
          <div className="btn-container">
              <button className='span-btn-g' onClick={(e)=>handleGoogle(e)}>Ingresar con Google
                <Icon icon="flat-color-icons:google" width="24" height="24" />
              </button>
          </div>
        </form>
        {/* {selectedForm === 'volunteer' && <FormVolunteer />}
        {selectedForm === 'organization' && <FormOrganization />}
        {!selectedForm && (
          <>
            <p className='p-desc'>Selecciona si eres una <b>Organización</b> o <b>Voluntario</b> para acceder al formulario correspondiente.</p>
            <div className="btn-change">
              <button className='btn-rol' onClick={() => handleFormSelection('organization')}>Organización</button>
              <button className='btn-rol' onClick={() => handleFormSelection('volunteer')}>Voluntariado</button>
            </div>
          </>
        )} */}
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