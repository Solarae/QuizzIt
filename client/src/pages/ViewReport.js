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
    let reports = useSelector((state)=>state.report.report)
    
    const [reportState,setReportState] = useState([])

    let isLoading = useSelector((state)=> state.report.isLoading)



    //fetch the reports that belong to the specified platform
    useEffect(()=>{
        console.log("calling use effect")
        // const checkIfAdmin = async () =>{
        //     console.log(user.id)
        //     //check if user is admin
        //     let res = await axios.get(`${URL}/api/users/checkIfAdmin/${user.id}`)
            
        //     //proceed to fetch report if user is moderator of this platform

        //     //if res.user is null,it means that user is not moderator
        //     if(res.data && res.data.user){
        //         console.log("is true")
        //         return true
        //     }else{
        //         console.log("is false")
        //         return false
        //     }
        // }


        if(user){
            dispatch(getPlatformReport())
            console.log(reports)
            setReportState(reports)
            console.log(reportState)
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
    
                        {reportState ? 
                        
                        reportState.map( (report,idx) => {
                                return( 
                                    <>
                                        <Col>
                                            <ReportCard user={user} id={report._id} report={report} reportState={reportState} setReportState={setReportState}   ></ReportCard>
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
    }

   
    


    return(
        <>
            hi
        </>
    )

   


}

export default ViewReport