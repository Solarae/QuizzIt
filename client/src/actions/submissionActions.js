import {
    CREATE_SUBMISSION,
    CREATE_SUBMISSION_FAIL,
    GET_ONE_SUBMISSION_FAIL,
    GET_ONE_SUBMISSION_SUCCESS,
    GET_SUBMISSION_REQ, 
    GET_SUBMISSION_FAIL,
    GET_SUBMISSION_SUCCESS,
    GET_SUBMISSIONS_REQ,
    GET_SUBMISSIONS_SUCCESS,
    GET_SUBMISSIONS_FAIL,
} from '../actions/types'

import axios from 'axios'
import { URL } from '../config.js'

axios.defaults.withCredentials = true;

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

export const getSubmissions = (query) => async (dispatch) => {
    const config = {
        params: {
            ...query
        }
    }

    try {
        dispatch({
            type: GET_SUBMISSIONS_REQ
        });

        const res = await axios.get(`${URL}/api/submissions/`, config)

        console.log(res.data)
        if (res.data.errors){
            dispatch({
                type: GET_SUBMISSIONS_FAIL,
                payload: res.errors
            })
        }
        else {
            dispatch({
                type: GET_SUBMISSIONS_SUCCESS,
                payload:res.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}


export const getSubmission = ( {id, query} ) => async (dispatch) => {
    const config = {
        params: {
            ...query
        }
    }

    try {
        dispatch({
            type: GET_SUBMISSION_REQ
        });

        const res = await axios.get(`${URL}/api/submissions/${id}`, config)

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
                payload: res.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}