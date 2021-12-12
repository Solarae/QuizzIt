import {
    GET_PLATFORM_REQ,
    CREATE_PLATFORM_REQ,
    EDIT_PLATFORM_REQ,
    DELETE_PLATFORM_REQ,
    JOIN_PLATFORM_REQ,
    LEAVE_PLATFORM_REQ,
    REPORT_PLATFORM_REQ,
    EDIT_MEMBER_ROLE_REQ,
    GET_PLAT_LEADERBOARD_REQ,
    GET_MEMBERLIST_REQ,
    GET_PLATFORM_SUCCESS,
    GET_PLATFORM_FAIL,
    CREATE_PLATFORM_SUCCESS,
    CREATE_PLATFORM_FAIL,
    EDIT_PLATFORM_SUCCESS,
    EDIT_PLATFORM_FAIL,
    EDIT_PLATFORM_IMG_SUCCESS,
    EDIT_PLATFORM_IMG_FAIL,
    DELETE_PLATFORM_SUCCESS,
    DELETE_PLATFORM_FAIL,
    JOIN_PLATFORM_SUCCESS,
    JOIN_PLATFORM_FAIL,
    LEAVE_PLATFORM_SUCCESS,
    LEAVE_PLATFORM_FAIL,
    REPORT_PLATFORM_SUCCESS,
    REPORT_PLATFORM_FAIL,
    EDIT_MEMBER_ROLE_SUCCESS,
    EDIT_MEMBER_ROLE_FAIL,
    GET_PLAT_LEADERBOARD_SUCCESS,
    GET_PLAT_LEADERBOARD_FAIL,
    GET_MEMBERLIST_SUCCESS,
    GET_MEMBERLIST_FAIL,
    SEARCH_PLAT_LEADERBOARD_SUCCESS,
    SEARCH_PLAT_LEADERBOARD_FAIL
} from '../actions/types'

const initialState = {
    isGetLoading: false,
    isCreateLoading: false,
    isEditLoading: false,
    isDeleteLoading: false,
    isJoinLoading: false,
    isLeaveLoading: false,
    isReportLoading: false,
    isEditRoleLoading: false,
    isGetPlatLeaderboardLoading: true,
    isGetMemberListLoading: true,
    platform: null,
    quizzesData: null,
    awardsData: null,
    memberList: [],
    memberListPage: 0,
    memberListPages: 1,
    memberListTotalCount: 0,
    leaderboard: [], 
    leaderboardPage: 0,
    leaderboardPages: 1,
    leaderboardTotalCount: 0,
    errors: null
}

const platformReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PLATFORM_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isGetLoading: false,
                errors: null 
            }
        case GET_PLATFORM_FAIL:
            return {
                ...state,
                ...action.payload,
                isGetLoading: false
            }
        case CREATE_PLATFORM_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isCreateLoading: false,
                errors: null 
            }
        case CREATE_PLATFORM_FAIL:
            return {
                ...state,
                ...action.payload,
                isCreateLoading: false
            }
        case EDIT_PLATFORM_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isEditLoading: false,
                errors: null 
            }
        case EDIT_PLATFORM_FAIL:
            return {
                ...state,
                ...action.payload,
                isEditLoading: false
            }
        case EDIT_PLATFORM_IMG_SUCCESS:
            return {
                ...state,
                ...action.payload,
                errors: null 
            }
        case EDIT_PLATFORM_IMG_FAIL:
            return {
                ...state,
                ...action.payload,
            }
        case DELETE_PLATFORM_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isDeleteLoading: false,
                errors: null 
            }
        case DELETE_PLATFORM_FAIL:
            return {
                ...state,
                ...action.payload,
                isDeleteLoading: false
            }
        case JOIN_PLATFORM_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isJoinLoading: false,
                errors: null 
            }
        case JOIN_PLATFORM_FAIL:
            return {
                ...state,
                ...action.payload,
                isJoinLoading: false
            }
        case LEAVE_PLATFORM_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLeaveLoading: false,
                errors: null 
            }
        case LEAVE_PLATFORM_FAIL:
            return {
                ...state,
                ...action.payload,
                isLeaveLoading: false
            }
        case REPORT_PLATFORM_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isReportLoading: false,
                errors: null 
            }
        case REPORT_PLATFORM_FAIL:
            return {
                ...state,
                ...action.payload,
                isReportLoading: false
            }
        case EDIT_MEMBER_ROLE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isEditRoleLoading: false,
                errors: null 
            }
        case EDIT_MEMBER_ROLE_FAIL:
            return {
                ...state,
                ...action.payload,
                isEditRoleLoading: false,
            }
        case GET_PLAT_LEADERBOARD_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isGetPlatLeaderboardLoading: false,
            }
        case GET_PLAT_LEADERBOARD_FAIL:
            return {
                ...state,
                ...action.payload,
                isGetPlatLeaderboardLoading: false,
            }
        case SEARCH_PLAT_LEADERBOARD_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isGetPlatLeaderboardLoading: false,
            }
        case SEARCH_PLAT_LEADERBOARD_FAIL:
            return {
                ...state,
                ...action.payload,
                isGetPlatLeaderboardLoading: false,
            }
        case GET_MEMBERLIST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isGetMemberlistLoading: false,
            }
        case GET_MEMBERLIST_FAIL:
            return {
                ...state,
                ...action.payload,
                isGetMemberlistLoading: false,
            }
        case GET_PLATFORM_REQ:
            return {
                ...state,
                isGetLoading: true 
            }
        case CREATE_PLATFORM_REQ:
            return {
                ...state,
                isCreateLoading: true 
            }
        case EDIT_PLATFORM_REQ:
            return {
                ...state,
                isEditLoading: true 
            }
        case DELETE_PLATFORM_REQ:
            return {
                ...state,
                isDeleteLoading: true 
            }
        case JOIN_PLATFORM_REQ:
            return {
                ...state,
                isJoinLoading: true 
            }
        case LEAVE_PLATFORM_REQ:
            return {
                ...state,
                isLeaveLoading: true 
            }
        case REPORT_PLATFORM_REQ:
            return {
                ...state,
                isReportLoading: true 
            }
        case EDIT_MEMBER_ROLE_REQ:
            return {
                ...state,
                isEditRoleLoading: true 
            }
        case GET_PLAT_LEADERBOARD_REQ:
            return {
                ...state,
                isGetPlatLeaderboardLoading: true 
            }
        case GET_MEMBERLIST_REQ:
            return {
                ...state,
                isGetMemberlistLoading: true 
            }
        default:
            return state;
    }
}

export default platformReducer;