import * as types from '../types'
import axios from 'axios'
import {API2} from '../host'

export const handleLogin = (email, password) => ({
    type: types.LOGIN,
    payload: axios({
        method: 'POST',
        url: `${API2}/login`,
        data:{
            email: email,
            password: password
        }
    }),
})