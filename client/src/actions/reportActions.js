import axios from "axios"
import { URL } from "../config"
import { GET_PLATFORM_REPORT_FAIL, GET_PLATFORM_REPORT_SUCCESS ,DELETE_REPORT_SUCCESS,DELETE_REPORT_FAIL } from "./types"




export const getPlatformReport = () => async (dispatch) =>  {

    let res = await axios.get(`${URL}/api/reports`)


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


export const deletePlatformReport = ({id}) => async (dispatch) => {
    let res = await axios.delete(`${URL}/api/reports/deleteReport/${id}`)


    try {
        dispatch({
            type:DELETE_REPORT_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:DELETE_REPORT_FAIL,
            payload:res.data
        })
    }


}


export const deleteManyPlatformReport = ({platformId,userId,confirmPassword}) =>async(dispatch) =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const body = JSON.stringify({ userId, confirmPassword })
    

    let res = await axios.post(`${URL}/api/reports/deleteManyPlatformReport/${platformId}`,body,config)   
    console.log(res.data)
    try {
        dispatch({
            type:DELETE_REPORT_SUCCESS,
            payload:res.data
        })
        

    } catch (error) {
        dispatch({
            type:DELETE_REPORT_FAIL,
            payload:res.data
        })
    }




}


export const getQuizReport = ({id})=> async(dispatch) =>{

    let res = await axios.get(`${URL}/api/reports/getQuizReport/${id}`)
    console.log(res.data)
    dispatch({
        type:GET_PLATFORM_REPORT_SUCCESS,
        payload:res.data
    })   


}