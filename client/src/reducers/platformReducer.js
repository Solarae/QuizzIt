import {
    GET_PLATFORM_REQ,
    CREATE_PLATFORM_REQ,
    EDIT_PLATFORM_REQ,
    DELETE_PLATFORM_REQ,
    JOIN_PLATFORM_REQ,
    LEAVE_PLATFORM_REQ,
    REPORT_PLATFORM_REQ,
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
    UPVOTE_PLATFORM,
    DOWNVOTE_PLATFORM
} from '../actions/types'

const initialState = {
    isGetLoading: false,
    isCreateLoading: false,
    isEditLoading: false,
    isDeleteLoading: false,
    isJoinLoading: false,
    isLeaveLoading: false,
    isReportLoading: false,
    platform: null,
    quizzesData: null,
    awardsData: null,
    memberList: null,
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
        case UPVOTE_PLATFORM:
            return {
                ...state,
                ...action.payload
            }

        case DOWNVOTE_PLATFORM:
            return{
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default platformReducer;