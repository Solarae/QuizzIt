import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOneSubmission, getSubmissions } from "../actions/submissionActions"
import { Table } from "react-bootstrap"
import { useParams } from "react-router"
import axios from "axios"
import { URL } from "../config"


function ReviewSubmission() {
    
    const dispatch = useDispatch()

    let user = useSelector((state)=> state.auth.user  )
    let {id} = useParams()
    let submission = useSelector((state)=>state.submission.singleSubmission)
    let isLoading = useSelector((state)=> state.submission.isLoadingSingle)



    




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
            <ol>
                {submission.quizId.questions.map((question)=>{
                    return <li> {question.question} </li>
                })}
            </ol>

            <h2>Attempted Answers</h2>
            <ol>
                {submission.answers.map((answer)=>{

                   return <li>  {answer}  </li>
                })}

            </ol>
        
        </div>

    )


}

export default ReviewSubmission