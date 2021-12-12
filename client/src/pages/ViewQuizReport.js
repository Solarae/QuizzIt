import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneSubmission, getSubmissions } from "../actions/submissionActions"
import { Col, Container, ListGroup, Table,Row } from "react-bootstrap"
import { useParams } from "react-router"
import axios from "axios"
import { URL } from "../config"
import SubmissionCard from "../components/Submission/SubmissionCard"
import { getPlatformReport, getQuizReport } from "../actions/reportActions"
import ReportCard from "../components/Report/ReportCard"
import Pagination from "../components/Pagination"


function ViewQuizReport() {
    
    const dispatch = useDispatch()

    let user = useSelector((state)=> state.auth.user  )
    let reports = useSelector((state)=>state.report.report)
    

    let isLoading = useSelector((state)=> state.report.isLoading)
    const pages = useSelector((state) => state.report.pages)
    const [page, setPage] = useState(1)
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
                    dispatch(getQuizReport({
                        id,
                        query:{
                            userId: user.id,
                            expand: 'platformId(select=name),quizId(select=name),submittedBy(select=username)',
                            sort: 'timeSubmitted desc',
                            offset: 10 * (page - 1),
                            limit: 10,
                        }
                    
                    }))
                    console.log(reports)
                }
            }
        }

        fetchData()

    },[dispatch,user,page,pages])


    if (isLoading) {
        return ( <div> Loading... </div> )
    }


    console.log(reports)

    return(
        <>

            <Container className="row justify-content-center">


                <Col xs={7} className="g-4">
                    {reports ? 
                    reports.length>0 ?
                        reports.map( (report,idx) => {
                                return( 
                                    <>
                                        <Col>
                                            <ReportCard page={page} user={user} report={report}  ></ReportCard>
                                        </Col>
                                    </>
                                )
                        })
                        :<h1>There are no quiz reports right now for this platform</h1>

                    :
                    <h1>loading</h1>}
                    
                </Col>
                <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Col>
                        <Pagination page={page} pages={pages} changePage={setPage} />
                    </Col>
                </Row>
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