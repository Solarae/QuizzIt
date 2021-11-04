import {
    CREATE_AWARD_REQ,
    CREATE_AWARD_SUCCESS,
    CREATE_AWARD_FAIL,
} from '../actions/types'

import axios from 'axios'
import { CLOUDINARY_URL, CLOUDINARY_IMG_URL } from '../config.js'

import { URL } from '../config.js'

export const createAward = ({ userId, title, description, iconImage, platformId, requirementType, requirementCount }) => async (dispatch) => {
    // upload the icon image  
    const formData = new FormData()
    formData.append('file', iconImage)
    formData.append('upload_preset', "jxf92wae")
    let icon = "";
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

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ userId, title, description, icon, platformId, requirementType, requirementCount })
    try {
        dispatch({
            type: CREATE_AWARD_REQ
        });
        const res = await axios.post(`${URL}/api/awards`, body, config);

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
