import FormOrganization from '../components/FormOrganization';
import FormVolunteer from '../components/FormVolunteer';
import { useState } from 'react';
import './RegisterPage.css';
import { Icon } from '@iconify/react';

const RegisterPage = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const handleFormSelection = (formType) => {
    setSelectedForm(formType);
  };
  return (
    <div className="register-container">
      <div className="group-img-container-register">
        <img src="/images/compu2.png" alt="compu"/>
      </div>
      <div className='rectangle-bg-two'></div>
      <div className="group-form-container-register">
        <h1 className='title-access-register'>¡Por favor rellene el formulario para registrarse!</h1>
        {selectedForm === 'volunteer' && <FormVolunteer />}
        {selectedForm === 'organization' && <FormOrganization />}
        {!selectedForm && (
          <>
            <p className='p-desc'>Selecciona si eres una <b>Organización</b> o <b>Voluntario</b> para acceder al formulario correspondiente.</p>
            <div className="btn-change">
              <button className='btn-rol' onClick={() => handleFormSelection('organization')}>Organización</button>
              <button className='btn-rol' onClick={() => handleFormSelection('volunteer')}>Voluntariado</button>
            </div>
          </>
        )}
        <span className='span-remember-register' >¿Si tengo una cuenta? <a className='a-ref-register-register' href="#register">Iniciar Sesión</a></span>
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