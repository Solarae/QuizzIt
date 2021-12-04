import cloudinary from "../utils/cloudinary.js";

import Award from '../models/Award.js'
import Platform from '../models/Platform.js'
import User from "../models/User.js";
import Quiz from "../models/Quiz.js"
import Submission from "../models/Submission.js"
import User from '../models/User.js'

import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId;

import { io, onlineUsers } from '../index.js'

export const uploadImgToCloud = async (img) =>{
    try {
        const res = await cloudinary.uploader.upload(img, {
            upload_preset: 'dev_setups',
        });
        return res
    } catch (err) {
        console.error(err);
    }
}

export const queryBuilder = (q, queries, model) => {
    var query = {}
    var operations = []

    for (var key in queries) {
        if (key === 'expand') {
            var r = /,\s*(?![^()]*\))/gm
            var regex = /^([^()]+)(\(([^)]+)=([^)]+)\))?$/
            const populates = queries[key].split(r)
            for (var p in populates) {
                const m = regex.exec(populates[p])
                operations.push({
                    operation: 'populate',
                    path: m[1],
                    path_select: m[4] ? m[4].replace(/,/g, ' ') : null
                })
            }
        } else if (key === 'select') {
            operations.push({
                operation: 'select',
                fields: queries[key].replace(/,/g, ' ')
            })
        } else if (key === 'sort') {
            var sort = {}
            const sortFields = queries[key].split(',')
            for (var v in sortFields) {
                const [sortBy, orderBy] = sortFields[v].split(' ')
                if (orderBy) {
                    sort[sortBy] = orderBy === 'asc' ? 1 : -1
                } else {
                    sort[sortBy] = 1
                }
            }
            operations.push({
                operation: 'sort',
                sort: sort
            })
        } else if (key === 'limit' || key === 'offset') {
            break
        } else if (key === 'name') {
            query[key] = {
                "$regex": queries[key], 
                "$options": "i"
            }
        } else {
            query[key] = queries[key]
        }
    }
   
    q = q ? q : model.find(query)
    for (var o in operations) {
        const op = operations[o]
        if (op.operation === 'populate') {
            q = q.populate(op.path, op.path_select)
        } else if (op.operation === 'select') {
            q = q.select(op.fields)
        } else if (op.operation === 'sort') {
            q = q.sort(op.sort)
        }     
    }
    
    return q
}

export const paginateQuery = async (q, model, limit, offset) => {
    const pageSize = parseInt(limit) || 10
    const skip = parseInt(offset) || 0
    const page = skip / pageSize
    const totalCount = await model.countDocuments(q)
    const pages = Math.ceil(totalCount / pageSize)
    
    q = q.limit(pageSize).skip(skip)

    return { q, page, pages, totalCount }
}


export const checkIfModeratorOfPlatform = async (req,res) =>{


    try {
        let userId = req.params.uid
        let platformId = req.params.pid
    
    
        let platform = await Platform.findById(platformId)
        if (!platform) return res.status(200).json({message:"Platform does not exist"}) 


        let members = platform.subscribers

        let user = members.filter( member => member.userId == userId )

        console.log(user)

        if(user[0] && user[0].role == "Moderator" ){
            return res.status(200).json({user:user[0]})
        }

        return res.status(200).json({message:"User is not moderator"})
    

    } catch (error) {
        return res.status(500).json({message:error.message})       
    }




}


export const checkIfAdmin = async (req,res) => {
    try {
        let id = req.params.id

        let user = await User.findById(id)
    
        if(!user) return res.status(200).json({message:"User does not exist"})
    
        return user.role == "Admin" ? res.status(200).json({user:user}) : res.status(200).json() 

    } catch (error) {
        return res.status(500).json({message:error.message})   
        
    }
}


export const assignAwards = async (userId, platformId) => {
    try {
         // Get total count / total points for platform
        const agg = await Submission.aggregate([
            { $match: { userId: ObjectId(userId), platformId: ObjectId(platformId) } },
            { $group: {
                _id: null,
                submissionCount: { $sum: 1 },
                totalPoints: { $sum: "$score" }
            }}
        ])

        const user_agg = agg[0]

        console.log(`User submission count is ${user_agg.submissionCount}`)
        console.log(`User total points is ${user_agg.totalPoints}`)
        
        // Get all awards for current platform
        const user = await User.findById(userId)

        // Get all awards for current platform
        const awards = await Award.aggregate([
            // { $match: { platformId: ObjectId(platformId) } }
            { $match: {
                $and: [
                    { platformId: ObjectId(platformId) },
                    { _id: { $nin: user.awards } } 
                ]
            }}
        ])

        console.log(awards)

        var awardsObtained = []

        awards.forEach((award) => {
            if ((award.requirementType === 'Point' && user_agg.totalPoints >= award.requirementCount) ||
                award.requirementType === 'Quiz' && user_agg.submissionCount >= awards[a].requirementCount )
                awardsObtained.push(award._id)
        })
        
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { awards: { $each: awardsObtained } } },
        )
        io.to(onlineUsers.get(userId)).emit('Hello')
    } catch (error) {
        console.log(error)
    }
}