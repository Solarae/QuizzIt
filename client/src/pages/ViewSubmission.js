import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSubmissions } from "../actions/submissionActions"
import { Container, Table, Row, Col } from "react-bootstrap"
import { useHistory, useParams } from 'react-router-dom';
import Pagination from '../components/Pagination'
import Loading from '../components/Loading'
import moment from 'moment'

function ViewSubmission() {
    const dispatch = useDispatch()
    const user = useSelector((state)=> state.auth.user)
    const submissions = useSelector((state)=> state.submission.submissions)
    const isGetSubmissionLoading = useSelector((state) => state.submission.isGetSubmissionLoading)
    const pages = useSelector((state) => state.submission.pages)
    const [page, setPage] = useState(1)
    const {quizId} = useParams()
    console.log(quizId)
    //fetch the submissions made by this user
    
    useEffect(()=>{
        if (user) {
            dispatch(getSubmissions({
                userId: user.id,
                expand: 'platformId(select=name),quizId(select=name)',
                sort: 'createdAt desc',
                offset: 10 * (page - 1),
                limit: 10,
            }))
        }
    }, [page, user, dispatch])

    const history = useHistory()

    const handleOnclick = (e) =>{
        const submissionId = e.target.getAttribute('submissionId')
        history.push(`/submission/reviewSubmission/${submissionId}`)
    }

    const handlePlatformClick = (id) => history.push(`/platform/${id}`)
    
 
    if (isGetSubmissionLoading) {
        return (<Loading />)
    }

    return(
        <Container>
            <Table striped bordered hover className='mt-5'>
                <thead style={{textAlign: 'center'}}>
                    <tr>
                    <th>Time Submitted</th>
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
                                <tr submissionId={submission._id}>
                                        <td className="display:block" submissionId={submission._id} >{moment(submission.createdAt).fromNow()}</td>
                                        <td submissionId={submission._id} onClick={handleOnclick}>{submission.quizId.name}</td>
                                        <td submissionId={submission._id} onClick={() => handlePlatformClick(submission.platformId._id)}>{submission.platformId.name}</td>
                                        <td submissionId={submission._id}>{submission.score}</td>
                                        <td submissionId={submission._id}>{moment().startOf('day').seconds(submission.timeTaken).format('m:ss')}</td>
                                        <td submissionId={submission._id}>{submission.point}</td>
                                </tr>
                            )
                    })
                    }
                </tbody>
            </Table>

            <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Col>
                    <Pagination page={page} pages={pages} changePage={setPage} />
                </Col>
            </Row>
            
        </Container>
    )
}

export default ViewSubmission