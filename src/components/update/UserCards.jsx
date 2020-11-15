import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserDeleteCard, selectUserUpdateCard, startDeleteUser, uiOpenModal } from '../../actions/uiUserActions';
import '../../styles/components/update/Cards.css'

export const UserCards = ({ name, username, email }) => {

    const dispatch = useDispatch();
    const { users } = useSelector(state => state.uiUser);
    const select = users.filter( find => find.email === email )

    const handleEdit = () => {
        dispatch( uiOpenModal() )
        dispatch( selectUserUpdateCard(select) )
    }

    const handleDelete = () => {
        dispatch( selectUserDeleteCard(select) )
        dispatch( startDeleteUser() )
    }

    return (
        <>
            <div className="divCards">
                <div className="cards">
                    <div className="card">
                        <div className="card-body">
                            {/* DATA */}
                            <h5 className="card-title">{ `Edite al usuario` }</h5>
                            <p className="card-text">{ `${name}` }</p>
                            <p className="card-text">{ `${username} - ${email}` }</p>
                            {/* BUTTONS */}
                            <div className="tmB"><button  className="btn btn-primary" onClick={ handleEdit }>Edit</button></div>
                            <div className="tmB"><button  className="btn btn-danger" onClick={ handleDelete }>Delete</button></div>
                        </div>
                    </div> 
                </div>
            </div>
        </>
    )
}
