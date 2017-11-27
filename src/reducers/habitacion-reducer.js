import {
    HABITACION_LIST,
    HABITACION_LIST_FAILURE,
    HABITACION_ADD, HABITACION_UPDATE,
    HABITACION_DELETE
} from '../actions/habitacion-action'

const initialState = {
    list: [],
    data: {},
    error: null
}

const habitacionReducer = (state = initialState, action) => {
    switch (action.type) {
        case HABITACION_LIST:
            return {
                ...state,
                list: action.list,
                error: null
            }
        case HABITACION_LIST_FAILURE: return {
            ...state,
            list: [],
            error: action.error,
        }
        case HABITACION_ADD:
            return {
                ...state,
            }
        case HABITACION_UPDATE:
            return {
                ...state,
            }
        case HABITACION_DELETE:
            const id = action.data
            return {
                ...state,
                list: state.list.filter(item => item.id !== id)
            }
        default:
            return state;
    }
}
export default habitacionReducer