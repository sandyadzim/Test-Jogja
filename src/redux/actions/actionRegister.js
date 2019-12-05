import * as types from '../types'
import axios from 'axios'
import {API2} from '../host'

export const handleRegister = (name, email, password) => ({
    type: types.REGISTER,
    payload: axios({
        method: 'POST',
        url: `${API2}/register`,
        data: {
            name:name,
            email:email,
            password:password
        }
    })
})