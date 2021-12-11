import {
    GET_PLATFORM_REQ,
    CREATE_PLATFORM_REQ,
    EDIT_PLATFORM_REQ,
    DELETE_PLATFORM_REQ,
    JOIN_PLATFORM_REQ,
    LEAVE_PLATFORM_REQ,
    REPORT_PLATFORM_REQ,
    EDIT_MEMBER_ROLE_REQ,
    GET_PLAT_LEADERBOARD_REQ,
    GET_MEMBERLIST_REQ,
    GET_QUIZZES_REQ,
    GET_PLATFORM_SUCCESS,
    GET_PLATFORM_FAIL,
    CREATE_PLATFORM_SUCCESS,
    CREATE_PLATFORM_FAIL,
    EDIT_PLATFORM_SUCCESS,
    EDIT_PLATFORM_FAIL,
    EDIT_PLATFORM_IMG_SUCCESS,
    EDIT_PLATFORM_IMG_FAIL,
    DELETE_PLATFORM_SUCCESS,
    DELETE_PLATFORM_FAIL,
    JOIN_PLATFORM_SUCCESS,
    JOIN_PLATFORM_FAIL,
    LEAVE_PLATFORM_SUCCESS,
    LEAVE_PLATFORM_FAIL,
    REPORT_PLATFORM_SUCCESS,
    REPORT_PLATFORM_FAIL,
    EDIT_MEMBER_ROLE_SUCCESS,
    EDIT_MEMBER_ROLE_FAIL,
    GET_PLAT_LEADERBOARD_SUCCESS,
    GET_PLAT_LEADERBOARD_FAIL,
    GET_MEMBERLIST_SUCCESS,
    GET_MEMBERLIST_FAIL,
    SEARCH_UPDATE_PLATFORM,
    SEARCH_PLAT_LEADERBOARD_SUCCESS,
    SEARCH_PLAT_LEADERBOARD_FAIL,
    GET_QUIZZES_SUCCESS,
    GET_QUIZZES_FAIL
} from '../actions/types'

import axios from 'axios'


import { URL } from '../config.js'

axios.defaults.withCredentials = true;

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

export const editPlatform = ({ newValue, userId, platformId, confirmPassword }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ newValue, userId, confirmPassword })
    try {
        dispatch({
            type: EDIT_PLATFORM_REQ
        });
        const res = await axios.post(`${URL}/api/platforms/${platformId}/update`, body, config);

        if (res.data.errors) {
            dispatch({
                type: EDIT_PLATFORM_FAIL,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: EDIT_PLATFORM_SUCCESS,
                payload: res.data
            })
        }

    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: EDIT_PLATFORM_FAIL
        })
    }
}

export const uploadImage = (id, image, type, userId) => async (dispatch) => {
    try {
        const formData = new FormData()
        formData.append('image', image)
        formData.append('type', type)
        formData.append('userId', userId)

        const res = await axios.post(`${URL}/api/platforms/${id}/upload`, formData); 

        if (res.data.errors) {
            dispatch({
                type: EDIT_PLATFORM_IMG_FAIL,
                payload: res.data
            })
        } else {
            dispatch({
                type: EDIT_PLATFORM_IMG_SUCCESS,
                payload: res.data
            })
        }
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: EDIT_PLATFORM_IMG_FAIL
        })
    }
}

export const getPlatform = ({ id, params }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params
    }

    try {
        console.log(id)
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
            // get the platform awards 
            const awardsConfig = {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    'platformId': id 
                }
            }
            let award_res = await axios.get(`${URL}/api/awards/`, awardsConfig);
            if (award_res.data.errors) {
                dispatch({
                    type: GET_PLATFORM_FAIL,
                    payload: award_res.data
                })
            }

            // res.data.quizzesData = quizzes; // pack the quizzes data with the platform
            res.data.awardsData = award_res.data.awards; // pack the awards data with the platform
            // res.data.memberList = member_res.data.members; // pack the awards data with the platform
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
            dispatch({
                type: SEARCH_UPDATE_PLATFORM,
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
            dispatch({
                type: SEARCH_UPDATE_PLATFORM,
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
    const body = JSON.stringify({ submittedBy:userId, description:text })
    try {
        dispatch({
            type: REPORT_PLATFORM_REQ
        });
        const res = await axios.post(`${URL}/api/reports/reportPlatform/${platformId}`, body, config);
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

export const editRole = ({ platformId, memberId, senderId, role }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const body = JSON.stringify({ memberId, senderId, role })
    try {
        dispatch({
            type: EDIT_MEMBER_ROLE_REQ,
        })
        const res = await axios.post(`${URL}/api/platforms/${platformId}/editRole`, body, config);

        if (res.data.errors) {
            dispatch({
                type: EDIT_MEMBER_ROLE_FAIL,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: EDIT_MEMBER_ROLE_SUCCESS,
                payload: res.data
            });
        }

    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: EDIT_MEMBER_ROLE_FAIL,
        })
    }
}

export const getPlatformLeaderboard = ( {id, query} ) => async (dispatch) => {
    const config = {
        params: {
            ...query
        }
    }
    try {
        dispatch({
            type: GET_PLAT_LEADERBOARD_REQ
        })
        const res = await axios.get(`${URL}/api/platforms/${id}/leaderboard`, config)
        console.log(res.data)
        dispatch({
            type: GET_PLAT_LEADERBOARD_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: GET_PLAT_LEADERBOARD_FAIL,
            payload: error.response.data
        })
    }
}

export const searchLeaderboard = ({ id, query }) => async (dispatch) => {
    const config = {
        params: {
            ...query
        }
    }
    try {
        dispatch({
            type: GET_PLAT_LEADERBOARD_REQ
        })
        const res = await axios.get(`${URL}/api/platforms/${id}/leaderboard/search`, config)
        console.log(res.data)
        dispatch({
            type: SEARCH_PLAT_LEADERBOARD_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: SEARCH_PLAT_LEADERBOARD_FAIL,
            payload: error.response.data
        })
    }
}

export const getMemberList = (platformId, page) => async (dispatch) => {
    const config = {
        params: {
            offset: 10 * (page - 1),
            limit: 10
        }
    }

    try {
        dispatch({
            type: GET_MEMBERLIST_REQ
        })
        const res = await axios.get(`${URL}/api/platforms/${platformId}/memberList`, config)
        console.log(res.data)
        dispatch({
            type: GET_MEMBERLIST_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: GET_MEMBERLIST_FAIL
        })
    }
}

export const getQuizzes = (query) => async (dispatch) => {
    const config = {
        params: {
            ...query
        }
    }

    try {
        dispatch({
            type: GET_QUIZZES_REQ
        })
        const res = await axios.get(`${URL}/api/quizzes`, config)
        console.log(res.data)
        dispatch({
            type: GET_QUIZZES_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: GET_QUIZZES_FAIL,
            payload: error.response.data
        })
    }
}