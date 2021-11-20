import mongoose from "mongoose"


const submission = new mongoose.Schema({
    answers:{
        type:[{
            type:String
        }]
    },

    pointsAwarded:{
        type:Number
    },


    platformId:{
        type:mongoose.Types.ObjectId,
        ref:'Platform'
    },

    quizId:{
        type:mongoose.Types.ObjectId,
        ref:'Quiz'
    },

    timeSubmitted:{
        type:Date
    },

    timeTaken:{
        type:String
    },

    score:{
        type:Number
    },

    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
}, { timestamps: true } )



const Submission = mongoose.model('Submission',submission)


export default Submission