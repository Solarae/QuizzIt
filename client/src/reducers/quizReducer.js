import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAIL,
    GET_QUIZ,
    QUIZ_LOADING
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