import Report from '../models/Report.js'
import Platform from '../models/Platform.js'
import User from '../models/User.js'
import bcrypt from "bcryptjs";
import Quiz from '../models/Quiz.js';

export const reportPlatform = async (req,res) =>{


    try {
        let platformId = req.params.id
        let platform = await Platform.findById(platformId)

        if(!platform) return res.status(500).json({message:"invalid platformId"})



        let {description,submittedBy} = req.body
    
    
        let report = new Report ({
            platformId: platformId,
            description: description,
            timeSubmitted: Date.now(),
            submittedBy:submittedBy,
            type: "platformReport",    
        })
    
    
        let createdReport = await report.save()
        
        return res.status(200).json({createdReport:createdReport})        



    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const reportQuiz = async (req,res) =>{
    try {
        let quizId = req.params.id
        let quiz = await Quiz.findById(quizId)

        if(!quiz) return res.status(500).json({message:"invalid quizId"})



        let {description,submittedBy} = req.body
    
    
        let report = new Report ({
            quizId: quizId,
            description: description,
            timeSubmitted: Date.now(),
            submittedBy:submittedBy,
            type: "quizReport",    
        })
    
    
        let createdReport = await report.save()
        
        return res.status(200).json({createdReport:createdReport})        



    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}



export const getReport = () =>{

    return "sss"
}


export const getPlatformReport =  async (req,res) =>{

    try {
        let reports = await Report.find({type:"platformReport"}).populate("platformId").populate("submittedBy")
        console.log(reports)
        return res.status(200).json({report:reports})  

    } catch (error) {
        
        return res.status(500).json({message:error.message})
    }

}
//find all platforms the user is a moderator of
export const getAllManagedPlatform = async (req,res) =>{
    try {
        let userId = req.params.id

        let result = []

        let platforms = await Platform.find()

        platforms.forEach(platform => {
            
            let members = platform.subscribers

            let user = members.filter((member) => member._id == userId )

            if (user[0] && user[0].role == "Moderator" || user[0].role == "Admin"){
                result.push(platform._id)
            }
        })

        console.log(data)

        return res.status(200).json({platforms:result})



    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteReport = async(req,res) =>{

    try {
        let id = req.params.id
        await Report.findOneAndDelete({_id:id})
        let newReport = await Report.find().populate("platformId").populate("submittedBy")


        return res.status(200).json({report:newReport})  


    } catch (error) {
        return res.status(500).json({message:error.message})      
    }

}


export const deleteManyPlatformReport = async(req,res) => {


    try {
        let id = req.params.id
        let {confirmPassword,userId} = req.body


        let report = await Report.find().populate("platformId").populate("submittedBy")
        const user = await User.findById(userId)

        //don't delete reports if confirm password is wrong
        const isMatch = await bcrypt.compare(confirmPassword, user.password);
        if (!isMatch) {
            return res.status(200).json({ report:report });
        }


        await Report.deleteMany({platformId:id})
        let newReport = await Report.find().populate("platformId").populate("submittedBy")
        

        return res.status(200).json({report:newReport})  


    } catch (error) {
        return res.status(500).json({message:error.message})      
    }



}

export const deleteManyQuizReport = async(req,res) => {


    try {
        let id = req.params.id
        let {userId} = req.body

        await Report.deleteMany({quizId:id})
        let newReport = await Report.find().populate("quizId").populate("submittedBy")
        

        return res.status(200).json({report:newReport})  


    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})      
    }



}


export const getQuizReport = async (req,res) =>{

    try {
        let platformId = req.params.id

        //get every quiz reports
        let reports = await Report.find({type:"quizReport"}).populate("quizId").populate("submittedBy")
        
        //filter out the quiz reports that belong to the given platformId
        let newReport = reports.filter((report)=>{

            let platformIdOfQuiz = report.quizId.platformId
            return platformId == platformIdOfQuiz
            
        })


        return res.status(200).json({report:newReport})  

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }





}