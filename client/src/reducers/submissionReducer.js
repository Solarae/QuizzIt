import {
    CREATE_SUBMISSION,
    CREATE_SUBMISSION_FAIL,
    GET_ONE_SUBMISSION_FAIL,
    GET_ONE_SUBMISSION_SUCCESS,
    GET_SUBMISSION_FAIL,
    GET_SUBMISSION_SUCCESS,
    GET_SUBMISSIONS_REQ,
    GET_SUBMISSIONS_SUCCESS,
    GET_SUBMISSIONS_FAIL
} from '../actions/types'

const initialState = {
    submissions: [],
    page: 0,
    pages: 1,
    totalCount: 0 ,
    submission: null,
    isGetSubmissionLoading:true,
    isGetSubmissionsLoading: false,
    singleSubmission:null,
    isGetSubmissionLoadingSingle:true
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
                ...action.payload,
                isGetSubmissionLoading:false,
            }
        case GET_SUBMISSION_FAIL:
            return{
                ...state,
                ...action.payload
            }
        case GET_SUBMISSIONS_REQ:
            return {
                ...state,
                isGetSubmissionsLoading: true
            }
        case GET_SUBMISSIONS_SUCCESS:
            return{
                ...state,
                ...action.payload,
                isGetSubmissionsLoading: false,
            }
        case GET_SUBMISSIONS_FAIL:
            return{
                ...state,
                ...action.payload,
                isGetSubmissionsLoading:false,
            }
        case GET_ONE_SUBMISSION_SUCCESS:
            return{
                ...state,
                ...action.payload,
                isGetSubmissionLoadingSingle:false,
            }
        case GET_ONE_SUBMISSION_FAIL:
            return{
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default submissionReducer