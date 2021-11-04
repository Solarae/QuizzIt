import {
    CREATE_AWARD_REQ,
    CREATE_AWARD_SUCCESS,
    CREATE_AWARD_FAIL,
    EDIT_AWARD_REQ,
    EDIT_AWARD_SUCCESS,
    EDIT_AWARD_FAIL,
} from '../actions/types'

const initialState = {
    isCreateLoading: false,
    isEditLoading: false,
    award: null,
    errors: null
}

const awardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_AWARD_REQ:
            return {
                ...state,
                isCreateLoading: true 
            }
        case CREATE_AWARD_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isCreateLoading: false,
                errors: null 
            }
        case CREATE_AWARD_FAIL:
            return {
                ...state,
                ...action.payload,
                isCreateLoading: false
            }
        case EDIT_AWARD_REQ:
            return {
                ...state,
                isEditLoading: true 
            }
        case EDIT_AWARD_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isEditLoading: false,
                errors: null 
            }
        case EDIT_AWARD_FAIL:
            return {
                ...state,
                ...action.payload,
                isEditLoading: false
            }
        default:
            return state;
    }
}

export default awardReducer;