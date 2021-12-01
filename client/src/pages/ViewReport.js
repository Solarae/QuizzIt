import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneSubmission, getSubmissions } from "../actions/submissionActions"
import { Col, Container, ListGroup, Table } from "react-bootstrap"
import { useParams } from "react-router"
import axios from "axios"
import { URL } from "../config"
import SubmissionCard from "../components/Submission/SubmissionCard"
import { getPlatformReport } from "../actions/reportActions"
import ReportCard from "../components/Report/ReportCard"


function ViewReport() {
    
    const dispatch = useDispatch()

    let user = useSelector((state)=> state.auth.user  )
    let {id} = useParams()
    let reports = useSelector((state)=>state.report.report)
    

    let isLoading = useSelector((state)=> state.report.isLoading)



    //fetch the reports that belong to the specified platform
    useEffect(()=>{
        console.log("calling use effect")

        const checkIfModerator = async () =>{
            console.log("calling this func")
            //check if user is moderator for this platform
            if(user){
                console.log("here")
                let res = await axios.get(`${URL}/api/reports/checkIfModeratorOfPlatform/${user.id}/${id}`)
                
                //proceed to fetch report if user is moderator of this platform

                // console.log(res)
                //if res.user is null,it means that user is not moderator
                if(res.data.user){
                    console.log("is true")
                    return true
                }else{
                    console.log("is false")
                    return false
                }

            }
            return false
        }


        if(checkIfModerator()){
            dispatch(getPlatformReport({
                id
            }))
        }

    },[dispatch,user])


    if (isLoading) {
        return ( <div> Loading... </div> )
    }


    console.log(reports)



    if(reports){
        return(
            <>
    
                <Container className="row justify-content-center">
    
    
                    <Col xs={7} className="g-4">
    
                        {reports.map( (report,idx) => {
                                return( 
                                    <>
                                        <Col>
                                            <ReportCard report={report}></ReportCard>
                                        </Col>
                                    </>
                                )
                        })}
    
                        
                    </Col>
    
                </Container>
            </>
    
        )
    }


    return(
        <>
            hi
        </>
    )

   


}

export default ViewReport