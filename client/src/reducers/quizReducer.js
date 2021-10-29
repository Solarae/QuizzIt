import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAIL
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