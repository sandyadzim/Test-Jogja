import * as types from '../types'

const initialState = {
    pariwisata:[]
}

export default function reducerRegister(state = initialState, action){
    switch (action.type){
        case `${types.GET_PARIWISATA}_PENDING`:
        return {
            ...state
        }
        case `${types.GET_PARIWISATA}_FULFILLED`:
        return {
            ...state,
            pariwisata : action.payload.data
        }
        case `${types.GET_PARIWISATA}_REJECTED`:
        return {
            ...state
        }
        default:
        return state;
    }
}