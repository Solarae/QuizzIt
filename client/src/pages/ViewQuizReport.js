import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneSubmission, getSubmissions } from "../actions/submissionActions"
import { Col, Container, ListGroup, Table } from "react-bootstrap"
import { useParams } from "react-router"
import axios from "axios"
import { URL } from "../config"
import SubmissionCard from "../components/Submission/SubmissionCard"
import { getPlatformReport, getQuizReport } from "../actions/reportActions"
import ReportCard from "../components/Report/ReportCard"


function ViewQuizReport() {
    
    const dispatch = useDispatch()

    let user = useSelector((state)=> state.auth.user  )
    let reports = useSelector((state)=>state.report.report)
    

    let isLoading = useSelector((state)=> state.report.isLoading)
    //get platform id
    let {id} = useParams()


    //fetch the reports that belong to the specified quiz
    useEffect(()=>{
        console.log("calling use effect")

        const fetchData = async () =>{
            if(user){
                //check if user is moderator of platform
                let res = await axios.get(`${URL}/api/users/checkIfModeratorOfPlatform/${user.id}/${id}`)
                console.log(res.data)
                if (res.data && res.data.user){
                    dispatch(getQuizReport({id}))
                    console.log(reports)
                }
            }
        }

        fetchData()

    },[dispatch,user])


    if (isLoading) {
        return ( <div> Loading... </div> )
    }


    console.log(reports)

    return(
        <>

            <Container className="row justify-content-center">


                <Col xs={7} className="g-4">
                    {reports ? 
                    
                    reports.map( (report,idx) => {
                            return( 
                                <>
                                    <Col>
                                        <ReportCard user={user} report={report}  ></ReportCard>
                                    </Col>
                                </>
                            )
                    })
                    :
                    <h1>loading</h1>}
                    
                </Col>

            </Container>
        </>

    )
    

   
    


    return(
        <>
            hi
        </>
    )

   


}

export default ViewQuizReport