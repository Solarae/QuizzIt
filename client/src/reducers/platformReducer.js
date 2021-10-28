import {
    CREATE_PLATFORM_SUCCESS,
    CREATE_PLATFORM_FAIL,
    DELETE_PLATFORM_SUCCESS,
    DELETE_PLATFORM_FAIL,
    JOIN_PLATFORM_SUCCESS,
    JOIN_PLATFORM_FAIL,
    LEAVE_PLATFORM_SUCCESS,
    LEAVE_PLATFORM_FAIL,
    REPORT_PLATFORM_SUCCESS,
    REPORT_PLATFORM_FAIL
} from '../actions/types'

const initialState = {
    platformId: null
}

const platformReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PLATFORM_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case CREATE_PLATFORM_FAIL:
            return state;
        default:
            return state;
    }
}

export default platformReducer;