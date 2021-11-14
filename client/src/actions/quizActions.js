import {
    GET_QUIZ,
    GET_QUIZ_FAIL,
    QUIZ_LOADING,
    CREATE_QUIZ_REQ,
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_FAIL,
    ADD_QUIZ_QUESTION,
    ADD_QUIZ_QUESTION_FAIL,
    EDIT_QUIZ,
    EDIT_QUIZ_FAIL,
    DELETE_QUIZ,
    DELETE_QUIZ_FAIL,
    EDIT_QUIZ_QUESTION,
    EDIT_QUIZ_QUESTION_FAIL,
    UPVOTE_QUIZ,
    UPVOTE_QUIZ_FAIL,
    DOWNVOTE_QUIZ,
    DOWNVOTE_QUIZ_FAIL,
    REPORT_QUIZ,
    REPORT_QUIZ_FAIL,
    EDIT_PROFILE_SUCCESS,
} from '../actions/types'

import axios from 'axios'

import { URL } from '../config.js'

export const getQuiz = (id) => async (dispatch) => {
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
        callback(res.data.errors)
    } catch (errors) {
        console.log(errors)
    }
}

export const editQuiz = ({ id, name,description }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const body = JSON.stringify({ name,description })
        console.log(body)
        console.log(id)
        const res = await axios.post(`${URL}/api/quizzes/${id}/editQuiz`, body, config)

        if (res.data.errors) {
            dispatch({
                type: EDIT_QUIZ_FAIL
            })
        }
        else {
            dispatch({
                type: EDIT_QUIZ,
                payload: res.data
            })
        }
    } catch (errors) {
        console.log(errors)
    }
}

export const deleteQuiz = ({ id }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    console.log(id)
    try {
        const res = await axios.delete(`${URL}/api/quizzes/${id}`, config)

        if (res.data.errors) {
            dispatch({
                type: DELETE_QUIZ_FAIL
            })
        }
        else {
            dispatch({
                type: DELETE_QUIZ,
                payload: res.data
            })
        }
    } catch (errors) {
        console.log(errors)
    }
}

export const editQuizQuestion = ({id, question, callback}) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const body = JSON.stringify({ id, question })
        console.log(body)
        const res = await axios.post(`${URL}/api/quizzes/${id}/editQuizQuestion`, body, config)

        if (res.data.errors) {
            dispatch({
                type: EDIT_QUIZ_QUESTION_FAIL
            })
        }
        else {
            dispatch({
                type: EDIT_QUIZ_QUESTION,
                payload: res.data
            })
        }
        callback(res.data.errors)
    } catch (errors) {
        console.log(errors)
    }    
}

export const upvoteQuiz = ({ id, userId }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const body = JSON.stringify({ userId })
        console.log(body)
        const res = await axios.post(`${URL}/api/quizzes/upvote/${id}`, body, config)
        let quizPayload = {quiz:res.data.quiz}
        let userPayload = {user:res.data.user}
        if (res.data.errors) {
            dispatch({
                type: UPVOTE_QUIZ_FAIL
            })
        }
        else {
            dispatch({
                type: UPVOTE_QUIZ,
                payload: quizPayload
            })
            dispatch({
                type:EDIT_PROFILE_SUCCESS,
                payload:userPayload
            })
        }
    } catch (errors) {
        console.log(errors)
    }    
}

export const downvoteQuiz = ({ id, userId }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const body = JSON.stringify({ userId })
        console.log(body)
        const res = await axios.post(`${URL}/api/quizzes/downvote/${id}`, body, config)
        let quizPayload = {quiz:res.data.quiz}
        let userPayload = {user:res.data.user}

        if (res.data.errors) {
            dispatch({
                type: DOWNVOTE_QUIZ_FAIL
            })
        }
        else {
            dispatch({
                type: DOWNVOTE_QUIZ,
                payload: quizPayload
            })

            dispatch({
                type:EDIT_PROFILE_SUCCESS,
                payload:userPayload
            })
        }
    } catch (errors) {
        console.log(errors)
    }    
}

export const reportQuiz = ({ id, userId, text }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const body = JSON.stringify({ userId, text })
    try {
        const res = await axios.post(`${URL}/api/platforms/${id}/report`, body, config);
        if (res.data.errors) {
            dispatch({
                type: REPORT_QUIZ_FAIL,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: REPORT_QUIZ,
                payload: res.data
            });
        }
    } catch (error) {
        console.log("error message: " + error.message);
    }
}

export const setQuizLoading = () => {
    return {
      type: QUIZ_LOADING
    };
};