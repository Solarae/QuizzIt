import Quiz from "../models/Quiz.js"
import User from '../models/User.js'
import Platform from "../models/Platform.js"
import { uploadImgToCloud, queryBuilder, paginateQuery, recaclulateScore } from "./util.js";
import mongoose from 'mongoose'
import Submission from "../models/Submission.js";
import Report from "../models/Report.js";
const ObjectId = mongoose.Types.ObjectId;

export const createQuiz = async (req,res) =>{

    const {userId,name,description,platformId,time} = req.body;
    
    try {
        let platform = await Platform.findById(platformId);
        if (!platform) return res.status(404).json({ msg: `No platform with id: ${platformId}` });


        let newQuiz = new Quiz ({
            name:name,
            owner: userId,
            description:description,
            platformId:platformId,
            time:time
        });

        let createdQuiz = await newQuiz.save();

        await Platform.findByIdAndUpdate(platformId, { $inc: { 'quizCount': 1 } })

        res.status(200).json({ quiz: createdQuiz })

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }

}

export const getQuiz = async (req,res) => {
    try {
        var query = queryBuilder(Quiz.findById(req.params.id), req.query, Quiz)
        const quiz = await query;
        if (!quiz) return res.status(200).json({ msg: "Quiz doesn't exist" });
        res.status(200).json({ quiz });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getPlatformQuiz = async (req,res) =>{
    let platformId = req.params.id

    try {
        let quiz = await Quiz.find({platformId:platformId});

        // if(!platform) return res.status(500).json({message:"Platform not found with the provided id"})

        return res.status(200).json({ quiz:quiz})        
    } catch (error) {
        res.status(500).json({message:error,message})
    }
    
}

export const deleteQuiz = async (req,res) =>{
    let quizId = req.params.id
    try {
        console.log(quizId)
        let quiz = await Quiz.findById(quizId)

        if(!quiz) return res.status(500).json({message:"Quiz not found"})

        await Platform.findByIdAndUpdate(quiz.platformId, { $inc: { 'quizCount': -1 } })
        

        //delete the submission that has the quiz
        await Submission.deleteMany({quizId:quizId})

        //delete the reports that has the quiz
        await Report.deleteMany({quizId:quizId})


        //delete the quiz
        await quiz.remove()

        res.status(200).json({message:"Success"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }

}

export const editQuiz = async (req,res) =>{
    let quizId = req.params.id;
    let updateFields = req.body;
    try {
        let newQuiz = await Quiz.findByIdAndUpdate(quizId,{$set: updateFields},{new:true})
        res.status(200).json({quiz:newQuiz})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}

export const uploadImage = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
        if (!quiz) return res.status(404).json({ errors: { quizDNE: 'Quiz does not exist'} } )
        const cloud = await uploadImgToCloud(req.file.path)

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.id, 
            { $set: { thumbnail: cloud.secure_url, thumbnail_cloud_id: cloud.public_id } }, 
            { new: true }
        );
        if (!updatedQuiz) return res.status(200).json({ msg: "Something went wrong with updating quiz" });

        res.status(200).json({ quiz: updatedQuiz });
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: error.message })
    }
}

