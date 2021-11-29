import Quiz from "../models/Quiz.js"
import Submission from "../models/Submission.js"
import { queryBuilder, paginateQuery } from "./util.js";

export const createSubmission = async (req,res) =>{
    const {quizId,answers,platformId,userId,timeTaken} = req.body
    console.log(req.body)

    try {

        const quiz = await Quiz.findById(quizId)
        if(!quiz) return res.status(400).json({message:"Quiz id not found"})

        //calculate the score

        const questions = quiz.questions
        const total_correct = 0
        
        const i = 0
        questions.forEach((question)=>{
            if(question != null){
                if(question.answer === answers[i]){
                    total_correct+=1
                }
                i+=1
            } 
        })
        console.log(total_correct)
        const newSubmission = new Submission({
            quizId:quizId,
            answers:answers,
            platformId:platformId,
            userId:userId,
            timeTaken,
            score:total_correct
        })
        
        //save submission
        const created_submission = await newSubmission.save()

        //save submission to quiz 
        quiz.submissions.push(created_submission)
        await quiz.save()
        res.status(200).json({submission:created_submission})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }    

}




export const getQuizSubmissions = async (req,res)=>{

    const userId = req.params.id
    try {

        const submissions = await Submission.find({userId:userId})
        .populate("platformId")
        .populate("quizId")

        if(!submissions) return res.status(400).json({message:"User id is not found"})
    
        return res.status(200).json({submission:submissions})     


    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
   

}


export const getSubmissions = async (req,res)=>{
    try {
        console.log(req.query)
        var query = queryBuilder(null, req.query, Submission)
        //console.log(query)
        const { q, page, pages, totalCount } = await paginateQuery(query, Submission, req.query.limit, req.query.offset)

        if (page > pages) 
            return res.status(404).json({ msg: "Page doesn't exist" })
        
        const submissions = await q
        res.status(200).json({ 
            submissions: submissions,
            page,
            pages,
            totalCount
        });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}


export const getSubmission = async (req,res) =>{
    try {
        var query = queryBuilder(Submission.findById(req.params.id), req.query, Submission)
        const submission = await query;
        if (!submission) return res.status(200).json({ msg: "Platform doesn't exist" });
        res.status(200).json({ submission });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})  
    }
}


