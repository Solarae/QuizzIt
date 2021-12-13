import {
    CREATE_AWARD_REQ,
    CREATE_AWARD_SUCCESS,
    CREATE_AWARD_FAIL,
    EDIT_AWARD_REQ,
    EDIT_AWARD_SUCCESS,
    EDIT_AWARD_FAIL,
    DELETE_AWARD_REQ,
    DELETE_AWARD_SUCCESS,
    DELETE_AWARD_FAIL,
    GET_AWARDS_REQ,
    GET_AWARDS_SUCCESS,
    GET_AWARDS_FAIL,
    SET_AWARD_PAGE
} from '../actions/types'

import axios from 'axios'

import { CLOUDINARY_URL, CLOUDINARY_IMG_URL } from '../config.js'

import { URL } from '../config.js'

axios.defaults.withCredentials = true;

export const createAward = ({ userId, title, description, iconImage, platformId, requirementType, requirementCount }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('image', iconImage)
    formData.append('platformId', platformId)
    formData.append('requirementType', requirementType)
    formData.append('requirementCount', requirementCount)

    try {
        dispatch({
            type: CREATE_AWARD_REQ
        });
        const res = await axios.post(`${URL}/api/awards`, formData, config);

        if (res.data.errors) {
            dispatch({
                type: CREATE_AWARD_FAIL,
                payload: res.data
            })
        }
        else {
            console.log(res.data)
            dispatch({
                type: CREATE_AWARD_SUCCESS,
                payload: res.data
            })
        }

    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: CREATE_AWARD_FAIL
        })
    }
}


export const editAward = ({ awardId, userId, title, description, iconImage, requirementType, requirementCount }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('image', iconImage)
    formData.append('requirementType', requirementType)
    formData.append('requirementCount', requirementCount)

    try {
        dispatch({
            type: EDIT_AWARD_REQ
        });
        const res = await axios.post(`${URL}/api/awards/${awardId}/update`, formData, config);

        console.log(res.data)
        dispatch({
            type: EDIT_AWARD_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: EDIT_AWARD_FAIL,
            payload: error.response.data
        })
    }
}

export const deleteAward = ({ userId, awardId }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            'userId': userId
        }
    }

    try {
        dispatch({
            type: DELETE_AWARD_REQ
        });
        const res = await axios.delete(`${URL}/api/awards/${awardId}`, config);

        console.log(res.data)
        if (res.data.errors) {
            dispatch({
                type: DELETE_AWARD_FAIL,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: DELETE_AWARD_SUCCESS,
                payload: res.data
            })
        }

    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: DELETE_AWARD_FAIL
        })
    }
}

export const getAwards = (query) => async (dispatch) => {
    const config = {
        params: {
            ...query
        }
    }

    console.log(query)
    try {
        dispatch({
            type: GET_AWARDS_REQ
        })
        const res = await axios.get(`${URL}/api/awards`, config)
        console.log(res.data)
        dispatch({
            type: GET_AWARDS_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: GET_AWARDS_FAIL,
            payload: {...error.response.data, awards: []}
        })
    }
}

export const setAwardPage = (page) => (dispatch) => {
    dispatch({
        type: SET_AWARD_PAGE,
        payload: { awardPage: page }
    })
}