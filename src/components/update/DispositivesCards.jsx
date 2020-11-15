import React  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectDeleteCard, selectUpdateCard, startDeleteDispositive, uiOpenCreateModal } from '../../actions/uiDispositiveActions';
import '../../styles/components/update/CardsDP.css'


export const DispositivesCards = ({ type, MAC} ) => {

    const dispatch = useDispatch()
    const { dispositive } = useSelector(state => state.uiDispositive)
    let select = dispositive.filter( find  => find.MAC === MAC);

    const handleEdit  = () => { 
        dispatch(uiOpenCreateModal())
        dispatch(selectUpdateCard(select))   
    }

    const handleDelete = () => {
        dispatch(selectDeleteCard(select))
        dispatch(startDeleteDispositive())
    }

    return (
        <>
            <div className="divCards">
                    <div className="card">
                        <div className="card-body">
                            {/* DATA */}
                            <h5 className="card-title">{ `Edite su dispositivo` }</h5>
                            <p className="card-text">{ `${type}` }</p>
                            <p className="card-text">{ `${MAC}` }</p>
                            {/* BUTTONS */}
                            <div className="tmB"><button  className="btn btn-primary" onClick={handleEdit}>Edit</button></div>
                            <div className="tmB"><button  className="btn btn-danger" onClick={ handleDelete }>Delete</button></div>
                        </div>
                    </div> 
            </div>
        </>
    )
}
