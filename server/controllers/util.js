import cloudinary from "../utils/cloudinary.js";

import Award from '../models/Award.js'
import Platform from '../models/Platform.js'
import User from "../models/User.js";
import Quiz from "../models/Quiz.js"
import Submission from "../models/Submission.js"
import Global from "../models/Global.js"

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
        } else if (key === 'name' || key === 'username') {
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
    const page = (skip / pageSize) + 1
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

        if(user[0] && (user[0].role == "Moderator" || user[0].role == "Creator" ) ){
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
         // Get total distinct submission / total points for platform
        const [ user_agg ]  = await Submission.aggregate([
            { $match: { userId: ObjectId(userId), platformId: ObjectId(platformId) } },
            { $group: {
                _id: "$quizId",
                points: { $sum: "$score" }
            }},
            { $group: {
                _id: "$quizId",
                submissionCount: { $sum: 1 },
                totalPoints: { $sum: "$points" }
            }}
        ])

        console.log(user_agg)
        // Get all awards for user
        const user = await User.findById(userId)

        // Get all unobtained awards in Platform
        const awards = await Award.aggregate([
            { $match: {
                $and: [
                    { platformId: ObjectId(platformId) },
                    { _id: { $nin: user.awards } } 
                ]
            }}
        ])

        var awardsObtained = []
        var messages = []
        awards.forEach((award) => {
            if ((award.requirementType === 'Point' && user_agg.totalPoints >= award.requirementCount) ||
                award.requirementType === 'Quiz' && user_agg.submissionCount >= awards[a].requirementCount ) {
                    awardsObtained.push(award._id)
                    messages.push({
                        message: `You've received earned the ${award.title}`,
                        read: false 
                    })
                }
        })
        
        if (awardsObtained.length) {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { awards: { $each: awardsObtained } } ,
                 $push: { inbox : { $each: messages, $position: 0 } } },
                { new: true }
            )
    
            
            if (onlineUsers.get(userId)) {
                const slicedUser = await User.findById(userId).slice(`inbox`, [0,5])
                
                io.to(onlineUsers.get(userId)).emit('getInbox', {
                    inbox: slicedUser.inbox,
                })
            }
                
        }  
    } catch (error) {
        console.log(error)
    }
}

export const createGlobal = async () => {
    const count = await Global.countDocuments({})
    
    if (count === 0) {
        try {
            const global = new Global()
            await global.save()
            console.log("Global Store Created")
        } catch (error) {
            console.log(error)
        }
    }
}

export const recaclulateScore = async (quizId) => {
   
    try {
        const quiz = await Quiz.findById(quizId)
        const questions = quiz.questions
        // Get all submissions
        const submissions = await Submission.find({quizId})

        var uniqueUsers = [...new Map(submissions.map(v => [v.userId.toString(), v])).values()]
       
        await Promise.all(submissions.map(async (s) => {
            var total_correct = 0
            var i = 0
            const answers = s.answers
            questions.forEach((question)=>{
                if( question != null ) {
                    if (question.answer === answers[i]) {
                        total_correct+=1
                    }
                    i+=1
                } 
            })
            // First Attempt; Recalculate points awarded
            if (s.attemptNumber === 1) {
                await Submission.findByIdAndUpdate(
                    s._id,
                    { $set: { score: total_correct, pointsAwarded: total_correct } }
                )
            } else {
                await Submission.findByIdAndUpdate(s._id,
                    { $set: { score: total_correct } }
                )
            }
        }));

        await Promise.all(uniqueUsers.map(async (user) => await assignAwards(user.userId, quiz.platformId)));
        
    } catch (error) {
        console.log(error.message)
    }
    

}


export const assignCreator = async (platformId,userId) =>{

    console.log("assigning new owner , platform= "+platformId )
    console.log("assigning new owner , userId= "+userId )


    let platform = await Platform.findByIdAndUpdate(platformId,{$set: {owner:userId} })

    //on subscriber array,change user role
    let idx = platform.subscribers.findIndex((obj=>obj.userId.toString()==userId))


    console.log("subscribers "+platform.subscribers)
    console.log(idx)
    console.log(platform.subscribers[idx])
    platform.subscribers[idx].role = "Creator"


    let newPlatform = await platform.save()

    return newPlatform

}