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
    RECEIVE_FRIENDREQUEST,
    GET_FRIENDS_REQ,
    GET_FRIENDS_SUCCESS,
    GET_FRIENDS_FAIL,
    UNFRIEND_SUCCESS,
    UNFRIEND_FAIL
} from '../actions/types'

const initialState = {
    isAuthenticated: null,
    user: null,
    socket: null,
    inbox: [],
    inboxTotalUnreadCount: 0,
    inboxTotalCount: 0,
    isGetInboxLoading: true,
    friendRequests: [],
    friendRequestsTotalCount: 0,
    isGetFriendRequestsLoading: true,
    friends: [],
    friendsPage: 1,
    friendsPages: 1,
    friendsTotalCount: 0,
    isGetFriendsLoading: true
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
            return {
                ...initialState,
                socket: state.socket
            }
        case LOGOUT_SUCCESS:
            return initialState
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
                inbox: [...action.payload.inbox, ...state.inbox],
                inboxTotalUnreadCount: action.payload.inboxTotalUnreadCount,
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
                inboxTotalUnreadCount: state.inboxTotalUnreadCount + action.payload.inbox.length,
                inboxTotalCount: state.inboxTotalCount + action.payload.inbox.length,
            }
        case READ_NOTIFICATION_SUCCESS:
            const newInbox = [...state.inbox]
            newInbox[action.payload.index] = action.payload.updatedNotification
            return {
                ...state,
                inbox: newInbox,
                inboxTotalUnreadCount: state.inboxTotalUnreadCount - 1
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
            return {
                ...state
            }
        case SEND_FRIENDREQUEST_FAIL:
            return {
                ...state,
                ...action.payload
            }
        case ACCEPT_FRIENDREQUEST_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    friends: [...state.user.friends, action.payload.uid]
                },
                friendRequests: state.friendRequests.filter(u => u._id !== action.payload.uid),
                friendRequestsTotalCount: state.friendRequestsTotalCount - 1
            }
        case ACCEPT_FRIENDREQUEST_FAIL:
            return {
                ...state,
                ...action.payload
            }
        case DECLINE_FRIENDREQUEST_SUCCESS:
            return {
                ...state,
                friendRequests: state.friendRequests.filter(u => u._id !== action.payload.uid),
                friendRequestsTotalCount: state.friendRequestsTotalCount - 1
            }
        case DECLINE_FRIENDREQUEST_FAIL:
            return {
                ...state,
                ...action.payload
            }
        case RECEIVE_FRIENDREQUEST:
            return {
                ...state,
                friendRequests: [action.payload.friendRequest, ...state.friendRequests],
                friendRequestsTotalCount: state.friendRequestsTotalCount + 1
            }
        case GET_FRIENDS_REQ:
            return {
                ...state,
                isGetFriendsLoading: true
            }
        case GET_FRIENDS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isGetFriendsLoading: false
            }
        case GET_FRIENDS_FAIL:
            return {
                ...state,
                ...action.payload,
                isGetFriendsLoading: false
            }
        case UNFRIEND_SUCCESS:
            console.log(state.friends)
            console.log(state.friends.filter(f => f._id !== action.payload.uid))
            return {
                ...state,
                user: {
                    ...state.user,
                    friends: state.user.friends.filter(uid => uid !== action.payload.uid)
                },
                friends: state.friends.filter(f => f._id !== action.payload.uid)
            }
        case UNFRIEND_FAIL:
            return {
                ...state,
                ...action.payload 
            }
        default:
            return state;
    }
}

export default authReducer