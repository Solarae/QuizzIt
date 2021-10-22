import {
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL
} from '../actions/types'

import axios from 'axios'

import { URL } from '../config.js'

export const editProfile = ({ id, username, email, password, history}) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ id, username, email, password })
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
        console.log(res.data)
        history.push('/profile')
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: EDIT_PROFILE_FAIL 
        })
    }
}