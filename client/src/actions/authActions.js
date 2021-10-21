import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT_SUCCESS, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL 
} from '../actions/types'

import axios from 'axios'

const URL = 'http://localhost:5000'

export const login = ({ email, password, history, callback }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify({ email, password })
    try {
        const res = await axios.post(`${URL}/api/users/signin`, body, config)
        dispatch ({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        callback();
        history.push('/')
    } catch (error) {
        console.log(error.message)
        dispatch ({
            type: LOGIN_FAIL
        })
    }
}

export const signup = ({ username, email, password, history, callback }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username, email, password })
    try {
        const res = await axios.post(`${URL}/api/users/signup`, body, config)
        dispatch ({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        callback();
        history.push('/')
    } catch (error) {
        console.log(error.msg)
        dispatch ({
            type: REGISTER_FAIL
        })
    }
}

export const logout = (history) => async (dispatch) => {
    dispatch ({
        type: LOGOUT_SUCCESS
    })
    history.push('/')
}

export const tokenConfig = (getState) => {
    const token = getState().auth.token

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    if (token) config.headers['x-auth-token'] = token
    
    return config
}