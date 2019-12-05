import * as types from '../types'
import {API} from '../host'
import axios from 'axios'

export const handleGetHome = () => ({
    type: types.GET_PARIWISATA,
    payload: axios({
        method: 'get',
        url: `${API}`
    })
});