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
    daily_leaderboard: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        points: {
            type: Number
        },
    }],
    weekly_leaderboard: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        points: {
            type: Number
        },
    }],
    monthly_leaderboard: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        points: {
            type: Number
        },
    }],
    year_leaderboard: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        points: {
            type: Number
        },
    }],
    allTime_leaderboard: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        points: {
            type: Number
        },
    }],
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
    }
})

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz