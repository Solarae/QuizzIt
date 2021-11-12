import {
    CREATE_SUBMISSION,
    CREATE_SUBMISSION_FAIL,
    GET_SUBMISSION_FAIL,
    GET_SUBMISSION_SUCCESS,
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

export const getSubmissions = ({ id }) => async (dispatch) => {

    try {
        console.log(id)
        let body = JSON.stringify({id})
        console.log(body)
        let res = await axios.get(`${URL}/api/submissions/getUserSubmissions/${id}`)

        console.log(res.data)

        if (res.data.errors){
            dispatch({
                type: GET_SUBMISSION_FAIL,
                payload: res.errors
            })
        }
        else{
            dispatch({
                type: GET_SUBMISSION_SUCCESS,
                payload:res.data
            })
        }


    } catch (error) {
        
    }


}