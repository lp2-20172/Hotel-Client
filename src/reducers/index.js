import {combineReducers} from 'redux'
import { authReducer as auth } from '../components/utils/OAuth2'

import categoria from './categoria-reducer'
import habitacion from './habitacion-reducer'
import theme from './theme-reducer'

let reducer = combineReducers({
    auth: auth,
    theme:theme,
    categoria: categoria,
    habitacion: habitacion,
    
})

export default reducer               