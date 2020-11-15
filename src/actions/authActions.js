import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types"
import { uiLogout } from "./uiDispositiveActions";
import { uiLogoutUser } from "./uiUserActions";

export const startLogin = ( email, password ) => {

    return async(dispatch) =>{

        if(email.includes('@')){
            const resp = await fetchSinToken( 'user/', { email, password }, 'POST' );
            const body = await resp.json();

            if(body.ok){
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch(login( body.uid, body.name ))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
        }else{
            const username = email;
            const resp = await fetchSinToken( 'user/', { username, password }, 'POST' );
            const body = await resp.json();
            
            if(body.ok){
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                localStorage.setItem('role', body.role);
                dispatch(login( body.uid, body.name, body.role ))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
            
        }

    }
}


export const startRegister = ( name, email, password, country, position, username ) => {

        return async(dispatch) => {
            const resp = await fetchSinToken('user/new', { name, email, password, country, position, username}, 'POST');
            const body = await resp.json();
            if(body.ok){
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                localStorage.setItem('role', body.role)
                dispatch(login(body.uid, body.name, body.role))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        }
}

export const startChecking = () => {
    
    return async(dispatch) => {
        const resp = await fetchConToken('user/renew');
        const body = await resp.json();


        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            localStorage.setItem('role', body.role)
            dispatch(login(body.uid, body.name, body.role))
        }else{
            dispatch(checkingFinish())
        }

    }

}

const checkingFinish = () => {
    return { 
        type: types.authChekingFinish
    }
}

const login = (uid, name, role) => {

    return{
        type: types.login,
        payload: {
            uid,
            name,
            role
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout())
        dispatch(uiLogout())
        dispatch(uiLogoutUser());
    }
}

const logout = () => {

    return{
        type: types.logout
    }

}