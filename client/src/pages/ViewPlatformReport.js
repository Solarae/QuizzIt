import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneSubmission, getSubmissions } from "../actions/submissionActions"
import { Col, Container, ListGroup, Table,Row } from "react-bootstrap"
import { useParams } from "react-router"
import axios from "axios"
import { URL } from "../config"
import SubmissionCard from "../components/Submission/SubmissionCard"
import { getPlatformReport } from "../actions/reportActions"
import ReportCard from "../components/Report/ReportCard"
import Pagination from "../components/Pagination"


function ViewPlatformReport() {
    
    const dispatch = useDispatch()

    let user = useSelector((state)=> state.auth.user  )
    let reports = useSelector((state)=>state.report.report)
    const pages = useSelector((state) => state.report.pages)
    

    let isLoading = useSelector((state)=> state.report.isLoading)
    const [page, setPage] = useState(1)


    //fetch the reports that belong to the specified platform
    useEffect(()=>{
        console.log("calling use effect")

        const fetchData = async () =>{
            if(user){
                //check if user is admin
                let res = await axios.get(`${URL}/api/users/checkIfAdmin/${user.id}`)
                console.log("calling dispatch")
                if (res.data && res.data.user){
                    dispatch(getPlatformReport({
                        userId: user.id,
                        expand: 'platformId(select=name),quizId(select=name),submittedBy(select=username)',
                        sort: 'timeSubmitted desc',
                        offset: 10 * (page - 1),
                        limit: 10,
                    }))
                }
            }
        }

        fetchData()

    },[dispatch,user,page,pages])


    if (isLoading) {
        return ( <div> Loading... </div> )
    }


    console.log(reports)
    console.log(pages)
    console.log(page)



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
                            }):
                            <h1>No platform reports at this moment</h1>
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

export default ViewPlatformReport