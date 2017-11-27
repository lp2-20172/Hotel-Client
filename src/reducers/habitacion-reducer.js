import { HABITACION_LIST_REQUEST, HABITACION_LIST_SUCCESS, HABITACION_LIST_FAILURE } from '../actions/habitacion-action'
import { HABITACION_ADD, HABITACION_FETCH, HABITACION_UPDATE } from '../actions/habitacion-action'

const initialState = {
    list: [],
    data: {}
}

const habitacionReducer = (state = initialState, action) => {
    switch (action.type) {

        case HABITACION_LIST_REQUEST: return {
            ...state,
            list: [],
            error: null
        }
        case HABITACION_LIST_SUCCESS: return {
            ...state,
            list: action.list,
            error: null
        }
        case HABITACION_LIST_FAILURE: return {
            ...state,
            list: [],
            error: action.error,
        }
        
        default: return state
    }





}

export default habitacionReducer
