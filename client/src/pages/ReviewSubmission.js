import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSubmission } from "../actions/submissionActions"
import { Col, Container } from "react-bootstrap"
import { useParams } from "react-router"
import SubmissionCard from "../components/Submission/SubmissionCard"

function ReviewSubmission() {
    const dispatch = useDispatch()
    const user = useSelector((state)=> state.auth.user  )
    const {id} = useParams()
    const submission = useSelector((state)=>state.submission.submission)

    const isGetSubmissionLoading = useSelector((state)=> state.submission.isGetSubmissonLoadingSingle)

    //fetch the submission id
    useEffect(()=>{
        console.log("CALLING DISPATCH")
        if(user)
            dispatch(getSubmission({
                id,
                query: {
                    expand: 'platformId(select=name),quizId(select=name,questions)'
                }
            }))
    },[dispatch,user])

    if (isGetSubmissionLoading || submission==null) {
        return ( <div> Loading... </div> )
    }
    console.log(submission)
    return(
        <>
            <h2>Your score:{submission.score}/{submission.quizId.questions.length}</h2>
            <h2>Total time taken: {submission.timeTaken} seconds </h2>
            <Container className="row justify-content-center">

                {/* <ListGroup variant="flush">
                    {submission.quizId.questions.map((question,idx)=>{
                        return <ListGroup.Item variant={question.answer === submission.answers[idx] ? 'primary':'danger'  }> {question.question}    <h5>YOUR RESPONSE:{submission.answers[idx]}</h5> </ListGroup.Item>
                    })}
                </ListGroup> */}

                <Col xs={7} className="g-4">
                    {submission.quizId.questions.map( (question,idx) => {
                            return( 
                                <>
                                    <Col>
                                        <SubmissionCard question={question} idx={idx} submission={submission} ></SubmissionCard>
                                    </Col>
                                </>
                            )
                    })}
                </Col>

            </Container>
        </>

    )

}

export default ReviewSubmission