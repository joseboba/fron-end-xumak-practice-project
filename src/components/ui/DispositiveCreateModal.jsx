import React from 'react'
import Modal from 'react-modal'
import Swal from 'sweetalert2';
import validator from 'validator'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUpdateCard, startCreateDispositive, startUpdateDispositive, uiCloseCreateModal } from '../../actions/uiDispositiveActions';
import { dispositives } from '../../resources/options/register-options';
import { useEffect } from 'react';
import '../../styles/components/ui/DispositiveModal.css'

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

const initState = {
    type: '',
    personal: false,
    no_personal: false,
    MAC: ''
}


export const DispositiveCreateModal = () => {

    const dispatch = useDispatch()
    const { update } = useSelector(state => state.uiDispositive)
    const { modalOpen } = useSelector(state => state.uiDispositive)
    const [formValues, setFormValues] = useState(initState)
    
    const { type, personal, no_personal, MAC } = formValues;
    
    useEffect(() => {
        if(update){
            if(update.personal){
                setFormValues({ type: update.type, personal: true, no_personal: false, MAC: update.MAC })
            }else{
                setFormValues({ type: update.type, personal: false, no_personal: true, MAC: update.MAC })
            }
        }else{
            setFormValues(initState)
        }
    }, [update])
    
    const closeModal = () => {
        dispatch(uiCloseCreateModal())
        setFormValues(initState)
        dispatch(selectUpdateCard({}))
    }
    const handleInputChange = ({ target }) => {
        
        const isOk = document.getElementsByName('personal')[0].checked;
        const isFalse = document.getElementsByName('no_personal')[0].checked;
        
        (target.name === 'personal') ? setFormValues({ ...formValues, [target.name]:isOk }) : setFormValues({ ...formValues, [target.name]:isFalse })
        if(target.name === 'type') setFormValues({ ...formValues, [target.name]:target.value })
        if(target.name === 'MAC') setFormValues({ ...formValues, [target.name]:target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if((type && (MAC && validator.isMACAddress(MAC)) && (personal || no_personal))){
            if(update){
                dispatch(startUpdateDispositive(formValues))
                Swal.fire('Registro actualizado', 'Se han hecho los cambios', 'success')
                closeModal();
            }else{
                dispatch(startCreateDispositive(formValues))
                Swal.fire('Registro guardado', 'Se ha guardado', 'success')
                closeModal();
            }
        }else{
            Swal.fire('Error', 'No puede dejar campos vacios o algun valor no es válido', 'error')
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
                    <h1 className="title2"> Save Dispositive </h1>
                    <form className="form-group" onSubmit={ handleSubmit }>

                        {/* Tipo de dispositivo */}
                        <div className="blockDevices">
                            <div className="inputgroupblock">
                                <label className="inputtext"> Dispositives </label>
                            </div>

                            <select
                                className="customselect"
                                name="type" 
                                onChange={handleInputChange}
                                value={ type }
                            >
                                { dispositives.map(d => (<option key={ d }> { d } </option>)) }
                            </select>
                        </div>

                        {/* Dispositivo Personal */}

                        <div className="blockDevicesPersonal">
                            <div className="inputgroupblock11">
                                <label className="inputtext">Dispositivo Personal</label>
                            </div>

                            <div className="rdB">

                                <div className="Opcion1">
                                    <input 
                                        className="form-check-input"
                                        type="checkbox"
                                        name="personal"
                                        onChange={ handleInputChange }
                                        value={ personal }
                                        disabled={(no_personal) ? true : false}
                                        checked={personal}
                                    />
                                    <label className="form-check-label label-color"> Si </label>
                                </div>

                                <div className="Opcion2">
                                        <input 
                                            className="form-input-check"
                                            type="checkbox"
                                            name="no_personal"
                                            onChange={ handleInputChange }
                                            value={ no_personal }
                                            disabled={(personal) ? true : false}
                                            checked={no_personal}
                                        />

                                        <label className="form-check-label label-color"> No </label>
                                </div>

                            </div>

                        </div>

                        {/* MAC */}

                        <div className="blockMac">
                            <div className="inputgroupblock">
                                <label className="inputtext">Dirección MAC</label>
                            </div>  
                            <div className="divMac">
                                <input 
                                    type="text"
                                    autoComplete="off"
                                    className="formcontrol" 
                                    placeholder="MAC Direction" 
                                    name="MAC"
                                    onChange={ handleInputChange }
                                    value={MAC}
                                />
                            </div>
                        </div>

                        {/* Boton */}
                        <div className="blockButton">
                            <div className="B1"><button className="btn-submit" type="submit"> Guardar </button></div>
                        </div>

                    </form>
                </div>
            </div>
            
        </Modal>
    )
}
