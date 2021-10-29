import {
    GET_QUIZ,
    QUIZ_LOADING
} from '../actions/types'

const initialState = {
    isLoading: true,
    quiz: null,
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
        default:
            return state;
    }
}

export default quizReducer