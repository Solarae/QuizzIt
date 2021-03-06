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
    EDIT_QUIZ_THUMBNAIL,
    EDIT_QUIZ_THUMBNAIL_FAIL,
    GET_QUIZ_LEADERBOARD_REQ,
    GET_QUIZ_LEADERBOARD_SUCCESS,
    GET_QUIZ_LEADERBOARD_FAIL,
    SEARCH_QUIZ_LEADERBOARD_SUCCESS,
    SEARCH_QUIZ_LEADERBOARD_FAIL
} from '../actions/types'

import axios from 'axios'
import { URL } from '../config.js'

axios.defaults.withCredentials = true;

export const getQuiz = (id, query) => async (dispatch) => {
    dispatch(setQuizLoading());
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            ...query 
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
            console.log(res.data)
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

export const editQuiz = ({ id, name, description, time, status }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const body = JSON.stringify({ name, description, time, status })
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

export const deleteQuiz = ({ id,query,history,platformId }) => async (dispatch) => {
    try {
        
        await axios.delete(`${URL}/api/quizzes/${id}`)

        const config = {
            params: {
                ...query
            }
        }
        let res = await axios.get(`${URL}/api/reports/getQuizReport/${id}`,config)

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
        history.push(`/platform/${platformId}`)
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
       
        if (res.data.errors) {
            dispatch({
                type: UPVOTE_QUIZ_FAIL
            })
        }
        else {
            dispatch({
                type: UPVOTE_QUIZ,
                payload: res.data
            })
            console.log(res.data.quiz)
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
        

        if (res.data.errors) {
            dispatch({
                type: DOWNVOTE_QUIZ_FAIL
            })
        }
        else {
            console.log(res.data.quiz)
            dispatch({
                type: DOWNVOTE_QUIZ,
                payload: res.data
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
    const body = JSON.stringify({ submittedBy:userId, description:text })
    try {
        const res = await axios.post(`${URL}/api/quizzes/${id}/report`, body, config);
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

export const uploadImage = (id, image) => async (dispatch) => {
    try {
        const formData = new FormData()
        formData.append('image', image)

        const res = await axios.post(`${URL}/api/quizzes/${id}/upload`, formData); 
        console.log(res)
        if (res.data.errors) {
            dispatch({
                type: EDIT_QUIZ_THUMBNAIL_FAIL,
                payload: res.data
            })
        } else {
            dispatch({
                type: EDIT_QUIZ_THUMBNAIL,
                payload: res.data
            })
        }
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: EDIT_QUIZ_THUMBNAIL_FAIL
        })
    }
}

export const setQuizLoading = () => {
    return {
      type: QUIZ_LOADING
    };
};

export const getQuizLeaderboard = ({ id, query }) => async (dispatch) => {
    const config = {
        params: {
            ...query
        }
    }
    try {
        dispatch({
            type: GET_QUIZ_LEADERBOARD_REQ
        })
        const res = await axios.get(`${URL}/api/quizzes/${id}/leaderboard`, config)
        console.log(res.data)
        dispatch({
            type: GET_QUIZ_LEADERBOARD_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: GET_QUIZ_LEADERBOARD_FAIL
        })
    }
}

export const searchLeaderboard = ({id, query }) => async (dispatch) => {
    const config = {
        params: {
            ...query
        }
    }
    try {
        dispatch({
            type: GET_QUIZ_LEADERBOARD_REQ
        })
        const res = await axios.get(`${URL}/api/quizzes/${id}/leaderboard/search`, config)
        console.log(res.data)
        dispatch({
            type: SEARCH_QUIZ_LEADERBOARD_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: SEARCH_QUIZ_LEADERBOARD_FAIL,
            payload: error.response.data
        })
    }
}


export const deleteQuizQuestion = ({quizId,questionId}) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ questionId})

    try {
        let res = await axios.post(`${URL}/api/quizzes/${quizId}/deleteQuestion`,body,config)

        dispatch({
            type:EDIT_QUIZ_QUESTION,
            payload:res.data
        })
        
    } catch (error) {
        
    }




}