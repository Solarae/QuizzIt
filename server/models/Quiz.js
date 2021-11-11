import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    thumbnail: {
        data: Buffer,
        contentType: String 
    },
    platformId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Platform',
        required: true 
    },
    submissions: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Submission' 
    }],
    questions: [{
        question: {
            type: String,
            required: true
        },
        choices: [{
            type: String,
            required: true
        }],
        answer: {
            type: String,
            required: true
        }
    }],
    leaderboards: {
        daily: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }],
        weekly: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }],
        monthly: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }],
        biannual: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }],
        year: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }],
        allTime: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }]
    },
    likes: {
        likesThisHour: {
            type: Number
        },
        dislikesThisHour: {
            type: Number
        },
        totalLikes: {
            type: Number
        },
        totalDislikes: {
            type: Number
        }
    },
    time: {
        type: Number,
        required: true 
    },
    reports: [{ 
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
        text: {
            type: String 
        }
    }],
})

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz