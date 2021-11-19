import mongoose from 'mongoose'

const awardSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    icon_cloud_id: {
        type: String,
        required: true 
    }, 
    platformId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Platform',
        required: true
    },
    requirementType: {
        type: String,
        enum: ['Point','Quiz'],
        required: true
    },
    requirementCount: {
        type: Number,
        required: true
    }
})

const Award = mongoose.model('Award', awardSchema)

export default Award