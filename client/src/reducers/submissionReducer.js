import {
    CREATE_SUBMISSION,
    CREATE_SUBMISSION_FAIL,
    GET_SUBMISSION_FAIL,
    GET_SUBMISSION_SUCCESS,
} from '../actions/types'

const initialState = {
    submission:null
}

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
            
        case GET_SUBMISSION_SUCCESS:
            return{
                ...state,
                ...action.payload
            }
        
        case GET_SUBMISSION_FAIL:
            return{
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export default submissionReducer