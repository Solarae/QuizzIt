import bcrypt from "bcryptjs";

import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId;

import User from '../models/User.js'
import Platform from '../models/Platform.js'
import { uploadImgToCloud, queryBuilder, paginateQuery } from "./util.js";
import Quiz from "../models/Quiz.js";
import Submission from "../models/Submission.js";
import Award from "../models/Award.js";

export const createPlatform = async (req, res) => {
    const { userId, name, description } = req.body;
    const errors = {};

    try {
        if (name.trim() === "") {
            errors.emptyName = "Platform name cannot be empty";
        }
        if (description.trim() === "") {
            errors.emptyDesc = "Platform description cannot be empty";
        }
        if (errors.emptyName || errors.emptyDesc) return res.status(200).json({ errors: errors });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: `No user with id: ${userId}` });

        const platform = await Platform.findOne({ name: name });
        if (platform) {
            errors.platformExists = `Platform with name: ${name} already exists`;
            return res.status(200).json({ errors: errors });
        }

        const newPlatform = new Platform({
            name: name,
            owner: userId,
            description: description,
            subscribers: [{
                userId,
                role: 'Creator'
            }]
        });
        const createdPlatform = await newPlatform.save();
        if (!createdPlatform) return res.status(404).json({ msg: "Something went wrong with creating the platform" });

        await User.findByIdAndUpdate(userId, { $inc: { 'platformsJoined': 1 }})
        res.status(200).json({ platform: createdPlatform })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const deletePlatform = async (req, res) => {
    const { userId, confirmPassword } = req.body
    const errors = {}

    try {
        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        const owner = await User.findById(platform.owner);
        const user = await User.findById(userId)

        if (userId !== String(platform.owner) && user.role != "Admin") {
            errors.invalidOwner = "You don't have delete permissions";
            return res.status(200).json({ errors: errors });
        }

        //if not an admin,check owner password
        if(user.role!="Admin"){
            // check if confirmPassword matches with owner's password
            const isMatch = await bcrypt.compare(confirmPassword, owner.password);
            if (!isMatch) {
                errors.invalidPassword = "Incorrect Password";
                return res.status(200).json({ errors: errors });
            }
        }

        //if admin,check admin's password
        else{
            //check if confirmPassword matches with admin's password
            const isMatch = await bcrypt.compare(confirmPassword, user.password);
            if (!isMatch) {
                errors.invalidPassword = "Incorrect Password";
                return res.status(200).json({ errors: errors });
            }
        }
        //delete all the quizzes of the platform
        await Quiz.deleteMany({platformId:req.params.id})

        //delete all the awards owned by platform
        await Award.deleteMany({platformId:req.params.id})

        //delete all the submissions from same platform
        await Submission.deleteMany({platformId:req.params.id})

        //proceed to remove platform
        await platform.remove();

        await User.updateMany(
            { _id: { $in: platform.subscribers.map(s => s.userId ) } },
            { $inc: { 'platformsJoined': -1 } }
        )
        
        res.status(200).json({ platform: platform })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getPlatform = async (req, res) => {
    try {
        var query = queryBuilder(Platform.findById(req.params.id), req.query, Platform)
        const platform = await query;
        if (!platform) return res.status(200).json({ msg: "Platform doesn't exist" });
        res.status(200).json({ platform: platform });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// To change a field, say name, newValue should be
// newValue = {
//  name: "NewName"
// }
export const updatePlatform = async (req, res) => {
    const { newValue, userId, confirmPassword } = req.body
    try {
        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(200).json({ msg: "Platform doesn't exist" });

        const owner = await User.findById(platform.owner);

        if (userId !== String(platform.owner)) {
            let errors = {};
            errors.invalidOwner = "You don't have update permissions";
            return res.status(200).json({ errors: errors });
        }

        const updatedPlatform = await Platform.findByIdAndUpdate(
            req.params.id, 
            { $set: newValue }, 
            { new: true }
        );
        if (!updatedPlatform) return res.status(200).json({ msg: "Something went wrong with updating platform" });

        res.status(200).json({ platform: updatedPlatform });
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: error.message })
    }
}

export const joinPlatform = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User doesn't exist" })

        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        const updatedPlatform = await Platform.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { subscribers: {userId, role: 'Consumer'} }},
            { new: true }
        )

        await User.findByIdAndUpdate(userId, { $inc: { 'platformsJoined': 1 } } )
        
        res.status(200).json({ platform: updatedPlatform });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const leavePlatform = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ errors: { userDNE: 'User does not exist'} })

        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(404).json({ errors: { platDNE: 'Platform does not exist'} })

        const updatedPlatform = await Platform.findByIdAndUpdate(
            req.params.id,
            { $pull: { subscribers: { userId: user._id } } },
            { new: true }
        )

        await User.findByIdAndUpdate(userId, { $inc: { 'platformsJoined': 1 } } )

        res.status(200).json({ platform: updatedPlatform });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const reportPlatform = async (req, res) => {
    const { userId, text } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ errors: { userDNE: 'User does not exist'} })

        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(404).json({ errors: { platDNE: 'Platform does not exist'} })

        platform.reports.push({
            userId: user._id,
            text: text
        })

        await platform.save();

        res.status(200).json({ platform: platform });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getPlatformsByFilter = async (req, res) => {
    try {
        var query = queryBuilder(null, req.query, Platform)
        const { q, page, pages, totalCount } = await paginateQuery(query, Platform, req.query.limit, req.query.offset)

        if (page > pages) 
            return res.status(404).json({ msg: "Page doesn't exist" })
        
        const platforms = await q

        res.status(200).json({ 
            platforms: platforms,
            page,
            pages,
            totalCount
        });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getPlatformMemberlist = async (req,res) => {
    const skip = parseInt(req.query.offset) || 0
    const limit = parseInt(req.query.limit) || 10 
    try {
        const platform = await Platform.findById(req.params.id).slice(`subscribers`, [skip,limit]).populate('subscribers.userId', 'username')
        if (!platform) return res.status(400).json({msg:"Platform ID does not exist"})

        const plat = await Platform.findById(req.params.id)
        const memberListTotalCount = plat.subscribers.length
        const memberListPages = Math.ceil(memberListTotalCount / limit )
        const memberListPage = skip / limit

        return res.status(200).json( { memberList: platform.subscribers, memberListPage, memberListPages, memberListTotalCount } )

    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const searchLeaderboard = async (req, res) => {
    const { type, name } = req.query 
    
    if (type !== 'daily' && type !== 'weekly' && type !== 'monthly' && type !== 'year' && type !== 'allTime')
    return res.status(404).json({ errors: { invalidLeaderboardType: 'Invalid leaderboard type'}}); 

    try {
        const user = await User.findOne({ username: name })
        if (!user) return res.status(404).json({ errors: { userDNE: 'User does not exist'} } )

        const [ info ] = await Platform.aggregate([
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

        if (!info) return res.status(404).json({ msg: "Platform doesn't exist "} )

        const skip = Math.floor(info.index / 10) * 10

        const [ leaderboardInfo ] = await Platform.aggregate([
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

        if (!leaderboardInfo) return res.status(404).json({ msg: "Platform doesn't exist "} )

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

export const getLeaderboardByType = async (req, res) => {
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
        
        const [ leaderboardInfo ] = await Platform.aggregate([
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
        
        if (!leaderboardInfo) return res.status(404).json({ msg: "Platform doesn't exist "} )
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

export const uploadImage = async (req, res) => {
    const { userId, type } = req.body
    console.log(type)
    try {
        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(200).json({ msg: "Platform doesn't exist" });

        if (userId !== String(platform.owner)) {
            let errors = {};
            errors.invalidOwner = "You don't have update permissions";
            return res.status(200).json({ errors: errors });
        }
        console.log(req.body, req.file, req.files)
        const cloud = await uploadImgToCloud(req.file.path)
        console.log(cloud)
        const newValues = {
            [type]: cloud.secure_url,
            [`${type}_cloud_id`]: cloud.public_id
        }

        console.log(newValues)
        const updatedPlatform = await Platform.findByIdAndUpdate(
            req.params.id, 
            { $set: newValues }, 
            { new: true }
        );
        if (!updatedPlatform) return res.status(200).json({ msg: "Something went wrong with updating platform" });

        res.status(200).json({ platform: updatedPlatform });
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: error.message })
    }
}

export const editMemberRole = async (req,res) => {
    const { memberId, senderId, role } = req.body
    let errors = {}
    try {
        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(200).json({ msg: "Platform doesn't exist" });

        
        const sender = platform.subscribers.find((s) => s.userId.toString() === senderId) 
        const member = platform.subscribers.find((s) => s.userId.toString() === memberId)
        
        if (sender.role !== 'Creator' && sender.role !== 'Moderator') {
            errors.invalidPromotion = "You aren't a creator / moderator"
            return res.status(200).json( {errors: errors})
        }
        if (sender.role === member.role) {
            errors.invalidPromotion = 'You have the same role'
            return res.status(200).json( {errors: errors})
        }
        if (member.role === 'Creator') {
            errors.invalidPromotion = "Can't change role of Creator"
            return res.status(200).json( {errors: errors})
        }

        const updatedPlatform = await Platform.findOneAndUpdate(
            {_id: req.params.id, "subscribers.userId": memberId },
            { $set: { "subscribers.$.role": role } },
            { new: true }
        )
        return res.status(200).json( { platform: updatedPlatform } )   
           
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}