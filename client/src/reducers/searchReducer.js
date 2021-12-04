import {
    SEARCH_PLATFORM_REQ,
    SEARCH_PLATFORM_SUCCESS,
    SEARCH_PLATFORM_FAIL,
    SEARCH_QUIZ_REQ,
    SEARCH_QUIZ_SUCCESS,
    SEARCH_QUIZ_FAIL,
    SEARCH_USER_REQ,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAIL,
    SEARCH_UPDATE_PLATFORM,
    RESET_MAX_PAGES
} from '../actions/types'

const initialState = {
    isSearchPlatformLoading: false,
    isSearchQuizLoading: false,
    isSearchUserLoading: false,
    platforms: null,
    quizzes: null,
    users: null,
    page: 0,
    maxPages: 0,
    totalCount: 0 ,
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
                maxPages: action.payload.pages > state.maxPages ? action.payload.pages : state.maxPages,
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
                maxPages: action.payload.pages > state.maxPages ? action.payload.pages : state.maxPages,
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
                maxPages: action.payload.pages > state.maxPages ? action.payload.pages : state.maxPages,
                isSearchUserLoading: false,
                errors: null 
            }
        case SEARCH_USER_FAIL:
            return {
                ...state,
                ...action.payload,
                isSearchUserLoading: false
            }
        case SEARCH_UPDATE_PLATFORM:
            let updatedPlatforms = state.platforms 
            if (state.platforms && action.payload.platform){
                let updatedPl = action.payload.platform
                updatedPlatforms = [...state.platforms]

                // replace old platform with the updated platform
                updatedPlatforms = updatedPlatforms.map((obj) => obj._id===updatedPl._id ? updatedPl : obj)
            }
            return{
                ...state,
                platforms: updatedPlatforms
            }
        case RESET_MAX_PAGES:
            return{
                ...state,
                maxPages: 0 
            }
        default:
            return state;
    }
}

export default searchReducer;