import React from 'react'

import { SideBar } from '../ui/SideBar'
import { DispositivesCards } from './DispositivesCards'
import { useDispatch, useSelector } from 'react-redux'
import { NavBar } from '../ui/NavBar'
import { useEffect } from 'react'
import { startDispositiveLoaded } from '../../actions/uiDispositiveActions'
import { UserCards } from './UserCards'




export const UpdateScreen = ({ history }) => {

    const dispatch = useDispatch()

    const { dispositive } = useSelector(state => state.uiDispositive)
    const { users } = useSelector( state => state.uiUser );
    const { role } = useSelector(state => state.auth)


    useEffect(() => {
        if(role === 'USER'){
            dispatch(startDispositiveLoaded())
        }else{
            return;
        }
    }, [dispatch, role])

    return (
        <>
            {   (role === 'USER') && <NavBar /> }
            {   (role === 'ROOT') &&  <SideBar  history={ history } />}                
            {
                (dispositive) &&
                (dispositive.length > 0) &&
                    dispositive.map(find => ( <DispositivesCards key={ find.MAC } { ...find }/>))   
            }
            {
                (users) &&
                (users.length > 0) &&
                    users.map( find =>  ( <UserCards key={ find.email } {...find}/> ))
            }

        </>
    )
}

