import {
    GET_QUIZ,
    GET_QUIZ_FAIL,
    QUIZ_LOADING,
    CREATE_QUIZ_REQ,
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_FAIL,
    ADD_QUIZ_QUESTION,
    ADD_QUIZ_QUESTION_FAIL,
    EDIT_QUIZ_QUESTION,
    EDIT_QUIZ_QUESTION_FAIL,
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

export const addQuizQuestion = ({ id, question, choices, answer, callback }) => async (dispatch) => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const body = JSON.stringify({ question: { question, answer } })
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
        callback(res.data.errors)
    } catch (errors) {
        console.log(errors)
    }
}

<<<<<<< HEAD


export const editQuiz = ({ id, name,description }) => async (dispatch) => {
    
=======
export const editQuizQuestion = ({quizId, question}) => async (dispatch) => {
>>>>>>> 6a1704be95371f59765e2433d9a9cbe738d7e09e
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
<<<<<<< HEAD
        const body = JSON.stringify({ name,description })
        console.log(body)
        console.log(id)
        const res = await axios.post(`${URL}/api/quizzes/${id}/editQuiz`, body, config)

        if (res.data.errors) {
            dispatch({
                type: EDIT_QUIZ_FAIL
=======
        const body = JSON.stringify({ quizId, question })
        console.log(body)
        const res = await axios.post(`${URL}/api/quizzes/${quizId}/editQuestion`, body, config)

        if (res.data.errors) {
            dispatch({
                type: EDIT_QUIZ_QUESTION_FAIL
>>>>>>> 6a1704be95371f59765e2433d9a9cbe738d7e09e
            })
        }
        else {
            dispatch({
<<<<<<< HEAD
                type: EDIT_QUIZ,
=======
                type: EDIT_QUIZ_QUESTION,
>>>>>>> 6a1704be95371f59765e2433d9a9cbe738d7e09e
                payload: res.data
            })
        }
    } catch (errors) {
        console.log(errors)
<<<<<<< HEAD
    }
}

// export const editQuizQuestion = NaN
=======
    }    
}
>>>>>>> 6a1704be95371f59765e2433d9a9cbe738d7e09e
// export const deleteQuizQuestion = NaN
// export const editQuiz = NaN

export const setQuizLoading = () => {
    return {
      type: QUIZ_LOADING
    };
};