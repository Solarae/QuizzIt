import {
    GET_INBOX_REQ,
    GET_INBOX_SUCCESS,
    GET_INBOX_FAIL,
    RECEIVE_NOTIFICATIONS,
    READ_NOTIFICATION_SUCCESS,
    READ_NOTIFICATION_FAIL,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAIL
} from '../actions/types'

import axios from 'axios'


import { URL } from '../config.js'

axios.defaults.withCredentials = true;

export const editProfile = ({ id, username, email, password, currentPassword, history, callback }) => async (dispatch) => {
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

        // send any request errors to callback function
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

        // send any request errors to callback function
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

export const updateUser = ({ newValue, userId }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ newValue, userId })
    try {
        const res = await axios.post(`${URL}/api/users/update`, body, config);

        if (res.data.errors) {
            dispatch({
                type: EDIT_PROFILE_FAIL,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: EDIT_PROFILE_SUCCESS,
                payload: res.data
            })
        }

    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: EDIT_PROFILE_FAIL
        })
    }
}

export const getInbox = (id, page) => async (dispatch) => {
    const config = {
        params: {
            offset: 5 * (page - 1),
            limit: 5
        }
    }
    dispatch({
        type: GET_INBOX_REQ
    })
    try {
        const res = await axios.get(`${URL}/api/users/${id}/inbox`, config)
        if (res.data.errors) {
            dispatch({
                type: GET_INBOX_FAIL,
                payload: res.data
            })
        } else {
            console.log(res.data)
            dispatch({
                type: GET_INBOX_SUCCESS,
                payload: res.data
            })
        }
    } catch (error) {
        console.log("error message: " + error.message);
    }
}

export const receiveNotifications = (data) => (dispatch) => {
    dispatch({
        type: RECEIVE_NOTIFICATIONS,
        payload: data
    })
}

export const readNotification = (userId, notifId) => async (dispatch) => {
    try {
        const res = await axios.post(`${URL}/api/users/${userId}/inbox/notification/${notifId}/read`)
        
        if (res.data.errors) {
            dispatch({
                type: READ_NOTIFICATION_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: READ_NOTIFICATION_SUCCESS,
                payload: res.data
            })
        }
    } catch (error) {
        console.log(error)
    }
    
}