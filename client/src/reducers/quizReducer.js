import {
    GET_QUIZ,
    GET_QUIZ_FAIL,
    QUIZ_LOADING,
    CREATE_QUIZ_REQ,
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_FAIL,
    EDIT_QUIZ,
    EDIT_QUIZ_FAIL,
    DELETE_QUIZ,
    DELETE_QUIZ_FAIL,
    ADD_QUIZ_QUESTION,
    ADD_QUIZ_QUESTION_FAIL,
    EDIT_QUIZ_QUESTION,
    EDIT_QUIZ_QUESTION_FAIL,
    DELETE_QUIZ_QUESTION,
    DELETE_QUIZ_QUESTION_FAIL,
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
    GET_QUIZ_LEADERBOARD_FAIL
} from '../actions/types'

const initialState = {
    isLoading: true,
    isCreateLoading: false,
    quiz: null,
    isGetQuizLeaderboardLoading: false,
    leaderboard: [], 
    leaderboardPage: 0,
    leaderboardPages: 1,
    leaderboardTotalCount: 0,
    errors: null
}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUIZ:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                errors: null,
            }
        case GET_QUIZ_FAIL:
            return {
                ...state,
                quiz: null,
                isLoading: false,
            }
        case ADD_QUIZ_QUESTION: 
            return {
                ...state,
                ...action.payload,
                errors: null,
            }
        case ADD_QUIZ_QUESTION_FAIL: 
            return {
                ...state,
                ...action.payload
            }
        case EDIT_QUIZ:
            return {
                ...state,
                ...action.payload
            }
        case EDIT_QUIZ_FAIL:
            return {
                ...state,
                ...action.payload
            }
        case DELETE_QUIZ:
            return {
                ...state,
                ...action.payload
            }
        case DELETE_QUIZ_FAIL:
            return {
                ...state,
                ...action.payload
            }
        case EDIT_QUIZ_QUESTION: 
            return {
                ...state,
                ...action.payload,
                errors: null,
            }
        case EDIT_QUIZ_QUESTION_FAIL: 
            return {
                ...state,
                ...action.payload
            }
        case DELETE_QUIZ_QUESTION: 
            return {
                ...state,
                ...action.payload,
                errors: null,
            }
        case DELETE_QUIZ_QUESTION_FAIL: 
            return {
                ...state,
                ...action.payload
            }
        case QUIZ_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_QUIZ_REQ:
            return {
                ...state,
                isCreateLoading: true
            }
        case CREATE_QUIZ_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isCreateLoading: false,
                errors: null 
            }
        case CREATE_QUIZ_FAIL:
            return {
                ...state,
                ...action.payload,
                isCreateLoading: false
            }
        case UPVOTE_QUIZ:
            return {
                ...state,
                ...action.payload,
            }
        case UPVOTE_QUIZ_FAIL:
            return {
                ...state,
                ...action.payload,
            }
        case DOWNVOTE_QUIZ:
            return {
                ...state,
                ...action.payload,
            }
        case DOWNVOTE_QUIZ_FAIL:
            return {
                ...state,
                ...action.payload,
            }
        case REPORT_QUIZ:
            return {
                ...state,
                ...action.payload,
            }
        case REPORT_QUIZ_FAIL:
            return {
                ...state,
                ...action.payload,
            }
        case EDIT_QUIZ_THUMBNAIL: 
            return {
                ...state,
                ...action.payload
            }
        case EDIT_QUIZ_THUMBNAIL_FAIL: 
            return {
                ...state,
                ...action.payload
            }
        case GET_QUIZ_LEADERBOARD_REQ:
            return {
                ...state,
                isGetQuizLeaderboardLoading: true 
            }
        case GET_QUIZ_LEADERBOARD_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isGetQuizLeaderboardLoading: false,
            }
        case GET_QUIZ_LEADERBOARD_FAIL:
            return {
                ...state,
                ...action.payload,
                isGetQuizLeaderboardLoading: false,
            }
        default:
            return state;
    }
}

export default quizReducer