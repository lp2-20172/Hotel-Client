import {
    RESERVA_LIST,
    RESERVA_LIST_FAILURE,
    RESERVA_ADD, RESERVA_UPDATE,
    RESERVA_DELETE
} from '../actions/reserva-action'

const initialState = {
    list: [],
    data: {},
    error: null
}

const reservaReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESERVA_LIST:
            return {
                ...state,
                list: action.list,
                error: null
            }
        case RESERVA_LIST_FAILURE: return {
            ...state,
            list: [],
            error: action.error,
        }
        case RESERVA_ADD:
            return {
                ...state,
            }
        case RESERVA_UPDATE:
            return {
                ...state,
            }
        case RESERVA_DELETE:
            const id = action.data
            return {
                ...state,
                list: state.list.filter(item => item.id !== id)
            }
        default:
            return state;
    }
}
export default reservaReducer