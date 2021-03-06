import mongoose from 'mongoose'



const report = new mongoose.Schema({

    type:{
        type:String,
        enum: ['platformReport','quizReport']
    },


    description: {
        type:String
    },

    platformId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Platform'
    },

    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Quiz'
    },

    timeSubmitted:{
        type:Date
    },

    submittedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

}, { timestamps: true })


const Report = mongoose.model('Report',report)

export default Report