import {
    GET_QUIZ
} from '../actions/types'

const initialState = {
    isLoading: false,
    quiz: null,
}

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUIZ:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export default quizReducer