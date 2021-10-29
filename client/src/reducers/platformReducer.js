import {
    GET_PLATFORM_REQ,
    CREATE_PLATFORM_REQ,
    DELETE_PLATFORM_REQ,
    JOIN_PLATFORM_REQ,
    LEAVE_PLATFORM_REQ,
    REPORT_PLATFORM_REQ,
    GET_PLATFORM_SUCCESS,
    GET_PLATFORM_FAIL,
    CREATE_PLATFORM_SUCCESS,
    CREATE_PLATFORM_FAIL,
    DELETE_PLATFORM_SUCCESS,
    DELETE_PLATFORM_FAIL,
    JOIN_PLATFORM_SUCCESS,
    JOIN_PLATFORM_FAIL,
    LEAVE_PLATFORM_SUCCESS,
    LEAVE_PLATFORM_FAIL,
    REPORT_PLATFORM_SUCCESS,
    REPORT_PLATFORM_FAIL,
    PLATFORM_REQ_LOADING
} from '../actions/types'

const initialState = {
    "GET_PLATFORM": { loading: false },
    "CREATE_PLATFORM": { loading: false },
    "DELETE_PLATFORM": { loading: false },
    "JOIN_PLATFORM": { loading: false },
    "LEAVE_PLATFORM": { loading: false },
    "REPORT_PLATFORM": { loading: false }
}

function getActionName(actionType) {
    if (typeof actionType !== 'string') {
        return null;
    }

    return actionType
        .split("_")
        .slice(0, -1)
        .join("_");
}

const platformReducer = (state = initialState, action) => {
    const type = action.type;
    const actionName = getActionName(action.type);

    if (type.endsWith("_REQ")) {
        return {
            ...state,
            [actionName]: {
                loading: true
            }
        };
    }

    switch (action.type) {
        case GET_PLATFORM_SUCCESS:
            return {
                ...state,
                "GET_PLATFORM": {
                    loading: false,
                    ...action.payload
                }
            }
        case GET_PLATFORM_FAIL:
            return {
                ...state,
                ...action.payload,
                "GET_PLATFORM": {
                    loading: false,
                    ...action.payload
                }
            }
        case CREATE_PLATFORM_SUCCESS:
            return {
                ...state,
                "CREATE_PLATFORM": {
                    loading: false,
                    ...action.payload
                }
            }
        case CREATE_PLATFORM_FAIL:
            return {
                ...state,
                "CREATE_PLATFORM": {
                    loading: false,
                    ...action.payload
                }
            }
        default:
            return state;
    }
}

export default platformReducer;