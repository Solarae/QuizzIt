import {
    CREATE_SUBMISSION,
    CREATE_SUBMISSION_FAIL,
} from '../actions/types'

import axios from 'axios'

import { URL } from '../config.js'

export const makeSubmission = ({ quizId, answers, platformId, userId, timeTaken }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const body = JSON.stringify({ quizId, answers, platformId, userId, timeTaken })
        console.log(body)
        const res = await axios.post(`${URL}/api/submissions/createSubmission`, body, config)

        if (res.data.errors) {
            dispatch({
                type: CREATE_SUBMISSION
            })
        }
        else {
            dispatch({
                type: CREATE_SUBMISSION_FAIL,
                payload: res.data
            })
        }
    } catch (errors) {
        console.log(errors)
    }
}