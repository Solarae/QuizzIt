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
    GET_INBOX_FAIL,
    RECEIVE_NOTIFICATIONS,
    READ_NOTIFICATION_SUCCESS,
    READ_NOTIFICATION_FAIL,
    GET_FRIENDREQUESTS_REQ,
    GET_FRIENDREQUESTS_SUCCESS,
    GET_FRIENDREQUESTS_FAIL,
    SEND_FRIENDREQUEST_SUCCESS,
    SEND_FRIENDREQUEST_FAIL,
    ACCEPT_FRIENDREQUEST_SUCCESS,
    ACCEPT_FRIENDREQUEST_FAIL,
    DECLINE_FRIENDREQUEST_SUCCESS,
    DECLINE_FRIENDREQUEST_FAIL,
    RECEIVE_FRIENDREQUEST
} from '../actions/types'

const initialState = {
    isAuthenticated: null,
    user: null,
    socket: null,
    inbox: [],
    inboxPage: 1, 
    inboxPages: 1, 
    inboxTotalCount: 0,
    isGetInboxLoading: true,
    friendRequests: [],
    friendRequestsPage: 1, 
    friendRequestsPages: 1, 
    friendRequestsTotalCount: 0,
    isGetFriendRequestsLoading: true
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
        case RECEIVE_NOTIFICATIONS:
            return {
                ...state,
                inbox: [...action.payload.inbox, ...state.inbox],
                inboxPage: action.payload.inboxPage,
                inboxPages: action.payload.inboxPages,
                inboxTotalCount: action.payload.inboxTotalCount,
            }
        case READ_NOTIFICATION_SUCCESS:
            const newInbox = [...state.inbox]
            newInbox[action.payload.index] = action.payload.updatedNotification
            return {
                ...state,
                inbox: newInbox
            }
        case READ_NOTIFICATION_FAIL:
            return {
                ...state,
                ...action.payload
            }
        case GET_FRIENDREQUESTS_REQ:
            return {
                ...state,
                isGetFriendRequestsLoading: true
            }
        case GET_FRIENDREQUESTS_SUCCESS:
            return {
                ...state,
                friendRequests: [...state.friendRequests, ...action.payload.friendRequests],
                friendRequestsPage: action.payload.friendRequestsPage,
                friendRequestsPages: action.payload.friendRequestsPages,
                friendRequestsTotalCount: action.payload.friendRequestsTotalCount,
                isGetFriendRequestsLoading: false
            }
        case GET_FRIENDREQUESTS_FAIL:
            return {
                ...state,
                ...action.payload,
                isGetFriendRequestsLoading: false
            }
        case SEND_FRIENDREQUEST_SUCCESS:
        case SEND_FRIENDREQUEST_FAIL:
        case ACCEPT_FRIENDREQUEST_SUCCESS:
        case ACCEPT_FRIENDREQUEST_FAIL:
        case DECLINE_FRIENDREQUEST_SUCCESS:
        case DECLINE_FRIENDREQUEST_FAIL:
            return {
                ...state,
                ...action.payload
            }
        case RECEIVE_FRIENDREQUEST:
            return {
                ...state,
                friendRequests: [...state.friendRequests, ...action.payload.friendRequests],
                friendRequestsPage: action.payload.friendRequestsPage,
                friendRequestsPages: action.payload.friendRequestsPages,
                friendRequestsTotalCount: action.payload.friendRequestsTotalCount
            }
        default:
            return state;
    }
}

export default authReducer