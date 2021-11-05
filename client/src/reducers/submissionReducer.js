import {
    CREATE_SUBMISSION,
    CREATE_SUBMISSION_FAIL,
} from '../actions/types'

const initialState = {}

const submissionReducer = (state=initialState, action) => {
    switch (action.type) {
        case CREATE_SUBMISSION:
            return {
                ...state,
            }
        case CREATE_SUBMISSION_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default submissionReducer