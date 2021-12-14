import {
    GET_GLOBAL_LEADERBOARD_REQ,
    GET_GLOBAL_LEADERBOARD_SUCCESS,
    GET_GLOBAL_LEADERBOARD_FAIL,
    SEARCH_GLOBAL_LEADERBOARD_SUCCESS,
    SEARCH_GLOBAL_LEADERBOARD_FAIL
} from '../actions/types'

import axios from 'axios'


import { URL } from '../config.js'

axios.defaults.withCredentials = true;

export const getLeaderboard = ({ query }) => async (dispatch) => {
    const config = {
        params: {
            ...query
        }
    }
    try {
        dispatch({
            type: GET_GLOBAL_LEADERBOARD_REQ
        })
        const res = await axios.get(`${URL}/api/global/leaderboard`, config)
        console.log(res.data)
        dispatch({
            type: GET_GLOBAL_LEADERBOARD_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: GET_GLOBAL_LEADERBOARD_FAIL
        })
    }
}

export const searchLeaderboard = ({ query }) => async (dispatch) => {
    console.log("CALLING SEARCH GLOBAL LEADERBOARD")
    const config = {
        params: {
            ...query
        }
    }
    try {
        dispatch({
            type: GET_GLOBAL_LEADERBOARD_REQ
        })
        const res = await axios.get(`${URL}/api/global/leaderboard/search`, config)
        console.log(res.data)
        dispatch({
            type: SEARCH_GLOBAL_LEADERBOARD_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: SEARCH_GLOBAL_LEADERBOARD_FAIL,
            payload: error.response.data
        })
    }
}
