import Quiz from "../models/Quiz.js"
import User from '../models/User.js'
import Platform from "../models/Platform.js"
import mongoose from "mongoose"

export const createQuiz = async (req,res) =>{

    const {userId,name,description,platformId,time} = req.body;
    
    try {
        let platform = await Platform.findById(platformId);
        if (!platform) return res.status(404).json({ msg: `No platform with id: ${platformId}` });


        let newQuiz = new Quiz ({
            name:name,
            description:description,
            platformId:platformId,
            time:time
        });

        let createdQuiz = await newQuiz.save();


        platform.quizzes.push(
            createdQuiz._id
        );  

        await platform.save()

        res.status(200).json({ quiz: createdQuiz })

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }

}

export const getQuiz = async (req,res) => {
    let quizId = req.params.id

    try {
        let quiz = await Quiz.findById(quizId);

        if(!quiz) return res.status(500).json({message:"Quiz not found with the provided id"})
    
        return res.status(200).json({ quiz : quiz })        
    } catch (error) {
        res.status(500).json({message:error,message})
    }


}

export const getPlatformQuiz = async (req,res) =>{
    let platformId = req.params.id

    try {
        let quiz = await Quiz.find({platformId:platformId});

        // if(!platform) return res.status(500).json({message:"Platform not found with the provided id"})

        return res.status(200).json({ quiz:quiz})        
    } catch (error) {
        res.status(500).json({message:error,message})
    }
    
}

export const deleteQuiz = async (req,res) =>{
    let quizId = req.params.id
    try {
        let quiz = await Quiz.findById(quizId)

        if(!quiz) return res.status(500).json({message:"Quiz not found"})

        //removing reference
        let platformId = quiz.platformId
        let platform = await Platform.findById(platformId)

        platform.quizzes.pull(quiz._id)
        await platform.save()
    

        //delete the quiz
        await quiz.remove()

        res.status(200).json({message:"Success"})

    } catch (error) {
        res.status(500).json({message:error.message})
    }

}


export const editQuiz = async (req,res) =>{
    let quizId = req.params.id;
    let updateFields = req.body;
    try {
        let newQuiz = await Quiz.findByIdAndUpdate(quizId,{$set: updateFields},{new:true})
        res.status(200).json({quiz:newQuiz})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}

export const getQuestion = async (req,res) =>{
    let quizId = req.params.id

    try {
        let quiz = await Quiz.findById(quizId);

        if(!quiz) return res.status(500).json({message:"Quiz not found with the provided id"})
        
        return res.status(200).json({questions:quiz.questions})        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

export const addQuizQuestion = async (req,res) =>{
    let quizId = req.params.id;
    let {question}= req.body

    try {
        // let formattedQuestion = JSON.parse(question)
        // console.log(JSON.parse(question))
        let quiz = await Quiz.findById(quizId)
        quiz.questions.push(question)
        await quiz.save()
        res.status(200).json({quiz:quiz})
    } catch (error) {
        res.status(500).json({message:error.message})
     }

}

export const editQuizQuestion = async (req,res) =>{
    let quizId = req.params.id
    let { question } = req.body
    console.log(req.body)
    try {
        console.log(quizId)
        console.log(question)

        let quiz = await Quiz.findById(quizId)

        let questionIndex = quiz.questions.findIndex((q)=> q._id.toString() === question._id)

        console.log(questionIndex)
        quiz.questions[questionIndex] = question

        let newQuiz = await quiz.save()

        res.status(200).json({quiz:newQuiz})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const deleteQuizQuestion = async (req,res) =>{
    let quizId = req.params.id;
    let {questionId} = req.body;
    try {
        let quiz = await Quiz.findById(quizId)
        quiz.questions.pull(questionId)
        await quiz.save()
        res.status(200).json({quiz:quiz})


    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getQuizzesByFilter = async (req, res) => {
    var query = {}
    for(var key in req.query){ 
        query[key] = {
            "$regex": req.query[key], 
            "$options": "i"
        }
    }

    try {
        const quizzes = await Quiz.find(query);
        res.status(200).json({ quizzes: quizzes });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}



export const upvoteQuiz = async (req,res) =>{

    let quizId = req.params.id
    let {userId} = req.body
    try {

        //check if the user already liked the quiz
        let user = await User.findById(userId)
        let likedQuizzes = user.likes.likedQuizzes
        let dislikedQuizzes = user.likes.dislikedQuizzes

        //if already liked, then unlike it and then return
        if(likedQuizzes.includes(quizId)){
            //decrement the like on quiz
            let quiz = await Quiz.findByIdAndUpdate(quizId, {$inc:{'likes.totalLikes':-1}} , {new:true} )

            //remove from liked quizzes
            likedQuizzes.pull(quizId)
            await user.save()
            return res.status(200).json({quiz:quiz})

        }
        //if the quiz is already disliked, then undo dislike
        else if (dislikedQuizzes.includes(quizId)){
            dislikedQuizzes.pull(quizId)
            await user.save()
            await Quiz.findByIdAndUpdate(quizId, {$inc:{'likes.totalDislikes':-1}})


        }
    
        //perform upvote/like
        likedQuizzes.push(quizId)
        await user.save()

        let quiz = await Quiz.findByIdAndUpdate(quizId, {$inc:{'likes.totalLikes':1}} , {new:true} )

        if (!quiz) {return res.status(400).json({msg:"Quiz ID not found"})}

        return res.status(200).json({quiz:quiz})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}


export const downvoteQuiz = async (req,res) =>{

    let quizId = req.params.id
    let {userId} = req.body
    try {

        //check if the user already disliked the quiz
        let user = await User.findById(userId)
        let likedQuizzes    = user.likes.likedQuizzes 
        let dislikedQuizzes = user.likes.dislikedQuizzes


        //if already disliked, then unlike it and return
        if(dislikedQuizzes.includes(quizId)){
            //decrement the dislike on quiz
            let quiz = await Quiz.findByIdAndUpdate(quizId, {$inc:{'likes.totalDislikes':-1}} , {new:true} )

            //remove from disliked quizzes
            dislikedQuizzes.pull(quizId)
            await user.save()
            return res.status(200).json({quiz:quiz})
        }

        //else if the quiz is already liked, then undo like
        else if (likedQuizzes.includes(quizId)){
            likedQuizzes.pull(quizId)
            await user.save()
            await Quiz.findByIdAndUpdate(quizId, {$inc:{'likes.totalLikes':-1}})


        }
        
    

        //perform downvote/dislike
        dislikedQuizzes.push(quizId)
        await user.save()

        let quiz = await Quiz.findByIdAndUpdate(quizId, {$inc:{'likes.totalDislikes':1}} , {new:true} )

        if (!quiz) {return res.status(400).json({msg:"Quiz ID not found"})}

        return res.status(200).json({quiz:quiz})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}

export const reportQuiz = async (req, res) => {
    const { userId, text } = req.body;
    let quizId = req.params.id
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User doesn't exist" })

        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ msg: "Quiz doesn't exist" })

        quiz.reports.push({
            userId: user._id,
            text: text
        })

        await quiz.save();

        res.status(200).json({ quiz: quiz });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}