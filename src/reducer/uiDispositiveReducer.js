import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    dispositive: []
}


export const uiDispositiveReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.openModalDispositive:
            return{
                ...state,
                modalOpen: true
            }
        
        case types.closeModalDispositiove:
            return{
                ...state,
                modalOpen: false
            }

        case types.selectUpdateCard:
            return{
                ...state,
                update: action.payload
            } 

        case types.selectDeleteCard:
            return{
                ...state,
                delete: action.payload
            } 
        
        case types.createDispositive:
            return{
                ...state,
                dispositive: [
                    ...state.dispositive,
                    action.payload
                ]
            }

        case types.loadDispositives: 
            return{
                ...state,
                dispositive: action.payload
            }
        
    
        case types.dispositiveUpdate: 
            return {
                ...state,
                dispositive: state.dispositive.map(
                    e => ( e.id === action.payload.id) ? action.payload : e
                ),
                update: {}
            }
            

        case types.dispositiveDelete: 
            return {
                ...state,
                dispositive: state.dispositive.filter(
                    e => e.id !== state.delete.id
                ),
                delete: {}
            }
        

        case types.uiLogout:
            return {
                ...initialState
            }

        case types.cleanFindDispositive:
            return{
                ...initialState
            }

        default:
            return state;
    }

}