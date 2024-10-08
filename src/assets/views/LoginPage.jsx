import './LoginPage.css';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const auth = useAuth();
  const { user } = auth;
  const {displayName} = auth.user;
  // console.log(displayName);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  
  useEffect(() => {
    if (user) {
      navigate("/HomePage");
    }
  }, [user, navigate]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.login(email, password);
      navigate("/HomePage");
    } catch (error) {
      console.error("Error en el login", error);
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

  //console.log(email, password, "stateLogin");
  return (
    <div className='login-container'> 
      <div className='group-form-container'>
        <img className='logo' src="/VoluntariAppLogo.png" alt="logo" />
        <h1 className='title-access'>¡Bienvenido de nuevo!</h1>
        {displayName && <h3>gracias {displayName}</h3> }
        <form className='form-login'>
          <div className='group-form'>
              <span className='span-form'>Email: </span>
              <input className='input-form' required type="email" placeholder='pruebita200g@mail.com' onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className='group-form'>
              <span className='span-form'>Contraseña: </span>
              <input className='input-form' type="password" onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className="password-remind-container">
              <div className="remember-container">
                  <input className='input-checkbox' type="checkbox" />
                  <span className='span-checkbox' >Recuerdame</span>
              </div>
              <a className='ref-span' href="#forget">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="btn-container">
              <button className='span-btn' onClick={(e)=>handleLogin(e)} >Ingresar</button>
          </div>
          <div className="btn-container">
              <button className='span-btn-g' onClick={(e)=>handleGoogle(e)}>Ingresar con Google
                <Icon icon="flat-color-icons:google" width="24" height="24" />
              </button>
          </div>
        </form>
        <span className='span-remember' >¿No tienes una cuenta? <a className='a-ref-register' href="/RegisterPage">Regístrate</a></span>
        <div className="social-nets-container">
            <Icon icon="line-md:facebook" width="24" height="24"  style={{color: "#FF6E52"}} />
            <Icon icon="line-md:twitter-x" width="24" height="24"  style={{color: "#FF6E52"}} />
            <Icon icon="line-md:instagram" width="24" height="24"  style={{color: "#FF6E52"}} />
        </div>
      </div>
      <div className="group-img-container">
        <img src="/images/img1Compu.png" alt="compu"/>
      </div>
      <div className='rectangle-bg'></div>
    </div>
  )
}

export default LoginPage
