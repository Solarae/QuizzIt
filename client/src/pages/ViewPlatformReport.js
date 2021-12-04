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


function ViewPlatformReport() {
    
    const dispatch = useDispatch()

    let user = useSelector((state)=> state.auth.user  )
    let reports = useSelector((state)=>state.report.report)
    

    let isLoading = useSelector((state)=> state.report.isLoading)



    //fetch the reports that belong to the specified platform
    useEffect(()=>{
        console.log("calling use effect")

        const fetchData = async () =>{
            if(user){
                //check if user is admin
                let res = await axios.get(`${URL}/api/users/checkIfAdmin/${user.id}`)

                if (res.data && res.data.user){
                    dispatch(getPlatformReport())
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

export default ViewPlatformReport