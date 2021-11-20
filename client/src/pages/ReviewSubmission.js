import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneSubmission, getSubmissions } from "../actions/submissionActions"
import { ListGroup, Table } from "react-bootstrap"
import { useParams } from "react-router"
import axios from "axios"
import { URL } from "../config"


function ReviewSubmission() {
    
    const dispatch = useDispatch()

    let user = useSelector((state)=> state.auth.user  )
    let {id} = useParams()
    let submission = useSelector((state)=>state.submission.singleSubmission)
    



    let isLoading = useSelector((state)=> state.submission.isLoadingSingle)


    console.log(user.id)
    




    //fetch the submission id
    useEffect(()=>{
        dispatch(getOneSubmission({
            id
        }))
    },[])

    console.log(submission)



    if (isLoading) {
        return ( <div> Loading... </div> )
    }




    return(

        <div>
            <h1> Below shows your attempt of the quiz </h1>

            <h2>Questions</h2>

            <ListGroup variant="flush">
                 {submission.quizId.questions.map((question,idx)=>{
                    return <ListGroup.Item variant={question.answer === submission.answers[idx] ? 'primary':'danger'  }> {question.question}    <h5>YOUR RESPONSE:{submission.answers[idx]}</h5> </ListGroup.Item>
                })}
            </ListGroup>




            <h2>YOUR SCORE:{submission.score}/{submission.quizId.questions.length}</h2>

        
        </div>

    )


}

export default ReviewSubmission