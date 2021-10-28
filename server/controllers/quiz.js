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


export const deleteQuiz = () =>{
    
}


export const editQuiz = () =>{
    
}



export const addQuizQuestion = () =>{
    
}

export const editQuizQuestion = () =>{
    
}

export const deleteQuizQuestion = () =>{
    
}

