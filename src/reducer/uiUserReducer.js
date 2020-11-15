import { types } from "../types/types";


const initialState = {
    modalOpen: false,
    users: []
}


export const uiUserReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case types.OpenModalUser:
            return{
                ...state,
                modalOpen: true
            }

        case types.CloseModalUser:
            return{
                ...state,
                modalOpen: false
            }
        
        case types.selectUpdateUserCard:
            return{
                ...state,
                update: action.payload
            }

        case types.selectDeleteUserCard:
            return{
                ...state,
                delete: action.payload
            }

        case types.loadUsers:{
            return{
                ...state,
                users: action.payload
            }
        }

        case types.cleandFindUser:
            return{
                ...initialState
            }

        case types.updateUser:
            return{
                ...state,
                users: state.users.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                ),
                update: {}
            }

        case types.deleteUser:
            return{
                ...state,
                users: state.users.filter(
                    e => e.id !== state.delete.id
                ),
                delete:{}
            }

        case types.uiLogoutUser:
            return{
                ...initialState
            }

        default:
            return state;
    }

}