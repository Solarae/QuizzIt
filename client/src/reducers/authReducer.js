import {
    GET_SIGNED_IN,
    CONNECT_SOCKET,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAIL,
    GET_INBOX_REQ,
    GET_INBOX_SUCCESS,
    GET_INBOX_FAIL
} from '../actions/types'

const initialState = {
    isAuthenticated: null,
    user: null,
    socket: null,
    inbox: [],
    inboxPage: 1, 
    inboxPages: 1, 
    inboxTotalCount: 0,
    isGetInboxLoading: true
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SIGNED_IN:
            return {
                ...state,
                ...action.payload,
            }
        case CONNECT_SOCKET:
            return {
                ...state,
                ...action.payload
            }
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
        case GET_INBOX_REQ:
            return {
                ...state,
                isGetInboxLoading: true
            }
        case GET_INBOX_SUCCESS:
            return {
                ...state,
                inbox: [...state.inbox, ...action.payload.inbox],
                inboxPage: action.payload.inboxPage,
                inboxPages: action.payload.inboxPages,
                inboxTotalCount: action.payload.inboxTotalCount,
                isGetInboxLoading: false
            }
        case GET_INBOX_FAIL:
            return {
                ...state,
                ...action.payload,
                isGetInboxLoading: false
            }
        case GET_INBOX_SUCCESS:
            return {
                ...state,
                inbox: [...action.payload.inbox, ...state.inbox],
                inboxPage: action.payload.inboxPage,
                inboxPages: action.payload.inboxPages,
                inboxTotalCount: action.payload.inboxTotalCount,
            }
        default:
            return state;
    }
}

export default authReducer