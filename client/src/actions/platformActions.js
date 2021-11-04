import {
    GET_PLATFORM_REQ,
    CREATE_PLATFORM_REQ,
    DELETE_PLATFORM_REQ,
    JOIN_PLATFORM_REQ,
    LEAVE_PLATFORM_REQ,
    REPORT_PLATFORM_REQ,
    GET_PLATFORM_SUCCESS,
    GET_PLATFORM_FAIL,
    CREATE_PLATFORM_SUCCESS,
    CREATE_PLATFORM_FAIL,
    DELETE_PLATFORM_SUCCESS,
    DELETE_PLATFORM_FAIL,
    JOIN_PLATFORM_SUCCESS,
    JOIN_PLATFORM_FAIL,
    LEAVE_PLATFORM_SUCCESS,
    LEAVE_PLATFORM_FAIL,
    REPORT_PLATFORM_SUCCESS,
    REPORT_PLATFORM_FAIL
} from '../actions/types'

import axios from 'axios'

import { URL } from '../config.js'

export const createPlatform = ({ userId, name, description, history }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ userId, name, description })
    try {
        dispatch({
            type: CREATE_PLATFORM_REQ
        });
        const res = await axios.post(`${URL}/api/platforms`, body, config);

        if (res.data.errors) {
            dispatch({
                type: CREATE_PLATFORM_FAIL,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: CREATE_PLATFORM_SUCCESS,
                payload: res.data
            })
        }

    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: CREATE_PLATFORM_FAIL
        })
    }
}

export const getPlatform = ({ id }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        dispatch({
            type: GET_PLATFORM_REQ
        });
        const res = await axios.get(`${URL}/api/platforms/${id}`, config); // get the platform 

        if (res.data.errors) {
            dispatch({
                type: GET_PLATFORM_FAIL,
                payload: res.data
            })
        }
        else {
            // get the platform quizzes
            const quizzes = [];
            for (const qid of res.data.platform.quizzes) {
                let quiz_res = await axios.get(`${URL}/api/quizzes/${qid}`, config); 
                if (quiz_res.data.errors) {
                    dispatch({
                        type: GET_PLATFORM_FAIL,
                        payload: quiz_res.data
                    })
                }
                quizzes.push(quiz_res.data.quiz);
            }
            
            // get the platform awards 
            const awards = [];
            for (const awardId of res.data.platform.awards) {
                let award_res = await axios.get(`${URL}/api/awards/${awardId}`, config); 
                if (award_res.data.errors) {
                    dispatch({
                        type: GET_PLATFORM_FAIL,
                        payload: award_res.data
                    })
                }
                awards.push(award_res.data.award);
            }

            res.data.platform.quizzesData = quizzes; // pack the quizzes data with the platform
            res.data.platform.awardsData = awards; // pack the awards data with the platform
            dispatch({
                type: GET_PLATFORM_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: GET_PLATFORM_FAIL
        })
    }
}

export const deletePlatform = ({ userId, platformId, confirmPassword }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const body = JSON.stringify({ userId, confirmPassword })
    try {
        dispatch({
            type: DELETE_PLATFORM_REQ
        });
        const res = await axios.post(`${URL}/api/platforms/${platformId}/delete`, body, config);
        if (res.data.errors) {
            dispatch({
                type: DELETE_PLATFORM_FAIL,
                payload: res.data
            })
        }
        else {

            dispatch({
                type: DELETE_PLATFORM_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: DELETE_PLATFORM_FAIL
        })
    }
}

export const joinPlatform = ({ userId, platformId }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const body = JSON.stringify({ userId })
    try {
        dispatch({
            type: JOIN_PLATFORM_REQ
        });
        const res = await axios.post(`${URL}/api/platforms/${platformId}/join`, body, config);
        if (res.data.errors) {
            dispatch({
                type: JOIN_PLATFORM_FAIL,
                payload: res.data
            })
        }
        else {

            dispatch({
                type: JOIN_PLATFORM_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: JOIN_PLATFORM_FAIL
        })
    }
}

export const leavePlatform = ({ userId, platformId }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const body = JSON.stringify({ userId })
    try {
        dispatch({
            type: LEAVE_PLATFORM_REQ
        });
        const res = await axios.post(`${URL}/api/platforms/${platformId}/leave`, body, config);
        if (res.data.errors) {
            dispatch({
                type: LEAVE_PLATFORM_FAIL,
                payload: res.data
            })
        }
        else {

            dispatch({
                type: LEAVE_PLATFORM_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: LEAVE_PLATFORM_FAIL
        })
    }
}

export const reportPlatform = ({ platformId, userId, text }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const body = JSON.stringify({ userId, text })
    try {
        dispatch({
            type: REPORT_PLATFORM_REQ
        });
        const res = await axios.post(`${URL}/api/platforms/${platformId}/report`, body, config);
        if (res.data.errors) {
            dispatch({
                type: REPORT_PLATFORM_FAIL,
                payload: res.data
            })
        }
        else {

            dispatch({
                type: REPORT_PLATFORM_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: REPORT_PLATFORM_FAIL
        })
    }
}