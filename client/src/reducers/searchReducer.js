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

const initialState = {
    isSearchPlatformLoading: false,
    isSearchQuizLoading: false,
    isSearchUserLoading: false,
    platforms: null,
    quizzes: null,
    users: null,
    errors: null
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_PLATFORM_REQ:
            return {
                ...state,
                isSearchPlatformLoading: true 
            }
        case SEARCH_PLATFORM_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isSearchPlatformLoading: false,
                errors: null 
            }
        case SEARCH_PLATFORM_FAIL:
            return {
                ...state,
                ...action.payload,
                isSearchPlatformLoading: false
            }
        case SEARCH_QUIZ_REQ:
            return {
                ...state,
                isSearchQuizLoading: true 
            }
        case SEARCH_QUIZ_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isSearchQuizLoading: false,
                errors: null 
            }
        case SEARCH_QUIZ_FAIL:
            return {
                ...state,
                ...action.payload,
                isSearchQuizLoading: false
            }
        case SEARCH_USER_REQ:
            return {
                ...state,
                isSearchUserLoading: true 
            }
        case SEARCH_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isSearchUserLoading: false,
                errors: null 
            }
        case SEARCH_USER_FAIL:
            return {
                ...state,
                ...action.payload,
                isSearchUserLoading: false
            }
        default:
            return state;
    }
}

export default searchReducer;