import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT_SUCCESS, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL 
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
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
        default:
            return state
    }
}

export default authReducer