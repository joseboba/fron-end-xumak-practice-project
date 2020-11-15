import React, {useState } from 'react'
import Swal from 'sweetalert2'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { contries, positions } from '../../resources/options/register-options'
import { startRegister } from '../../actions/authActions';
import '../../styles/components/auth/RegisterScreen.css'


export const RegisterUserScreen = () => {

  const dispatch = useDispatch()

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        password_2: '',
        country: '',
        position: '',
        username: '',
    })
    
    
    const handleInputChange = ({ target }) => {
      if(target.name === "name") setFormValues({ ...formValues, [target.name]:target.value})
      if(target.name === "email") setFormValues({ ...formValues, [target.name]:target.value, username: target.value.split('@')[0]})
      if(target.name === "password") setFormValues({ ...formValues, [target.name]:target.value})
      if(target.name === "password_2") setFormValues({ ...formValues, [target.name]:target.value})
      if(target.name === "country") setFormValues({ ...formValues, [target.name]:target.value })
      if(target.name === 'position') setFormValues({ ...formValues, [target.name]:target.value })

    }

    const {name, email, country, position, username , password, password_2 } = formValues;
    const user_split = email.split('@')[0];

    const handleSubmit = (e) => {
      e.preventDefault();
      if(country.length > 0 &&  name.length > 0){
        if( username && validator.isEmail(email, { domain_specific_validation: true })){
          if(password === password_2){
              dispatch(startRegister(name, email, password, country, position, username));
          }else{
              Swal.fire('Contraseña incorrecta', 'Las contraseñas no coinciden', 'error')
          }
        }else{
          Swal.fire('Correos erroneo', 'Verifique que el correo sea valido', 'error')
        }
      }else{
        Swal.fire('Datos errones', 'Alguna casilla no está llena', 'error')
      }      
    }

    return (
      <>
      <div className="principal-box">
        <div className="form">  
          <h1>Register User</h1>
          <form className="form-group" onSubmit={ handleSubmit }>


{/*----------------------------------------------------- Name -----------------------------------------------------*/}          

              <div className="input-group-prepend">
                <label className="input-group-text">Name</label>
              </div>
              <div className="inputEmail">
                <input name="name" placeholder="Nombre" className="form-control" value={name} onChange={ handleInputChange }/>
              </div>

{/*----------------------------------------------------- Email -----------------------------------------------------*/}          
              
              <div className="input-group-prepend">
                <label className="input-group-text">Email</label>
              </div>
              <div className="inputEmail">
                <input type="email" name="email" placeholder="example@xumak.com" className="form-control" value={email} onChange={ handleInputChange }/>
              </div>
{/*----------------------------------------------------- password -----------------------------------------------------*/}          
              <div className="input-group-prepend">
                <label className="input-group-text">Password</label>
              </div>
              <div>
                <input type="password" name="password" placeholder="Ingrese su conraseña" className="form-control" value={password} onChange={ handleInputChange }/>
              </div>
{/*----------------------------------------------------- Email -----------------------------------------------------*/}          
              <div className="input-group-prepend">
                <label className="input-group-text">Confirm your password</label>
              </div>
              <div>
                <input type="password" name="password_2" placeholder="Confirme su contraseña" className="form-control" value={password_2} onChange={ handleInputChange }/>
              </div>
{/*----------------------------------------------------- País -----------------------------------------------------*/}            
              <div className="inputPais">
                  <div className="input-group-prepend">
                    <label className="input-group-text">Pais</label>
                  </div>
                  <select className="custom-select" name="country" onChange={ handleInputChange } value={country}>
                    { contries.map( c => ( <option key={ c }> { c } </option>))}
                  </select>
              </div>

{/*----------------------------------------------------- Cargo -----------------------------------------------------*/}
              <div className="inputCargo">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Cargo</label>
                            </div>
                            <select className="custom-select" name="position" onChange={ handleInputChange } value={ position }>
                                { positions.map( p => ( <option key={ p } className="dropdown-item"> { p.trim() } </option>))}
                            </select>
                        </div>

{/*----------------------------------------------------- Username -----------------------------------------------------*/}        
              <div className="inputUsername">
                <div className="input-group-prepend"> 
                  <label className="input-group-text">Username</label>
                </div>
                <div className="inputEmail">
                  <input type="text" className="form-control" placeholder="Username" name="username" value={user_split}  onChange={ handleInputChange } disabled={true}/>
                </div>
              </div>

              <button className="btn-submit" type="submit" onSubmit={handleSubmit}>Registrarme</button>
              <Link className="btn-submit" to="/auth/login"> Inicia Sesión</Link>
          </form>
          </div>    
      </div>
    </>
    )
}
