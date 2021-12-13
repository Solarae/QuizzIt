import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getQuizSubmission, getSubmissions } from "../actions/submissionActions"
import { Table, Row, Col } from "react-bootstrap"
import { useHistory, useParams } from 'react-router-dom';
import Pagination from '../components/Pagination'

function ViewSubmission() {
    const dispatch = useDispatch()
    const user = useSelector((state)=> state.auth.user)
    const submissions = useSelector((state)=> state.submission.submissions)
    const isGetSubmissionLoading = useSelector((state) => state.submission.isGetSubmissionLoading)
    const pages = useSelector((state) => state.submission.pages)
    const [page, setPage] = useState(1)
    const {id} = useParams()
    console.log(id)
    //fetch the submissions made by this user
    
    useEffect(()=>{
        if (user) {
            dispatch(getQuizSubmission({
                    userId:user.id,
                    quizId:id
            }))
        }
    }, [page, user, dispatch])

    const history = useHistory()

    const handleOnclick = (e) =>{
        const submissionId = e.target.getAttribute('submissionId')
        history.push(`/submission/reviewSubmission/${submissionId}`)
    }

    if (isGetSubmissionLoading) {
        return ( <div> Loading... </div> )
    }

    return(
        <div>
            <Row>
            <Table striped bordered hover className='mt-5'>
                <thead>
                    <tr>
                    <th>Time submitted</th>
                    <th>Quiz</th>
                    <th>Platform</th>
                    <th>Score</th>
                    <th>Time</th>
                    <th>Point</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((submission)=>{
                        return( 
                                <tr submissionId={submission._id} onClick={handleOnclick}>
                                        <td className="display:block" submissionId={submission._id} >{submission.createdAt}</td>
                                        <td submissionId={submission._id}>{submission.quizId.name}</td>
                                        <td submissionId={submission._id}>{submission.platformId.name}</td>
                                        <td submissionId={submission._id}>{submission.score}</td>
                                        <td submissionId={submission._id}>{submission.timeTaken} seconds</td>
                                        <td submissionId={submission._id}>{submission.point}</td>
                                </tr>
                            )
                    })
                    }
                </tbody>
            </Table>
            </Row>

            <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Col>
                    <Pagination page={page} pages={pages} changePage={setPage} />
                </Col>
            </Row>
            
        </div>
    )
}

export default ViewSubmission