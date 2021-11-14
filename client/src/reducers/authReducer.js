import jwtDecode from 'jwt-decode'

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
    isAuthenticated: null,
    isLoading: false,
    user: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            }
        case LOGIN_FAIL:
            return state;
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: null,
                user: null
            }
        case REGISTER_FAIL:
            return {
                ...state,
                isAuthenticated: null,
                user: null
            }
        case EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            }
        case EDIT_PROFILE_FAIL:
            return state;
        case DELETE_PROFILE_SUCCESS:
            return {
                ...state,
                isAuthenticated: null,
                user: {} 
            }
        case DELETE_PROFILE_FAIL:
            return state;
        default:
            return state;
    }
}

export default authReducer