import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSubmissions } from "../actions/submissionActions"
import { Table } from "react-bootstrap"


function ViewSubmission() {
    
    const dispatch = useDispatch()

    let user = useSelector((state)=> state.auth.user  )
    let submission = useSelector((state)=> state.submission.submission)
    const isLoading = useSelector((state) => state.submission.isLoading)
    console.log(submission)
    let id = user.id



    //fetch the submissions made by this user
    useEffect(()=>{
        dispatch(getSubmissions({
            id
        }))
    },[dispatch,id])

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
                    {submission.map((submission)=>{
                        return( 
                            <tr>
                                    <td>{submission.createdAt}</td>
                                    <td>{submission.quizId.name}</td>
                                    <td>{submission.platformId.name}</td>
                                    <td>{submission.score}</td>
                                    <td>{submission.timeTaken} seconds</td>
                                    <td>{submission.point}</td>
                            </tr>
                        )
                    })

                    }
                </tbody>
            </Table>
        </div>

    )


}

export default ViewSubmission