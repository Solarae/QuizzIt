import axios from "axios"
import { URL } from "../config"
import { GET_PLATFORM_REPORT_FAIL, GET_PLATFORM_REPORT_SUCCESS } from "./types"




export const getPlatformReport = ({id}) => async (dispatch) =>  {

    let res = await axios.get(`${URL}/api/reports/getPlatformReport/${id}`)


    try {
        console.log(res.data)
        dispatch({
            type:GET_PLATFORM_REPORT_SUCCESS,
            payload:res.data
        })   

    } catch (error) {
        
        dispatch({
            type:GET_PLATFORM_REPORT_FAIL,
        })


    }




}