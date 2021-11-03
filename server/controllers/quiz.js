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
        res.status(500).json({message:error})
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
        res.status(500).json({message:error})
    }




}


export const editQuiz = async (req,res) =>{
    let quizId = req.params.id;
    let updateFields = req.body;
    try {
        let newQuiz = await Quiz.findByIdAndUpdate(quizId,{$set: updateFields},{new:true})
        res.status(200).json({quiz:newQuiz})
    } catch (error) {
        res.status(500).json({message:error})
    }
    
    
}

export const getQuestion = async (req,res) =>{
    let quizId = req.params.id

    try {
        let quiz = await Quiz.findById(quizId);

        if(!quiz) return res.status(500).json({message:"Quiz not found with the provided id"})
        
        return res.status(200).json({questions:quiz.questions})        
    } catch (error) {
        res.status(500).json({message:error})
    }

}


export const addQuizQuestion = async (req,res) =>{
    let quizId = req.params.id;
    let {question}= req.body

    try {
        let formattedQuestion = JSON.parse(question)
        console.log(JSON.parse(question))
        let quiz = await Quiz.findById(quizId)
        quiz.questions.push(formattedQuestion)
        await quiz.save()
        res.status(200).json({quiz:quiz})


    } catch (error) {
        res.status(500).json({message:error})
    }

}

export const editQuizQuestion = async (req,res) =>{
    let quizId = req.params.id;
    let {question,questionId} = req.body
    try {
        let formattedQuestion = JSON.parse(question)
        let quiz = await Quiz.findById(quizId)

        let questionIndex = quiz.questions.findIndex((question)=> question._id.toString() === questionId)
        console.log(questionIndex)
        quiz.questions[questionIndex] = formattedQuestion;
        let newQuiz = await quiz.save()
        res.status(200).json({quiz:newQuiz})


    } catch (error) {
        res.status(500).json({message:error})
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
        res.status(500).json({message:error})
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

