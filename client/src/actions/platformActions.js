import {
    CREATE_PLATFORM_SUCCESS,
    CREATE_PLATFORM_FAIL,
    DELETE_PLATFORM_SUCCESS,
    DELETE_PLATFORM_FAIL,
    JOIN_PLATFORM_SUCCESS,
    JOIN_PLATFORM_FAIL,
    LEAVE_PLATFORM_SUCCESS,
    LEAVE_PLATFORM_FAIL,
    REPORT_PLATFORM_SUCCESS,
    REPORT_PLATFORM_FAIL
} from '../actions/types'

import axios from 'axios'

import { URL } from '../config.js'

export const createPlatform = ({ userId, name, description, history, callback }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ userId, name, description })
    try {
        const res = await axios.post(`${URL}/api/platforms`, body, config);
        if (res.data.errors) {
            dispatch({
                type: CREATE_PLATFORM_FAIL
            })
        }
        else {
            dispatch({
                type: CREATE_PLATFORM_SUCCESS,
                payload: res.data
            })

        }

        // send any request errors to callback function
        callback(res.data.errors);

        // history.push('/platform')
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: CREATE_PLATFORM_FAIL
        })
    }
}