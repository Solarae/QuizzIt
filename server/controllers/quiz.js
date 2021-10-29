import Quiz from "../models/Quiz.js"
import User from '../models/User.js'
import Platform from "../models/Platform.js"




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
    let {question,questionIndex} = req.body

    try {
        let formattedQuestion = JSON.parse(question)
        console.log(JSON.parse(question))
        let quiz = await Quiz.findById(quizId)
        quiz.questions[questionIndex] = formattedQuestion;
        await quiz.save()
        res.status(200).json({quiz:quiz})


    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const deleteQuizQuestion = () =>{
    
}

