import {
    SEARCH_PLATFORM_REQ,
    SEARCH_PLATFORM_SUCCESS,
    SEARCH_PLATFORM_FAIL,
    SEARCH_QUIZ_REQ,
    SEARCH_QUIZ_SUCCESS,
    SEARCH_QUIZ_FAIL
} from '../actions/types'

const initialState = {
    isSearchPlatformLoading: false,
    isSearchQuizzesLoading: false,
    platforms: null,
    quizzes: null,
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
        default:
            return state;
    }
}

export default searchReducer;