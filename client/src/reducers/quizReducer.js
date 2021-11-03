import {
    GET_QUIZ,
    GET_QUIZ_FAIL,
    QUIZ_LOADING,
    ADD_QUIZ_QUESTION,
    ADD_QUIZ_QUESTION_FAIL,
} from '../actions/types'

const initialState = {
    isLoading: true,
    quiz: null,
    errors: null,
}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUIZ:
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        case GET_QUIZ_FAIL:
            return {
                ...state,
                quiz: null,
                isLoading: false,
                errors: action.payload.errors
            }
        case ADD_QUIZ_QUESTION: 
            return {
                ...state,
                ...action.payload,
            }
        case ADD_QUIZ_QUESTION_FAIL: 
            return {
                ...state,
                ...action.payload
            }
        case QUIZ_LOADING:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state;
    }
}

export default quizReducer