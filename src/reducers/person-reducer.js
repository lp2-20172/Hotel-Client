import {
    PERSON_LIST,
    PERSON_LIST_FAILURE,
    PERSON_ADD, PERSON_UPDATE,
    PERSON_DELETE
} from '../actions/person-action'
//import { CATEGORIA_FETCH,  } from '../actions/categoria-action'

const initialState = {
    list: [],
    data: {},
    error: null
}

const personReducer = (state = initialState, action) => {
    switch (action.type) {
        case PERSON_LIST:
            return {
                ...state,
                list: action.list,
                error: null
            }
        case PERSON_LIST_FAILURE: return {
            ...state,
            list: [],
            error: action.error,
        }
        case PERSON_ADD:
            return {
                ...state,
            }
        /*
    case CATEGORIA_FETCH:
        return {
            ...state,
            data: action.data
        }*/
        case PERSON_UPDATE:
            return {
                ...state,
            }
        case PERSON_DELETE:
            const id = action.data
            return {
                ...state,
                list: state.list.filter(item => item.id !== id)
            }
        default:
            return state;
    }
}
export default personReducer