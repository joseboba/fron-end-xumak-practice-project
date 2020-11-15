import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch'
import { types } from '../types/types'

//DISPOSITIVE
export const startCreateDispositive = (dispositive) => {
    return async(dispatch) => {

        const { type ,personal, MAC } = dispositive;
        
        try {
            
            if(personal){
                const resp = await fetchConToken('device', { type, personal: true, MAC }, 'POST');
                const body = await resp.json();
                dispositive.id = body.device.id;
                dispositive.ip = body.device.ip;
                if(body.ok){
                    dispatch(createDispositive(dispositive));
                }else{
                    Swal.fire('Error', body.msg, 'error')
                }

            }else{
                const resp = await fetchConToken('device', { type, personal: false , MAC }, 'POST');
                const body = await resp.json();

                if(body.ok){
                    dispatch(createDispositive(dispositive));
                }else{
                    Swal.fire('Error', body.msg, 'error')
                }

            }



        } catch (error) {
            console.log(error)
        }
        
    }
}

const createDispositive = (dispositive) =>{
    return{
        type: types.createDispositive,
        payload: dispositive
    }

}

export const startDispositiveLoaded = () => {
    return async(dispatch, getState) => {

        const uid = getState().auth.uid;

        try {
            
            const resp = await fetchConToken(`user/devices/${ uid }`);
            const { device } = await resp.json();
            dispatch(findDispositive(device))

        } catch (error) {
            console.log(error)
        }

    }
}

export const seachDispositiveByMAC = (MAC) => {

    return async(dispatch) =>{ 

        try {
            
            const resp = await fetchConToken(`device/search/MAC${MAC}`)
            const body = await resp.json();
            console.log(body)
            if(body.ok){
                dispatch(findDispositive(body.dispositives))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }

    }

}

export const searchDisposisitveByType = (type) => {

    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken(`device/search/type${type}`);
            const body = await resp.json();

            if(body.ok){
                dispatch(findDispositive(body.dispositives))
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }


    }

}


const findDispositive = (dispositive) => {
    return{
        type: types.loadDispositives,
        payload: dispositive
    }
}

export const startUpdateDispositive = ( dispositive ) => {

    return async(dispatch, getState) => {

        const { type ,personal, MAC } = dispositive;

        try {
            const { id } = getState().uiDispositive.update;

            if(personal){
                const resp = await fetchConToken(`device/${id}`, { type, personal: true , MAC}, 'PUT');
                const body = await resp.json();
                dispositive.id = id;
                dispositive.ip = body.updateDevice.ip;
                console.log(body)
                if(body.ok){
                    dispatch(dispositiveUpdate(dispositive))
                }else{
                    Swal.fire('Error', body.msg, 'error')
                }
            }else{
                const resp = await fetchConToken(`device/${id}`, { type, personal: false , MAC}, 'PUT');
                const body = await resp.json();
                dispositive.id = id;
                dispositive.ip = body.updateDevice.ip;
                if(body.ok){
                    dispatch(dispositiveUpdate(dispositive))
                }else{
                    Swal.fire('Error', body.msg, 'error')
                }
            }
            
        } catch (error) {
            console.log(error)
        }

    }

}

const dispositiveUpdate = ( dispositive ) => {
    return {
        type: types.dispositiveUpdate,
        payload: dispositive
    }
}

export const startDeleteDispositive = () => {

    return async(dispatch, getState) => {

        try {
            
            const { id } = getState().uiDispositive.delete;
            
            const resp = await fetchConToken(`device/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if(body.ok){
                Swal.fire('Eliminado', `El dispositivo ${ body.deleteDispositive.MAC } fue eliminado`, 'success');
                dispatch(deleteDispositive())
            }else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }

}

const deleteDispositive = () => {
    return { 
        type: types.dispositiveDelete
    }
}

export const uiLogout = () => {
    return{
        type: types.uiLogout
    }
}

export const selectUpdateCard = (select) => {
    return{
        type: types.selectUpdateCard,
        payload: select[0]
    }
}

export const selectDeleteCard = (select) => {
    return{
        type: types.selectDeleteCard,
        payload: select[0]
    }
}

export const uiOpenCreateModal = () => {
    return {
        type: types.openModalDispositive
    }
}

export const uiCloseCreateModal = () => {
    return { 
        type: types.closeModalDispositiove
    }
}

export const cleanFindDispositive = () => {
    return {
        type: types.cleanFindDispositive
    }
}