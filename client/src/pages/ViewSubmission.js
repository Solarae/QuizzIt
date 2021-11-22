import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSubmissions } from "../actions/submissionActions"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useHistory } from 'react-router-dom';


function ViewSubmission() {
    
    const dispatch = useDispatch()

    let user = useSelector((state)=> state.auth.user)
    let submission = useSelector((state)=> state.submission.submission)
    const isLoading = useSelector((state) => state.submission.isLoading)
    console.log(submission)
    // let id = user.id



    //fetch the submissions made by this user
    useEffect(()=>{
        if(user){
            dispatch(getSubmissions({
                id:user.id
            }))
        }
    },[dispatch,user])

    const history = useHistory()

    const handleOnclick = (e) =>{
        let submissionId = e.target.getAttribute('submissionId')
        
        history.push(`/submission/reviewSubmission/${submissionId}`)

    }



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
        </div>

    )


}

export default ViewSubmission