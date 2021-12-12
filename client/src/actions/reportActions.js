import axios from "axios"
import { URL } from "../config"
import { GET_PLATFORM_REPORT_FAIL, GET_PLATFORM_REPORT_SUCCESS ,DELETE_REPORT_SUCCESS,DELETE_REPORT_FAIL } from "./types"




export const getPlatformReport = (query) => async (dispatch) =>  {
    const config = {
        params: {
            ...query
        }
    }
    let res = await axios.get(`${URL}/api/reports`,config)
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


export const deletePlatformReport = ({id,query}) => async (dispatch) => {
    console.log(id)
    await axios.delete(`${URL}/api/reports/deleteReport/${id}`)
    const config = {
        params: {
            ...query
        }
    }
    let res = await axios.get(`${URL}/api/reports`,config)

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

export const deleteQuizReport = ({id,query}) => async (dispatch) => {
    await axios.delete(`${URL}/api/reports/deleteQuizReport/${id}`)
    const config = {
        params: {
            ...query
        }
    }
    let res = await axios.get(`${URL}/api/reports/getQuizReport/${id}`,config)


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


export const deleteManyPlatformReport = ({platformId,userId,confirmPassword,query}) =>async(dispatch) =>{
    let config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const body = JSON.stringify({ userId, confirmPassword })
    

    await axios.post(`${URL}/api/reports/deleteManyPlatformReport/${platformId}`,body,config)  
    config = {
        params: {
            ...query
        }
    }
    let res = await axios.get(`${URL}/api/reports`,config) 
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

export const deleteManyQuizReport = ({quizId,userId}) =>async(dispatch) =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const body = JSON.stringify({ userId })
    

    let res = await axios.post(`${URL}/api/reports/deleteManyQuizReport/${quizId}`,body,config)   
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


export const getQuizReport = ({id,query})=> async(dispatch) =>{
    const config = {
        params: {
            ...query
        }
    }
    let res = await axios.get(`${URL}/api/reports/getQuizReport/${id}`,config)
    console.log(res.data)
    dispatch({
        type:GET_PLATFORM_REPORT_SUCCESS,
        payload:res.data
    })   


}