import Quiz from "../models/Quiz.js"
import Submission from "../models/Submission.js"
import { queryBuilder, paginateQuery, assignAwards } from "./util.js";

export const createSubmission = async (req,res) =>{
    const { quizId, answers, platformId, userId, timeTaken } = req.body
    console.log(req.body)

    try {

        const quiz = await Quiz.findById(quizId)
        if(!quiz) return res.status(400).json({message:"Quiz id not found"})

        //calculate the score

        const questions = quiz.questions
        var total_correct = 0
        
        var i = 0
        questions.forEach((question)=>{
            if(question != null){
                if(question.answer === answers[i]){
                    total_correct+=1
                }
                i+=1
            } 
        })
        
        const count = await Submission.countDocuments({ quizId, userId })

        var newSubmission
        if (count) {
            newSubmission = new Submission({
                pointsAwarded: 0,
                quizId:quizId,
                answers:answers,
                platformId:platformId,
                userId:userId,
                timeTaken,
                score: total_correct,
                attemptNumber: count + 1
            })
        } else {
            const calculatedPoints = timeTaken === 0 ? (total_correct * (total_correct / quiz.questions.length)) / (1 / (quiz.time * 60)) :
                (total_correct * (total_correct / quiz.questions.length)) / (timeTaken / (quiz.time * 60))
            newSubmission = new Submission({
                pointsAwarded: Math.floor(calculatedPoints),
                quizId:quizId,
                answers:answers,
                platformId:platformId,
                userId:userId,
                timeTaken,
                score:total_correct
            })
        }
        
        //save submission
        const created_submission = await newSubmission.save()

        await Quiz.findByIdAndUpdate(quizId, { $inc: { 'submissionCount': 1 } })

        res.status(200).json({submission:created_submission})
        await assignAwards(userId, platformId)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }    

}

export const getQuizSubmissions = async (req,res)=>{

    const userId = req.params.uid
    const quizId = req.params.qid
    try {
        const submissions = await Submission.find({userId:userId,quizId:quizId})
        .populate("platformId")
        .populate("quizId")

        if(!submissions) return res.status(400).json({message:"User id is not found"})
    
        return res.status(200).json({submissions:submissions})     


    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
   

}


export const getSubmissions = async (req,res)=>{
    try {
        // console.log(req.query)
        console.log("quiz Id "+req.quizId)
        console.log()
        var query = queryBuilder(null, req.query, Submission)
        //console.log(query)
        const { q, page, pages, totalCount } = await paginateQuery(query, Submission, req.query.limit, req.query.offset)

        // if (page > pages) 
        //     return res.status(404).json({ msg: "Page doesn't exist" })
        
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
        if (!submission) return res.status(200).json({ msg: "Submission doesn't exist" });
        res.status(200).json({ submission });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})  
    }
}


