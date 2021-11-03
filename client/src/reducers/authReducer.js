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
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

// set the user if there is a valid jwt token
if (localStorage.getItem('token')) {
    const token = jwtDecode(localStorage.getItem('token'))
    if (token.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken');
    } else {
        initialState.isAuthenticated = true
        initialState.user = token.user;
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            }
        case LOGIN_FAIL:
            return state;
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: null,
                user: null
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
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
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
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