import { SET_ALERT, REMOVE_ALERT } from "../actions/types"

const initialState = [] // * this will be an array of objects

export default function (state = initialState, action){
    const { type, payload } = action

    switch (type) {
        case 'SET_ALERT':
            return [...state, payload] //* payload contains .message and .id
        case 'REMOVE_ALERT':
            return state.filter(alert => alert.id !== payload)
        default:
            return state;
    }
}