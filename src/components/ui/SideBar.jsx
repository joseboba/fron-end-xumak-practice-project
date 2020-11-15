import React from 'react'
import { useEffect } from 'react'
import { options, searchDispositive, searchUser } from '../../resources/options/search-options'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { startLogout } from '../../actions/authActions'
import { clearFindUser, searchUserByEmail, searchUserByPosition, searchUserByUsername, uiCreateCSV } from '../../actions/uiUserActions'
import { cleanFindDispositive, seachDispositiveByMAC, searchDisposisitveByType } from '../../actions/uiDispositiveActions'
import { DispositiveCreateModal } from './DispositiveCreateModal'
import '../../styles/components/ui/SideBar.css'
import { UserUpdateModal } from '../update/UserUpdateModal'

export const SideBar = ({history}) => {

    const dispatch = useDispatch()
    const { name } = useSelector(state => state.auth)
    const [formValues, handleInputChange] = useForm({ search_param: '', input_search: '', option: '' })
    const { search_param, input_search, option} = formValues;
   
    const handleLogout = () => { dispatch(startLogout()) }

    useMemo(() => formValues, [formValues])
    
    useEffect(() => {
        if(option === options[1]){
            dispatch(clearFindUser())
        }
        if(option === options[2]){
            dispatch(cleanFindDispositive())
        }
    }, [dispatch, option])

    const handleCreateCSV = () => {
        dispatch(uiCreateCSV())
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`?q=${input_search}`);        
        
        switch (search_param) {

            case searchDispositive[0]: //MAC
                dispatch(seachDispositiveByMAC(history.location.search));
            break;

            case searchDispositive[1]: //Tipo de Dispositivo
                dispatch(searchDisposisitveByType(history.location.search));
            break;

            case searchUser[0]: //Usuairio 
                dispatch(searchUserByUsername(history.location.search));
            break;

            case searchUser[1]: //Cargo
                dispatch(searchUserByPosition(history.location.search))
            break;

            case searchUser[2]: //Email
                dispatch(searchUserByEmail(history.location.search));
            break;

            default:
                return;
        }
    }

    return (
        <>
{/*----------------------------------------------------- MENU -----------------------------------------------------*/}  
            <div className="SideBar">
                <div className="Nav11">
                    <ul>
                        <li className="top">      
                            <span className="username" >{ name }</span> 
                            <button className="btn-logout" onClick={ handleLogout }>Logout</button>               
                        </li>
                        <li className="searchUser">
                            <form onSubmit={ handleSubmit }>
                                <input 
                                    type="text" 
                                    className="textsearch" 
                                    placeholder="Search" 
                                    name="input_search" 
                                    autoComplete="off" 
                                    onChange={ handleInputChange } 
                                    value={ input_search }/>

                            <div className="form">
                                <div className="inputDispositivos">
                                    <select className="custom-select"  placeholder="Opción de búsqueda"  name="option" onChange={ handleInputChange } value={option}>
                                        { options.map( d => ( <option  placeholder="Opción de búsqueda" key={ d }> { d } </option>))}
                                    </select>
                                </div>
                            </div>

                            {
                                (option === '' || option === options[0])
                                ?
                                    <div>

                                    </div>
                                :
                                ( option === 'Dispositivo' )
                                    ? 
                                        <div className="filt">
                                            <label className="namelabel">Busqueda de Dispositivo</label>
                                            <select 
                                                className="fltBox" 
                                                size="4" 
                                                name="search_param" 
                                                onChange = { handleInputChange } 
                                                value={ (!search_param) ? undefined : search_param }>
                
                                                {searchDispositive.map( s  => (<option  className="op"  key={ s }> { s } </option>))}
                                            </select>
                                            <button className="butone" type="submit"> Buscar </button>
                                        </div>
                                    :

                                        <div className="filt">
                                            <label className="namelabel">Busqueda de Usuario</label>
                                            <select 
                                                className="fltBox" 
                                                size="4" 
                                                name="search_param" 
                                                onChange = { handleInputChange } 
                                                value={ (!search_param) ? undefined : search_param }>
                                            
                                                {searchUser.map( s  => (<option  className="op" key={ s }> { s } </option>))}                                                
                                            </select>
                                            <button className="butone" type="submit"> Buscar </button>
                                        </div>      
                            }    
                            <button className="butone" onClick={handleCreateCSV}> Generar CSV </button>
                            </form>                        
                        </li>
                    </ul>
                    <DispositiveCreateModal />
                    <UserUpdateModal />
                </div>
            </div>

            
        </>
    )
}


                            