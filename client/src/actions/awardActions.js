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
    // upload the icon image  
    let icon = null;
    if (iconImage) {
        const formData = new FormData();
        formData.append('file', iconImage)
        formData.append('upload_preset', "jxf92wae")
        try {
            const res = await axios.post(CLOUDINARY_URL, formData);
            const version = res.data.version
            const public_id = res.data.public_id
            icon = `${CLOUDINARY_IMG_URL}/v${version}/${public_id}.png`
        } catch (error) {
            console.log(error)
            dispatch({
                type: CREATE_AWARD_FAIL
            })
        }
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const newValue = icon ?
        {
            title: title,
            description: description,
            icon: icon,
            requirementType: requirementType,
            requirementCount: requirementCount
        } :
        {
            title: title,
            description: description,
            requirementType: requirementType,
            requirementCount: requirementCount
        }
    const body = JSON.stringify({ newValue, userId })
    try {
        dispatch({
            type: EDIT_AWARD_REQ
        });
        const res = await axios.post(`${URL}/api/awards/${awardId}/update`, body, config);

        if (res.data.errors) {
            dispatch({
                type: EDIT_AWARD_FAIL,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: EDIT_AWARD_SUCCESS,
                payload: res.data
            })
        }

    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: EDIT_AWARD_FAIL
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
            payload: error.response.data
        })
    }
}

export const setAwardPage = (page) => (dispatch) => {
    dispatch({
        type: SET_AWARD_PAGE,
        payload: { awardPage: page }
    })
}