export const getQuestion = async (req,res) =>{
    let quizId = req.params.id

    try {
        let quiz = await Quiz.findById(quizId);

        if(!quiz) return res.status(500).json({message:"Quiz not found with the provided id"})
        
        return res.status(200).json({questions:quiz.questions})        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

export const addQuizQuestion = async (req,res) =>{
    let quizId = req.params.id;
    let {question}= req.body

    try {
        // let formattedQuestion = JSON.parse(question)
        // console.log(JSON.parse(question))
        let quiz = await Quiz.findById(quizId)
        quiz.questions.push(question)
        await quiz.save()
        res.status(200).json({quiz:quiz})
    } catch (error) {
        res.status(500).json({message:error.message})
     }

}

export const editQuizQuestion = async (req,res) =>{
    let quizId = req.params.id
    let { question } = req.body
    console.log(req.body)
    try {
        console.log(quizId)
        console.log(question)

        let quiz = await Quiz.findById(quizId)

        let questionIndex = quiz.questions.findIndex((q)=> q._id.toString() === question._id)

        console.log(questionIndex)

        const oldQuestion = quiz.questions[questionIndex]
        quiz.questions[questionIndex] = question

        let newQuiz = await quiz.save()

        res.status(200).json({quiz:newQuiz})

        if (oldQuestion.answer !== question.answer)
            await recaclulateScore(quizId)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const deleteQuizQuestion = async (req,res) =>{
    let quizId = req.params.id;
    let {questionId} = req.body;
    try {
        let quiz = await Quiz.findById(quizId)
        quiz.questions.pull(questionId)
        let newQuiz = await quiz.save()
        res.status(200).json({quiz:newQuiz})


    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getQuizzesByFilter = async (req, res) => {
    try {
        var query = queryBuilder(null, req.query, Quiz)
        const { q, page, pages, totalCount } = await paginateQuery(query, Quiz, req.query.limit, req.query.offset)

        if (page > pages) 
            return res.status(404).json({ msg: "Page doesn't exist" })
        
        const quizzes = await q

        res.status(200).json({ 
            quizzes,
            page,
            pages,
            totalCount
        });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getLeaderboard = async (req, res) => {
    console.log(req.params.id)
    const { type, userId } = req.query
    const skip = parseInt(req.query.offset) || 0
    const limit = parseInt(req.query.limit) || 10 
    
    if (type !== 'daily' && type !== 'weekly' && type !== 'monthly' && type !== 'year' && type !== 'allTime')
        return res.status(404).json({ msg: "Invalid leaderboard type" }); 

    try {
        var projectQuery
        
        if (userId) {
            const user = await User.findById(userId)
            if (!user) res.status(404).json({ msg: "User doesn't exist" });
            projectQuery = {
                leaderboard: {
                    $slice: [{ $filter: { 
                        input: `$${type}_leaderboard`,
                        as: "rank", 
                        cond:  { $in: ["$$rank.userId", user.friends] } 
                    }}, skip, limit]
                },
                totalCount: {
                    $size: { $filter: { 
                        input: `$${type}_leaderboard`,
                        as: "rank", 
                        cond:  { $in: ["$$rank.userId", user.friends] } 
                    }}
                }
            }
        } else {
            projectQuery = {
                leaderboard: {
                    $slice: [`$${type}_leaderboard`, skip, limit]
                },
                totalCount: {
                    $size: `$${type}_leaderboard`
                }
            }
        }
        
        const [ leaderboardInfo ] = await Quiz.aggregate([
            { $match: { _id: ObjectId(req.params.id) } },
            { $project: projectQuery },
            { $lookup: {
                from: "users",
                localField: "leaderboard.userId",
                foreignField: "_id",
                as: "populatedLeaderboard"
            }},
            { $set: {
                leaderboard: {
                    $map: {
                        input: "$leaderboard",
                        as: "rank",
                        in: {
                            $mergeObjects: [
                                "$$rank",
                                { $arrayElemAt: [
                                    "$populatedLeaderboard",
                                    { $indexOfArray: [ "$populatedLeaderboard._id", "$$rank.userId" ] }
                                ]}
                            ]
                        }
                    }
                }
            }},
            { $project: {
                _id: 1,
                totalCount: 1,
                leaderboard: {
                    _id: 1,
                    points: 1,
                    username: 1
                }
            }}
        ])
        
        if (!leaderboardInfo) return res.status(404).json({ msg: "Quiz doesn't exist "} )
        const leaderboardPage = (skip / limit) + 1
        const leaderboardPages = Math.ceil(leaderboardInfo.totalCount / limit)
       
        res.status(200).json({
            leaderboard: leaderboardInfo.leaderboard,
            leaderboardPage,
            leaderboardPages,
            leaderboardTotalCount: leaderboardInfo.totalCount
        })
    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}

export const searchLeaderboard = async (req, res) => {
    const { type, name } = req.query 
    console.log("Calling search")
    console.log(req.params.id)
    if (type !== 'daily' && type !== 'weekly' && type !== 'monthly' && type !== 'year' && type !== 'allTime')
    return res.status(404).json({ errors: { invalidLeaderboardType: 'Invalid leaderboard type'}}); 

    try {
        const user = await User.findOne({ username: name })
        if (!user) return res.status(404).json({ errors: { userDNE: 'User does not exist'} } )

        const [ info ] = await Quiz.aggregate([
            { $match: {_id: ObjectId(req.params.id) } },
            { $project: {
                index: {
                    $indexOfArray: [
                        `$${type}_leaderboard.userId`,
                        user._id
                    ]
                  },
            }}
        ])

        if (!info) return res.status(404).json({ msg: "Quiz doesn't exist "} )

        const skip = Math.floor(info.index / 10) * 10

        const [ leaderboardInfo ] = await Quiz.aggregate([
            { $match: { _id: ObjectId(req.params.id) } },
            { $project: {
                leaderboard: {
                    $slice: [`$${type}_leaderboard`, skip, 10]
                },
                totalCount: {
                    $size: `$${type}_leaderboard`
                }
            }},
            { $lookup: {
                from: "users",
                localField: "leaderboard.userId",
                foreignField: "_id",
                as: "populatedLeaderboard"
            }},
            { $set: {
                leaderboard: {
                    $map: {
                        input: "$leaderboard",
                        as: "rank",
                        in: {
                            $mergeObjects: [
                                "$$rank",
                                { $arrayElemAt: [
                                    "$populatedLeaderboard",
                                    { $indexOfArray: [ "$populatedLeaderboard._id", "$$rank.userId" ] }
                                ]}
                            ]
                        }
                    }
                }
            }},
            { $project: {
                _id: 1,
                totalCount: 1,
                leaderboard: {
                    _id: 1,
                    points: 1,
                    username: 1
                }
            }} 
        ])

        if (!leaderboardInfo) return res.status(404).json({ msg: "Quiz doesn't exist "} )

        const leaderboardPage = (skip / 10) + 1
        const leaderboardPages = Math.ceil(leaderboardInfo.totalCount / 10 )

        res.status(200).json({ 
            leaderboard: leaderboardInfo.leaderboard, 
            leaderboardPage, 
            leaderboardPages ,
            leaderboardTotalCount: leaderboardInfo.totalCount });
    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}

export const upvoteQuiz = async (req,res) =>{
    const { userId } = req.body 
  
    try {
        const quiz = await Quiz.findById(req.params.id)
        if (!quiz) return res.status(404).json({ errors: { quizDNE: 'Quiz does not exist'} } )

        if (quiz.likes.likedBy.includes(userId)) {
            console.log("HELLO")
            const updatedQuiz = await Quiz.findByIdAndUpdate(
                req.params.id,
                { $pull: { 'likes.likedBy': userId } ,
                 $inc: { 'likes.totalLikes': -1 }}, 
                { new: true } )
            return res.status(200).json({ quiz: updatedQuiz })
        } else if (quiz.likes.dislikedBy.includes(userId)) {
            const updatedQuiz = await Quiz.findByIdAndUpdate(
                req.params.id,
                { $pull: { 'likes.dislikedBy': userId } ,
                 $push: { 'likes.likedBy': userId } ,
                 $inc: { 'likes.totalDislikes': -1, 'likes.totalLikes': 1 }}, 
                { new: true } )
            return res.status(200).json({ quiz: updatedQuiz })
        } else {
            console.log("HELLO")
            const updatedQuiz = await Quiz.findByIdAndUpdate(
                req.params.id,
                { $push: { 'likes.likedBy': userId } ,
                 $inc: { 'likes.totalLikes': 1 } }, 
                { new: true } 
            )
            console.log(updatedQuiz)
            return res.status(200).json({ quiz:updatedQuiz })
        }
    } catch (error) {
        return res.status(500).json({ message:error.message })
    }
}

export const downvoteQuiz = async (req,res) => {
    const { userId } = req.body

    try {
        const quiz = await Quiz.findById(req.params.id)
        if (!quiz) return res.status(404).json({ errors: { quizDNE: 'Quiz does not exist'} } )

        if (quiz.likes.dislikedBy.includes(userId)) {
            const updatedQuiz = await Quiz.findByIdAndUpdate(
                req.params.id,
                { $pull: { 'likes.dislikedBy': userId } ,
                 $inc: { 'likes.totalDislikes': -1 }}, 
                { new: true } )
            return res.status(200).json({ quiz: updatedQuiz })
        } else if (quiz.likes.likedBy.includes(userId)) {
            const updatedQuiz = await Quiz.findByIdAndUpdate(
                req.params.id,
                { $pull: { 'likes.likedBy': userId } ,
                 $push: { 'likes.dislikedBy': userId } ,
                 $inc: { 'likes.totalDislikes': 1, 'likes.totalLikes': -1 }}, 
                { new: true } )
            return res.status(200).json({ quiz: updatedQuiz })
        } else {
            const updatedQuiz = await Quiz.findByIdAndUpdate(
                req.params.id,
                { $push: { 'likes.dislikedBy': userId } ,
                 $inc: { 'likes.totalDislikes': 1 }}, 
                { new: true } 
            )
            return res.status(200).json({ quiz:updatedQuiz })
        }
    } catch (error) {
        return res.status(500).json({ message:error.message })
    }
}
