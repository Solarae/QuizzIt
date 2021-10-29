import {
    GET_QUIZ
} from '../actions/types'

import axios from 'axios'

import { URL } from '../config.js'

export const getQuiz = ( id ) => async (dispatch) => {
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
    }
}