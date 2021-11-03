import {
    GET_QUIZ,
    QUIZ_LOADING,
    CREATE_QUIZ_REQ,
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_FAIL
} from '../actions/types'

const initialState = {
    isLoading: true,
    isCreateLoading: false,
    quiz: null,
    errors: null
}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUIZ:
            return {
                ...state,
                ...action.payload,
                isLoading: false
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
        default:
            return state;
    }
}

export default quizReducer