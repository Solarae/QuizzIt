import Platform from "../models/Platform.js"
import Quiz from "../models/Quiz.js"
import Submission from "../models/Submission.js"
import User from "../models/User.js"

export const createSubmission = async (req,res) =>{
    let {quizId,answers,pointsAwarded,platformId,userId,score,timeTaken} = req.body

    try {

        let quiz = await Quiz.findById(quizId)
        if(!quiz) return res.status(400).json({message:"Quiz id not found"})


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
        quiz.submissions.push(created_submission)
        await quiz.save()
        res.status(200).json({submission:created_submission})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }    

}




export const getAllSubmissions = async (req,res)=>{

    let userId = req.params.id
    try {

        let submissions = await Submission.find({userId:userId})

        if(!submissions) return res.status(400).json({message:"User id is not found"})
    
        return res.status(200).json({submissions:submissions})     


    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
   

}


export const getQuizSubmissions = async (req,res)=>{

    let userId = req.params.uid
    let quizId = req.params.qid



    try {

        //find all the submissions based on provided userId
        let submissions = await Submission.find({userId:userId,quizId:quizId})
            
        res.status(200).json({submissions:submissions})     
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})  
    }



}


export const getSubmission = async (req,res) =>{

    let id = req.params.id

    try {

        //find all the submissions based on provided userId
        let submissions = await Submission.findById(id)
            
        res.status(200).json({submissions:submissions})     
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})  
    }



}


