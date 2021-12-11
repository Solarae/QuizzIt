import {
    GET_GLOBAL_LEADERBOARD_REQ,
    GET_GLOBAL_LEADERBOARD_SUCCESS,
    GET_GLOBAL_LEADERBOARD_FAIL,
    SEARCH_GLOBAL_LEADERBOARD_SUCCESS,
    SEARCH_GLOBAL_LEADERBOARD_FAIL,
} from '../actions/types'

const initialState = {
    isGetGlobalLeaderboardLoading: true,
    leaderboard: [], 
    leaderboardPage: 0,
    leaderboardPages: 0,
    leaderboardTotalCount: 0,
    errors: null
}

const globalReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_GLOBAL_LEADERBOARD_REQ:
            return {
                ...state,
                isGetGlobalLeaderboardLoading: true
            }
        case GET_GLOBAL_LEADERBOARD_SUCCESS:
        case GET_GLOBAL_LEADERBOARD_FAIL:
        case SEARCH_GLOBAL_LEADERBOARD_SUCCESS:
        case SEARCH_GLOBAL_LEADERBOARD_FAIL:
            return {
                ...state,
                ...action.payload,
                isGetGlobalLeaderboardLoading: false,
            }
        default:
            return state
    }
}

export default globalReducer
