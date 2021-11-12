import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSubmissions } from "../actions/submissionActions"



function ViewSubmission() {
    
    const dispatch = useDispatch()

    let user = useSelector((state)=> state.auth.user)
    let submission = useSelector((state)=> state.submission.submissions)

    console.log(submission)
    let id = user.id



    //fetch the submissions made by this user
    useEffect(()=>{
        dispatch(getSubmissions({
            id
        }))
    },[dispatch])



    return(

        <div>
            <h1>Welcome, {user.id}</h1>


        </div>

    )


}

export default ViewSubmission