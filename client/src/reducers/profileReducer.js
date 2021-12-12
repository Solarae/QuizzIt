import {
    GET_PROFILE_REQ,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
} from '../actions/types'

const initialState = {
    profile: null,
    subscribedPlatforms: [],
    likedQuizzes: [],
    awards: [],
    createdPlatforms: [],
    isGetProfileLoading: false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_REQ:
            return {
                ...state,
                isGetProfileLoading: true
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isGetProfileLoading: false
            }
        case GET_PROFILE_FAIL:
            return {
                ...initialState,
                user: null,
                isGetProfileLoading: false
            }
        default:
            return state;
    }
}

export default profileReducer 