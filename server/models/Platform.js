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
    banner_cloud_id: {
        type: String
    },
    icon: {
        type: String
    },
    banner_cloud_id: {
        type: String
    },
    subscribers: [{ 
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['Consumer', 'Moderator', 'Creator']
        }
    }],
    quizzes: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'
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