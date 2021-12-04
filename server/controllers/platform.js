import bcrypt from "bcryptjs";

import User from '../models/User.js'
import Platform from '../models/Platform.js'
import { uploadImgToCloud, queryBuilder, paginateQuery } from "./util.js";

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

        user.platforms.push(createdPlatform._id)

        await user.save();

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

        
        //proceed to remove platform
        await platform.remove();

        const count = await User.updateMany(
            { _id: { $in: platform.subscribers.map(s => s.userId ) } },
            { $pull: { platforms: platform._id } }
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

        // check if confirmPassword matches with owner's password\
        /*
        const isMatch = await bcrypt.compare(confirmPassword, owner.password);
        if (!isMatch) {
            errors.invalidPassword = "Incorrect Password";
            return res.status(200).json({ errors: errors });
        }
        */

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
        
        user.platforms.push(platform._id)
        await user.save();

        res.status(200).json({ platform: updatedPlatform });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const leavePlatform = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User doesn't exist" })

        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        const updatedPlatform = await Platform.findByIdAndUpdate(
            req.params.id,
            { $pull: { subscribers: { userId: user._id } } },
            { new: true }
        )
        // platform.subscribers.pull(user._id)
        // await platform.save();

        await user.update(
            { $pull: { platforms: platform._id } },
            { new: true }
        )

        res.status(200).json({ platform: updatedPlatform });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const reportPlatform = async (req, res) => {
    const { userId, text } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User doesn't exist" })

        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

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

export const getLeaderboardByType = async (req, res) => {
    const { type } = req.query
    const skip = parseInt(req.query.offset) || 0
    const limit = parseInt(req.query.limit) || 10 
    
    if (type !== 'daily' && type !== 'weekly' && type !== 'monthly' && type !== 'year' && type !== 'allTime')
        return res.status(404).json({ msg: "Invalid leaderboard type" }); 

    try {
        const platform = await Platform.findById(req.params.id).slice(`${type}_leaderboard`, [skip,limit]).populate(`${type}_leaderboard.userId`, 'username')
        if (!platform) return res.status(200).json({ msg: "Platform doesn't exist" });
        const plat = await Platform.findById(req.params.id)

        const leaderboardTotalCount = plat[`${type}_leaderboard`].length
        const leaderboardPages = Math.ceil(leaderboardTotalCount / limit)
        const leaderboardPage = skip / limit

        res.status(200).json({ leaderboard: platform[`${type}_leaderboard`], leaderboardPage, leaderboardPages, leaderboardTotalCount });
    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}


export const upvotePlatform = async (req,res) =>{
    let platformId = req.params.id
    let { userId } = req.body
    try {

        //check if the user already liked the platform
        let user = await User.findById(userId)
        if(!user) return res.status(404).json({message:"user not found"})
        let likedPlatforms = user.likes.likedPlatforms
        let dislikedPlatforms = user.likes.dislikedPlatforms

        //if already liked, then unlike it and then return
        if(likedPlatforms.includes(platformId)){
            //decrement the like on platform
            let platform = await Platform.findByIdAndUpdate(platformId, {$inc:{'likes.totalLikes':-1}} , {new:true} )

            //remove from liked quizzes
            likedPlatforms.pull(platformId)
            let updatedUser = await user.save()

            let userPayload = {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                likes: updatedUser.likes
            }

            return res.status(200).json({platform:platform,user:userPayload})
        }
        //if the platform is already disliked, then undo dislike
        else if (dislikedPlatforms.includes(platformId)){
            dislikedPlatforms.pull(platformId)
            await user.save()
            await Platform.findByIdAndUpdate(platformId, {$inc:{'likes.totalDislikes':-1}})
        }
    
        //perform upvote/like
        likedPlatforms.push(platformId)
        let updatedUser = await user.save()
        let userPayload = {
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            likes: updatedUser.likes
        }
        let platform = await Platform.findByIdAndUpdate(platformId, {$inc:{'likes.totalLikes':1}} , {new:true} )

        if (!platform) {return res.status(400).json({msg:"Platform ID not found"})}

        return res.status(200).json({platform:platform,user:userPayload})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}

export const downvotePlatform = async (req,res) =>{

    let platformId = req.params.id
    let {userId} = req.body
    try {

        //check if the user already disliked the platform
        let user = await User.findById(userId)
        let likedPlatforms    = user.likes.likedPlatforms 
        let dislikedPlatforms = user.likes.dislikedPlatforms


        //if already disliked, then unlike it and return
        if(dislikedPlatforms.includes(platformId)){
            //decrement the dislike on platform
            let platform = await Platform.findByIdAndUpdate(platformId, {$inc:{'likes.totalDislikes':-1}} , {new:true} )

            //remove from disliked quizzes
            dislikedPlatforms.pull(platformId)
            let updatedUser = await user.save()

            let userPayload = {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                likes: updatedUser.likes
            }

            return res.status(200).json({platform:platform,user:userPayload})
        }

        //else if the platform is already liked, then undo like
        else if (likedPlatforms.includes(platformId)){
            likedPlatforms.pull(platformId)
            await user.save()
            await Platform.findByIdAndUpdate(platformId, {$inc:{'likes.totalLikes':-1}})


        }
        //perform downvote/dislike
        dislikedPlatforms.push(platformId)
        let updatedUser = await user.save()
        let userPayload = {
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            likes: updatedUser.likes
        }

        let platform = await Platform.findByIdAndUpdate(platformId, {$inc:{'likes.totalDislikes':1}} , {new:true} )

        if (!platform) {return res.status(400).json({msg:"Platform ID not found"})}

        return res.status(200).json({platform:platform,user:userPayload})

    } catch (error) {
        return res.status(500).json({message:error.message})
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