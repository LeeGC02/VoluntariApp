import './FormOrganization.css';
const FormOrganization = () => {
  return (
    <div className="form-container-o">
      <div className='group-form-register-o'>
        <span className='span-form-register-o'>Nombre de la Organización: </span>
        <input className='input-form-register-o' type="text" placeholder='Pruebita SRL'/>
      </div>
      <div className='group-form-register-o'>
        <span className='span-form-register-o'>Nombre de Usuario: </span>
        <input className='input-form-register-o' type="text" placeholder='PruebSRL'/>
      </div>
      <div className='group-form-register-o'>
        <span className='span-form-register-o'>Email: </span>
        <input className='input-form-register-o' type="email" placeholder='pruebita200g@mail.com'/>
      </div>
      <div className='group-form-register-o'>
        <span className='span-form-register-o'>Contraseña: </span>
        <input className='input-form-register-o' type="password"/>
      </div>
      <div className='group-form-register-o'>
        <span className='span-form-register-o'>Confirmación Contraseña: </span>
        <input className='input-form-register-o' type="password"/>
      </div>
      <div className='group-form-register-o'>
        <span className='span-form-register-o'>Teléfono de Contacto: </span>
        <input className='input-form-register-o' type="number" placeholder='12345678'/>
      </div>
      <div className='group-form-register-o'>
        <span className='span-form-register-o'>Dirección: </span>
        <input className='input-form-register-o' type="text" placeholder='Av. Brasil'/>
      </div>
      <div className='group-form-register-o'>
        <span className='span-form-register-o'>Ciudad: </span>
        <input className='input-form-register-o' type="text" placeholder='La Paz'/>
      </div>
      <div className='group-form-register-o'>
        <span className='span-form-register-o'>Descripción de la Organización: </span>
        <textarea className='input-form-register-o' type="text" placeholder='Descripción de la Organización'/>
      </div>
      <div className="btn-container-registro-o">
        <button className='span-btn-registro-o'>Registrar</button>
      </div>
    </div>
  )
}

export default FormOrganization