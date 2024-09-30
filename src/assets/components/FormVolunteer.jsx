import './FormVolunteer.css';
const FormVolunteer = () => {
  return (
    <div className="form-container">
      <div className='group-form-register'>
        <span className='span-form-register'>Nombre Completo: </span>
        <input className='input-form-register' type="text" placeholder='Juan Perez'/>
      </div>
      <div className='group-form-register'>
        <span className='span-form-register'>Nombre de Usuario: </span>
        <input className='input-form-register' type="text" placeholder='Juan'/>
      </div>
      <div className='group-form-register'>
        <span className='span-form-register'>Email: </span>
        <input className='input-form-register' type="email" placeholder='pruebita200g@mail.com'/>
      </div>
      <div className='group-form-register'>
        <span className='span-form-register'>Contraseña: </span>
        <input className='input-form-register' type="password"/>
      </div>
      <div className='group-form-register'>
        <span className='span-form-register'>Confirmación Contraseña: </span>
        <input className='input-form-register' type="password"/>
      </div>
      <div className='group-form-register'>
        <span className='span-form-register'>Teléfono de Contacto: </span>
        <input className='input-form-register' type="number" placeholder='12345678'/>
      </div>
      <div className='group-form-register'>
        <span className='span-form-register'>Dirección: </span>
        <input className='input-form-register' type="text" placeholder='Av. Brasil'/>
      </div>
      <div className='group-form-register'>
        <span className='span-form-register'>Ciudad: </span>
        <input className='input-form-register' type="text" placeholder='La Paz'/>
      </div>
      <div className='group-form-register'>
        <span className='span-form-register'>Fecha de nacimiento: </span>
        <input className='input-form-register' type="date" placeholder='pruebita200g@mail.com'/>
      </div>
      <div className='group-form-register'>
        <span className='span-form-register'>Nivel de educación: </span>
        <select className='combo-container' name="combo" id="education">
            <option className='combo-edu' value="" disabled selected>Selecciona tu nivel de educación</option>
            <option className='combo-edu' value="primaria">Primaria</option>
            <option className='combo-edu' value="secundaria">Secundaria</option>
            <option className='combo-edu' value="bachillerato">Bachillerato</option>
            <option className='combo-edu' value="universidad">Universidad</option>
            <option className='combo-edu' value="postgrado">Postgrado</option>
        </select>
      </div>
      <div className='group-form-register'>
        <span className='span-form-register'>Habilidades o áreas de interés: </span>
        <textarea className='input-form-register' type="text" placeholder='Habilidades o áreas de interés'/>
      </div>
      <div className="btn-container-registro">
        <button className='span-btn-registro'>Registrar</button>
      </div>
    </div>
  )
}

export default FormVolunteer