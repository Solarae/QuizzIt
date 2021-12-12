import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true  
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String
    },
    thumbnail_cloud_id: {
        type: String
    },
    platformId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Platform',
        required: true 
    },
    submissionCount: { 
        type: Number,
        default: 0
    },
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
        likedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        totalLikes: {
            type: Number,
            default: 0
        },
        dislikedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        totalDislikes: {
            type: Number,
            default: 0
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
    status: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Draft'
    }
})

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz