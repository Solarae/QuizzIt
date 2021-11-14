import {
    GET_SIGNED_IN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types'

import axios from 'axios'


import { URL } from '../config.js'

axios.defaults.withCredentials = true;

export const login = ({ username, password, history, callback }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, password })
    try {
        const res = await axios.post(`${URL}/api/auth/signin`, body, config)

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

export const getSignedIn = () => async (dispatch) => {
    try {
        await axios.get(`${URL}/api/auth/signedIn`)
        dispatch({
            type: GET_SIGNED_IN
        })
    } catch (error) {
        
    }
}

export const tokenLogin = ({ token }) => async (dispatch) => {
    if (!token) {
        dispatch({
            type: LOGIN_FAIL
        })
    }

    // do a new login request to get updated user and generate a new token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ userToken: token })
    try {
        const res = await axios.post(`${URL}/api/auth/tokenSignin`, body, config)

        if (res.data.errors) {
            // route user to home page
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
        const res = await axios.post(`${URL}/api/auth/signup`, body, config);
        
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
    try {
        await axios.get(`${URL}/api/auth/signin`)
        dispatch({
            type: LOGOUT_SUCCESS
        })
        history.push('/')
    } catch (error) {
        
    }
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