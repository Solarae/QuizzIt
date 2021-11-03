import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types'

import axios from 'axios'

import { URL } from '../config.js'

export const login = ({ username, password, history, callback }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, password })
    try {
        const res = await axios.post(`${URL}/api/users/signin`, body, config)

        if (res.data.errors) {
            dispatch({
                type: LOGIN_FAIL
            })
        }
        else {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })

        }
        console.log(res.data)
        callback(res.data.errors);
    } catch (error) {
        console.log(error.message)
        dispatch({
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
        const res = await axios.post(`${URL}/api/users/signup`, body, config);
        
        if (res.data.errors) {
            dispatch({
                type: REGISTER_FAIL
            })
        }
        else{
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        }
        console.log(res.data)
        callback(res.data.errors);
        history.push('/')
    } catch (error) {
        console.log(error.msg)
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const logout = (history) => async (dispatch) => {
    dispatch({
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