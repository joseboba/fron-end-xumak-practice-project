import Swal from "sweetalert2"
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"


export const uiOpenModal = () => {
    return { 
        type: types.OpenModalUser
    }
}

export const uiCloseModal = () => {
    return {
        type: types.CloseModalUser
    }
}

export const selectUserUpdateCard = (select) => {
    return{
        type: types.selectUpdateUserCard,
        payload: select[0]
    }
}

export const selectUserDeleteCard = (select) =>{
    return{
        type: types.selectDeleteUserCard,
        payload: select[0]
    }
}

export const searchUserByPosition = (position) => {
    return async(dispatch) => {
        
        try {
            
            const resp = await fetchConToken(`user/search/position${position}`);
            const body = await resp.json();
            
            if(body.ok){
                dispatch(loadUsers(body.users))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }

    }
}

export const searchUserByUsername = (username) => {

    return async(dispatch) => {
        try {
        
            const resp = await fetchConToken(`user/search/username/${username}`);
            const body = await resp.json();

            if(body.ok){
                dispatch(loadUsers(body.users))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }
    }

}

export const searchUserByEmail = (email) => {

    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken(`user/search/email${email}`);
            const body = await resp.json();
            if(body.ok){
                dispatch(loadUsers(body.users))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }

    }


}

const loadUsers = (users) => {
    return { 
        type: types.loadUsers,
        payload: users
    }
}

export const startUptadeUser = (user) => {


    return async(dispatch, getState) => {

        const { id } = getState().uiUser.update;

        const resp = await fetchConToken(`user/${id}`, user, 'PUT');
        const body = await resp.json()

        if(body.ok){
            dispatch(updateUser(body.userUpdate))
            Swal.fire('Actualizado', `Se ha actualizado el usuario${body.userUpdate.name}`, 'success')
        }else{
            Swal.fire('Error', body.msg, 'error')
        }

    }

}

const updateUser = (user) => {
    return{
        type: types.updateUser,
        payload: user
    }
}
const deleteUser = () => {
    return {
        type: types.deleteUser
    }
}

export const startDeleteUser = () => {

    return async(dispatch, getState) => {

        const { id } = getState().uiUser.delete;

        try {

            const resp = await fetchConToken(`user/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if(body.ok){
                Swal.fire('Eliminado', `Se ha eliminado el usuario ${body.userDeleted.name} correctamente`, 'success');
                dispatch(deleteUser());
            }else{
                Swal.fire('Error', body.msg, 'error')
            }
            
        } catch (error) {
            console.log(error)
        }

    }

}

export const clearFindUser = () => {
    return {
        type: types.cleandFindUser
    }
}

export const uiLogoutUser = () => {
    return {
        type: types.uiLogoutUser
    }
}

export const uiCreateCSV = () => {
    return async() => {

        try {
            
            const resp = await fetchConToken('user/csv');
            const body = await resp.json();
            
            if(body.ok){
                Swal.fire('Creado', `Se ha creado el archivo csv en la ruta ${body.path}`, 'success');
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }

    }
}