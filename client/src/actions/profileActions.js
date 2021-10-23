import {
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAIL
} from '../actions/types'

import axios from 'axios'

import { URL } from '../config.js'

export const editProfile = ({ id, username, email, password, currentPassword, history, callback}) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ id, username, email, password, currentPassword })
    try {
        const res = await axios.post(`${URL}/api/users/edit`, body, config)
        if (res.data.errors) {
            dispatch({
                type: EDIT_PROFILE_FAIL
            })
        }
        else {
            dispatch({
                type: EDIT_PROFILE_SUCCESS,
                payload: res.data
            })

        }
        callback(res.data.errors);
        history.push('/profile')
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: EDIT_PROFILE_FAIL
        })
    }
}

export const deleteProfile = ({ id, password, history, callback }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ id, password })
    try {
        const res = await axios.post(`${URL}/api/users/delete`, body, config)
        if (res.data.errors) {
            dispatch({
                type: DELETE_PROFILE_FAIL
            })
        }
        else {
            dispatch({
                type: DELETE_PROFILE_SUCCESS,
                payload: res.data
            })

        }

        callback(res.data.errors);

        // redirect to home page if no errors 
        if (!res.data.errors) {
            history.push('/');
        }
    } catch (error) {
        dispatch({
            type: DELETE_PROFILE_FAIL
        })
    }
}