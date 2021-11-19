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
                        <tr>
                                <td>{submission.createdAt}</td>
                                <td>{submission.quizId}</td>
                                {/* <td>{submission.platformId.name}</td> */}
                                <td>{submission.score}</td>
                                <td>{submission.timeTaken} seconds</td>
                                <td>{submission.point}</td>
                        </tr>
                </tbody>
            </Table>
        </div>

    )


}

export default ReviewSubmission