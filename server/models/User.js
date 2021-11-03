import mongoose from 'mongoose'

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String ,
        required: true
    },
    role: {
        type: String,
        enum: ['User','Admin'],
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
    platformInfos: [{
        platformId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Platform'
        },
        points: {
            daily: {
                type: Number
            },
            weekly: {
                type: Number
            },
            monthly: {
                type: Number
            },
            biannual: {
                type: Number
            },
            year: {
                type: Number
            },
            allTime: {
                type: Number
            }
        },
        role: {
            type: String,
            enum: ['Consumer', 'Moderator', 'Creator']
        }
    }]
})

const User = mongoose.model('User', userSchema)

export default User