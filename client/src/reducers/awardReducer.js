import {
    CREATE_AWARD_REQ,
    CREATE_AWARD_SUCCESS,
    CREATE_AWARD_FAIL,
    EDIT_AWARD_REQ,
    EDIT_AWARD_SUCCESS,
    EDIT_AWARD_FAIL,
    DELETE_AWARD_REQ,
    DELETE_AWARD_SUCCESS,
    DELETE_AWARD_FAIL,
    GET_AWARDS_REQ,
    GET_AWARDS_SUCCESS,
    GET_AWARDS_FAIL,
    SET_AWARD_PAGE
} from '../actions/types'

const initialState = {
    isCreateLoading: false,
    isEditLoading: false,
    isDeleteLoading: false,
    isGetAwardsLoading: true,
    awards: [],
    awardPage: 1,
    awardPages: 0,
    awardTotalCount: 0,
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
                awards: [action.payload.award, ...state.awards],
                awardTotalCount: state.awardTotalCount + 1,
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
            const newAwards = [...state.awards]
            const index = newAwards.findIndex(a => a._id === action.payload.award._id);
            newAwards[index] = action.payload.award;
            return {
                ...state,
                awards: newAwards,
                isEditLoading: false,
                errors: null
            }
        case EDIT_AWARD_FAIL:
            return {
                ...state,
                ...action.payload,
                isEditLoading: false
            }
        case DELETE_AWARD_REQ:
            return {
                ...state,
                isDeleteLoading: true
            }
        case DELETE_AWARD_SUCCESS:
            return {
                ...state,
                awards: state.awards.filter(a => a._id !== action.payload.award._id),
                awardTotalCount: state.awardTotalCount - 1,
                isDeleteLoading: false,
                errors: null
            }
        case DELETE_AWARD_FAIL:
            return {
                ...state,
                ...action.payload,
                isDeleteLoading: false
            }
        case GET_AWARDS_REQ:
            return {
                ...state,
                isGetAwardsLoading: true 
            }
        case GET_AWARDS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                awards: action.payload.awards,
                awardPage: action.payload.page,
                awardPages: action.payload.pages,
                awardTotalCount: action.payload.totalCount,
                isGetAwardsLoading: false,
            }
        case GET_AWARDS_FAIL:
            return {
                ...state,
                ...action.payload,
                isGetAwardsLoading: false,
            }
        case SET_AWARD_PAGE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default awardReducer;