import './LoginPage.css';
import { Icon } from '@iconify/react';

const LoginPage = () => {
  return (
    <div className='login-container'> 
      <div className='group-form-container'>
        <h1 className='title-access'>¡Bienvenido de nuevo!</h1>
        <div className='group-form'>
            <span className='span-form'>Email: </span>
            <input className='input-form' type="email" placeholder='pruebita200g@mail.com'/>
        </div>
        <div className='group-form'>
            <span className='span-form'>Contraseña: </span>
            <input className='input-form' type="password" />
        </div>
        <div className="password-remind-container">
            <div className="remember-container">
                <input className='input-checkbox' type="checkbox" />
                <span className='span-checkbox' >Recuerdame</span>
            </div>
            <a className='ref-span' href="#forget">¿Olvidaste tu contraseña?</a>
        </div>
        <div className="btn-container">
            <button className='span-btn'>Ingresar</button>
        </div>
        <span className='span-remember' >¿No tienes una cuenta? <a className='a-ref-register' href="#register">Regístrate</a></span>
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
