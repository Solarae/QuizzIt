import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    banner: {
        data: Buffer,
        contentType: String
    },
    icon: {
        data: Buffer,
        contentType: String
    },
    awards: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Award'
    }],
    platforms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Platform'
    }],
    likes: {
        likedPlatforms: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Platform'
        }],
        dislikedPlatforms: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Platform'
        }],
        likedQuizzes: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'
        }],
        dislikedQuizzes: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'
        }]
    }

})

const User = mongoose.model('User', userSchema)

export default User