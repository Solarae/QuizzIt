import {
    GET_QUIZ,
    GET_QUIZ_FAIL,
    QUIZ_LOADING,
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

export const addQuizQuestion = ({ id, question, choices, answer }) => async (dispatch) => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const body = JSON.stringify({ question: { question, choices, answer } })
        console.log(body)
        const res = await axios.post(`${URL}/api/quizzes/${id}/addQuestion`, body, config)

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