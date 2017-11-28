import {combineReducers} from 'redux'
import { authReducer as auth } from '../components/utils/OAuth2'

import habitacion from './habitacion-reducer'
import person from './person-reducer'
import theme from './theme-reducer'

let reducer = combineReducers({
    auth: auth,
    theme:theme,
    habitacion: habitacion,
    person: person
    
})

export default reducer               