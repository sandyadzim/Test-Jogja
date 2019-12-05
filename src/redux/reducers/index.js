import { combineReducers } from 'redux'
import { createNavigationReducer } from 'react-navigation-redux-helpers'

import SwitchNav from '../../navigation/RootNav'
import reducerLogin from './../reducers/reducerLogin'
import reducerRegister from './../reducers/reducerRegister'
import reducerHome from './reducerHome'


const reduceRouter = createNavigationReducer(SwitchNav)

const appReducer = combineReducers({
    router: reduceRouter,
    login: reducerLogin,
    register: reducerRegister,
    pariwisata : reducerHome
})

export default appReducer