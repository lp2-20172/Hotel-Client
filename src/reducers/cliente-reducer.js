import {
    CLIENTE_LIST,
    CLIENTE_LIST_FAILURE,
    CLIENTE_ADD, CLIENTE_UPDATE,
    CLIENTE_DELETE
} from '../actions/cliente-action'

const initialState = {
    list: [],
    data: {},
    error: null
}

const clienteReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLIENTE_LIST:
            return {
                ...state,
                list: action.list,
                error: null
            }
        case CLIENTE_LIST_FAILURE: return {
            ...state,
            list: [],
            error: action.error,
        }
        case CLIENTE_ADD:
            return {
                ...state,
            }
        case CLIENTE_UPDATE:
            return {
                ...state,
            }
        case CLIENTE_DELETE:
            const id = action.data
            return {
                ...state,
                list: state.list.filter(item => item.id !== id)
            }
        default:
            return state;
    }
}
export default clienteReducer
