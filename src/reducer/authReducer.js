import { types } from "../types/types";

const initialState = { checking: true }


export const authReducer = ( state = initialState, aciton ) => {

    switch (aciton.type) {
        case types.login:
            return {
                ...state,
                ...aciton.payload, 
                checking: false,
            }
        
        case types.logout:
            return { 
                checking: false
            }

        case types.authChekingFinish:
            return{
                ...state,
                checking: false
            }
        
    
        default:
            return state;
    }

}