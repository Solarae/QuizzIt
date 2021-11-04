import {
    GET_QUIZ,
    GET_QUIZ_FAIL,
    QUIZ_LOADING,
    CREATE_QUIZ_REQ,
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_FAIL,
    ADD_QUIZ_QUESTION,
    ADD_QUIZ_QUESTION_FAIL,
} from '../actions/types'

import axios from 'axios'

import { URL } from '../config.js'

export const getQuiz = ( id ) => async (dispatch) => {
    dispatch(setQuizLoading());
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    try {
        const res = await axios.get(`${URL}/api/quizzes/${id}`, config);
        
        dispatch({
            type: GET_QUIZ,
            payload: res.data
        })

    } catch (error) {
        console.log(error.msg)
        dispatch({
            type: GET_QUIZ_FAIL
        })
    }
}

export const createQuiz = ({ userId, name, description, platformId, time }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ userId, name, description, platformId, time })
    try {
        dispatch({
            type: CREATE_QUIZ_REQ
        });
        const res = await axios.post(`${URL}/api/quizzes`, body, config);

        if (res.data.errors) {
            dispatch({
                type: CREATE_QUIZ_FAIL,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: CREATE_QUIZ_SUCCESS,
                payload: res.data
            })
        }

    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: CREATE_QUIZ_FAIL
        })
    }
}

export const addQuizQuestion = ({ id, question, options, answer }) => async (dispatch) => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const body = JSON.stringify({ question, options, answer })
        const res = await axios.post(`${URL}/api/quizzes/${id}/addQuizQuestion`, body, config)

        if (res.data.errors) {
            dispatch({
                type: ADD_QUIZ_QUESTION_FAIL
            })
        }
        else {
            dispatch({
                type: ADD_QUIZ_QUESTION,
                payload: res.data
            })
        }
    } catch (errors) {
        console.log(errors)
    }
}

// export const editQuizQuestion = NaN
// export const deleteQuizQuestion = NaN
// export const editQuiz = NaN

export const setQuizLoading = () => {
    return {
      type: QUIZ_LOADING
    };
};