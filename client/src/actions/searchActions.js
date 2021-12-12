import {
    SEARCH_PLATFORM_REQ,
    SEARCH_PLATFORM_SUCCESS,
    SEARCH_PLATFORM_FAIL,
    SEARCH_QUIZ_REQ,
    SEARCH_QUIZ_SUCCESS,
    SEARCH_QUIZ_FAIL,
    SEARCH_USER_REQ,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAIL
} from '../actions/types'

import axios from 'axios'
import { URL } from '../config.js'

axios.defaults.withCredentials = true;

export const searchPlatform = ({ query, page, limit }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            ...query,
            offset: limit * (page - 1),
            limit: limit 
        }
    }
    try {
        dispatch({
            type: SEARCH_PLATFORM_REQ
        });
        const res = await axios.get(`${URL}/api/platforms`, config);

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

export const searchQuiz = ({ query, page, limit }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            ...query,
            offset: limit * (page - 1),
            limit: limit 
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
            console.log(res.data.quizzes)
            // get the platform icon/name for each quiz
            for (let q of res.data.quizzes) {
                let platformConfig = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                let plat_res = await axios.get(`${URL}/api/platforms/${q.platformId}`, platformConfig); // get the platform 
                q.platformName = plat_res.data.platform.name
                q.platformIcon = plat_res.data.platform.icon
            }
            
            dispatch({
                type: SEARCH_QUIZ_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        console.log("error message: " + error);
        dispatch({
            type: SEARCH_QUIZ_FAIL
        })
    }
}

export const searchUser = ({ query, page, limit }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            ...query,
            offset: limit * (page - 1),
            limit: limit 
        }
    }
    try {
        dispatch({
            type: SEARCH_USER_REQ
        });
        const res = await axios.get(`${URL}/api/users/`, config);

        if (res.data.errors) {
            dispatch({
                type: SEARCH_USER_FAIL,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: SEARCH_USER_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: SEARCH_USER_FAIL
        })
    }
}