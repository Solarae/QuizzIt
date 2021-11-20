import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneSubmission, getSubmissions } from "../actions/submissionActions"
import { Col, Container, ListGroup, Table } from "react-bootstrap"
import { useParams } from "react-router"
import axios from "axios"
import { URL } from "../config"
import SubmissionCard from "../components/Submission/SubmissionCard"


function ReviewSubmission() {
    
    const dispatch = useDispatch()

    let user = useSelector((state)=> state.auth.user  )
    let {id} = useParams()
    let submission = useSelector((state)=>state.submission.singleSubmission)
    



    let isLoading = useSelector((state)=> state.submission.isLoadingSingle)


    




    //fetch the submission id
    useEffect(()=>{

        if(user)
            dispatch(getOneSubmission({
                id
            }))
    },[dispatch,user])

    console.log(submission)



    if (isLoading) {
        return ( <div> Loading... </div> )
    }




    return(
        <>
            <Container className="row justify-content-center">
                <h1> Below shows your attempt of the quiz </h1>

                <h2>Questions</h2>

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




                <h2>YOUR SCORE:{submission.score}/{submission.quizId.questions.length}</h2>

            
            </Container>
        </>

    )


}

export default ReviewSubmission