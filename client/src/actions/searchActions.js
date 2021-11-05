import {
    SEARCH_PLATFORM_REQ,
    SEARCH_PLATFORM_SUCCESS,
    SEARCH_PLATFORM_FAIL,
    SEARCH_QUIZ_REQ,
    SEARCH_QUIZ_SUCCESS,
    SEARCH_QUIZ_FAIL
} from '../actions/types'

import axios from 'axios'

import { URL } from '../config.js'

export const searchPlatform = ({ query }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            ...query
        }
    }
    try {
        dispatch({
            type: SEARCH_PLATFORM_REQ
        });
        const res = await axios.get(`${URL}/api/platforms/`, config);

        if (res.data.errors) {
            dispatch({
                type: SEARCH_PLATFORM_FAIL,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: SEARCH_PLATFORM_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: SEARCH_PLATFORM_FAIL
        })
    }
}

export const searchQuiz = ({ query }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            ...query
        }
    }
    try {
        dispatch({
            type: SEARCH_QUIZ_REQ
        });
        const res = await axios.get(`${URL}/api/quizzes/`, config);

        if (res.data.errors) {
            dispatch({
                type: SEARCH_QUIZ_FAIL,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: SEARCH_QUIZ_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: SEARCH_QUIZ_FAIL
        })
    }
}