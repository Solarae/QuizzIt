import Platform from "../models/Platform"
import Quiz from "../models/Quiz"
import Submission from "../models/Submissions"
import User from "../models/User"

export const createSubmission = async (req,res) =>{
    let {quizId,answers,pointsAwarded,platformId,userId,score,timeTaken} = req.body

    try {

        let quiz = await Quiz.findById(quizId)
        if(!quiz) return res.status(400).json({message:"Quiz id not found"})

        let user = await User.findById(userId)
        if(!user) return res.status(400).json({message:"User id not found"})


        let newSubmission = new Submission({
            quizId:quizId,
            answers:answers,
            pointsAwarded:pointsAwarded,
            platformId:platformId,
            userId:userId,
            score:score,
            timeTaken,
        })
        
        //save submission
        let created_submission = await newSubmission.save()

        //save submission to quiz 
        quiz.submittions.push(created_submission)
        await quiz.save()

        //save submission to user
        user.submissions.push(created_submission)
        await user.save()


        res.status(200).json({submission:created_submission})



    } catch (error) {
        res.status(500).json({message:error})
    }    

}




export const getAllSubmissions = async (req,res)=>{

}