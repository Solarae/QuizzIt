import { DELETE_REPORT_FAIL, DELETE_REPORT_SUCCESS, GET_PLATFORM_REPORT_FAIL, GET_PLATFORM_REPORT_SUCCESS } from "../actions/types"




const initialState = {
    report:null,
    isLoading:true,
    page: 0,
    pages: 1,
}



const reportReducer = (state = initialState,action) => {

    switch(action.type){


        case GET_PLATFORM_REPORT_SUCCESS:
            return{
                ...state,
                ...action.payload,
                isLoading:false
            }

        case GET_PLATFORM_REPORT_FAIL:
            return{
                ...state,
                ...action.payload,
                isLoading:false
            }
        
        case DELETE_REPORT_SUCCESS:
            return{
                ...state,
                ...action.payload
            }
        case DELETE_REPORT_FAIL:
            return{
                ...state,
                ...action.payload
            }

        default:
            return state




    }


}

export default reportReducer