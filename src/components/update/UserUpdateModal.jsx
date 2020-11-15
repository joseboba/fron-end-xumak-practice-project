import React, { useEffect } from 'react'
import Modal from 'react-modal'
import Swal from 'sweetalert2';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { startUptadeUser, uiCloseModal } from '../../actions/uiUserActions';
import { useState } from 'react';
import { contries, positions } from '../../resources/options/register-options';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

const initialState = {
        name: '',
        email: '',
        role: '',
        country: '',
        position: '',
        username: '',
}

export const UserUpdateModal = () => {

    const dispatch = useDispatch();
    const { update } = useSelector(state => state.uiUser);
    const { modalOpen } = useSelector(state => state.uiUser);

    const closeModal = () => {
        dispatch(uiCloseModal());
    }

    const [formValues, setFormValues] = useState(initialState)
    
    useEffect(() => {
       if(update){
           setFormValues(update)
       }else{
           setFormValues(initialState)
       }
    }, [update])
    
    const handleInputChange = ({ target }) => {
      if(target.name === "name") setFormValues({ ...formValues, [target.name]:target.value})
      if(target.name === "email") setFormValues({ ...formValues, [target.name]:target.value, username: target.value.split('@')[0]})
      if(target.name === "role") setFormValues({ ...formValues, [target.name]:target.value})
      if(target.name === "country") setFormValues({ ...formValues, [target.name]:target.value })
      if(target.name === 'position') setFormValues({ ...formValues, [target.name]:target.value })

    }

    const {name, email, country, position, username , role } = formValues;
    
     const user_split = ( email ) ? email.split('@')[0] : ''; 
    

    const handleSubmit = (e) => {
      e.preventDefault();
        
      if(name.length > 0 && country.length > 0 && position.length > 0 && username.length > 0){
            if(validator.isEmail(email)){
                if(role === 'ROOT' || role === 'USER'){
                    dispatch(startUptadeUser(formValues))
                    dispatch(uiCloseModal());
                }else{
                    Swal.fire('Error', 'Ese tipo de usuario no es correcto', 'error')
                }
            }else{
                Swal.fire('Error', 'Correo invalido', 'error')
            }
      }else{
          Swal.fire('Error', 'No puede dejar campos vacios', 'error');
      }
    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            style={customStyles}
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >

            <div className="updateDataBox">
                <div className="form">  
                    <h1 className="title2">Update User</h1>
                     <form className="form-group" onSubmit={ handleSubmit }>\

            {/*----------------------------------------------------- Email -----------------------------------------------------*/}
                        <div className="blockEmail">          
                            <div className="inputgroupblock">
                                <label className="inputtext">Name</label>
                            </div>
                            <div className="inputEmail">
                                <input name="name" placeholder="Name" className="formcontrol" value={name} onChange={ handleInputChange }/>
                            </div>
                        </div>


            {/*----------------------------------------------------- Email -----------------------------------------------------*/}
                        <div className="blockEmail">          
                            <div className="inputgroupblock">
                                <label className="inputtext">Email</label>
                            </div>
                            <div className="inputEmail">
                                <input name="email" placeholder="example@gmail.com" className="formcontrol" value={email} onChange={ handleInputChange }/>
                            </div>
                        </div>
            {/*----------------------------------------------------- Country -----------------------------------------------------*/}            
                        <div className="blockCountry">
                            <div className="inputgroupblock">
                                <label className="inputtext">País</label>
                            </div>
                            <select className="customselect" name="country" onChange={ handleInputChange } value={country}>
                                { contries.map( c => ( <option key={ c }> { c } </option>))}
                            </select>
                        </div>
            {/*----------------------------------------------------- Position -----------------------------------------------------*/}
                        <div className="blockPosition">
                            <div className="inputgroupblock">
                                <label className="inputtext">Cargo</label>
                            </div>
                            <select className="customselect" name="position" onChange={ handleInputChange } value={ position } disabled={true}>
                                { positions.map( p => ( <option key={ p }> { p } </option>))}
                            </select>
                        </div>
            {/*----------------------------------------------------- Username -----------------------------------------------------*/}        
                        <div className="blockUsername">
                            <div className="inputgroupblock"> 
                                <label className="inputtext">Usuario</label>
                            </div>
                            <div className="inputUserBlock">
                                <input type="text" className="formcontrol" placeholder="Username" name="username" value={user_split}  onChange={ handleInputChange } disabled={true}/>
                            </div>
                            <div className="fixedMail2">
                                <span className="fixedText2" id="basic-addon2">@xumak.com</span>
                            </div>
                        </div>

             {/*----------------------------------------------------- Email -----------------------------------------------------*/}
                        <div className="blockEmail">          
                            <div className="inputgroupblock">
                                <label className="inputtext">Role</label>
                            </div>
                            <div className="inputEmail">
                                <input name="role" placeholder="Role" className="formcontrol" value={role} onChange={ handleInputChange }/>
                            </div>
                        </div>
            
            {/*----------------------------------------------------- Buttons Update -----------------------------------------------------*/}
                        <div className="blockButton">
                            <div className="B1"><button className="btn-submit" type="submit"> Update </button></div>
                        </div>
                        
                    </form>
                    
                        <button className="btn-submit B2" onClick={closeModal}> Cancel </button>
                    
                </div>
            </div>
        </Modal>
    )
}
