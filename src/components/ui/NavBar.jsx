import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/authActions';
import { uiOpenCreateModal } from '../../actions/uiDispositiveActions';
import { DispositiveCreateModal } from './DispositiveCreateModal';
import '../../styles/components/ui/NavBar.css'

export const NavBar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);

    const handleLogout = () => { dispatch(startLogout()) }
    const handleOpenModal = () => { dispatch(uiOpenCreateModal()) }

    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <small className="navbar-brand">{ name }</small>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="buttonP1">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <button className="nav-link" onClick={ handleLogout }> Logout </button>
                            <button className="nav-link" onClick={ handleOpenModal }> Asignar Dispositivo </button>
                        </div>
                    </div>
                </div>
                <DispositiveCreateModal />
            </nav>
    )
}
