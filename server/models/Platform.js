import mongoose from 'mongoose'

const platformSchema = new mongoose.Schema ({
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
        type: String,
        required: true
    },
    banner: {
        type: String
    },
    icon: {
        type: String
    },
    subscribers: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
    }],
    quizzes: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'
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
            type: Number,
            default: 0
        },
        dislikesThisHour: {
            type: Number,
            default: 0
        },
        totalLikes: {
            type: Number,
            default: 0
        },
        totalDislikes: {
            type: Number,
            default: 0
        }
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

const Platform = mongoose.model('Platform', platformSchema)

export default Platform