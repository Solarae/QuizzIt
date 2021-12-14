import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwtDecode from 'jwt-decode'
import User from '../models/User.js'
import { uploadImgToCloud, queryBuilder, paginateQuery, assignCreator } from "./util.js";

import { JWT_SECRET } from '../config.js';
import { validateSignUpInput, validateSignInInput, validateEmail } from '../utils/validators.js';

import { io, onlineUsers } from '../index.js'
import { deletePlatform } from "./platform.js";
import Platform from "../models/Platform.js";
import Report from "../models/Report.js";
import Quiz from "../models/Quiz.js";
import Award from "../models/Award.js";
import Submission from "../models/Submission.js";
import Global from "../models/Global.js";

export const signin = async (req, res) => {
    const { username, password } = req.body;
    const { errors, valid } = validateSignInInput(username, password);

    if (!valid) {
        return res.status(200).json({ errors: errors });
    }

    try {
        const user = await User.findOne({ username })

        if (!user) {
            errors.noUser = "User does not exist";
            return res.status(200).json({ errors: errors });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            errors.invalidCredentials = "Invalid credentials";
            return res.status(200).json({ errors: errors });
        }

        const token = jwt.sign({ user: { id: user._id, username: user.username, email: user.email, likes: user.likes } }, JWT_SECRET, { expiresIn: 3600 });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                likes: user.likes,
                icon: user.icon,
                token
            }
        })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const tokenSignin = async (req, res) => {
    const { userToken } = req.body;
    const errors = {}

    try {
        const decodedToken= jwtDecode(userToken)
        const user = await User.findById(decodedToken.user.id)

        if (!user) {
            errors.noUser = "User does not exist";
            return res.status(200).json({ errors: errors });
        }

        const token = jwt.sign({ user: { id: user._id, username: user.username, email: user.email, likes: user.likes } }, JWT_SECRET, { expiresIn: 3600 });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                icon: user.icon,
                username: user.username,
                email: user.email,
                likes: user.likes,
                token
            }
        })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const signup = async (req, res) => {
    const { username, email, password } = req.body
    const { errors, valid } = validateSignUpInput(username, email, password);

    if (!valid) {
        return res.status(200).json({ errors: errors });
    }

    try {
        const user = await User.findOne({ username })
        if (user) {
            errors.userExists = "User already exists";
            return res.status(200).json({ errors: errors });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        const newUser = new User({
            username: username,
            email: email,
            password: hash,
        })

        const resUser = await newUser.save();
        if (!resUser) return res.status(404).json({ msg: "Something went wrong with registering the user" });

        const token = jwt.sign({ user: { id: newUser._id, username: newUser.username, email: newUser.email, likes: newUser.likes } }, JWT_SECRET, {
            expiresIn: 3600
        })

        res.status(200).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
        })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const editAccount = async (req, res) => {
    const { id, username, email, password, currentPassword } = req.body
    const errors = {}

    try {
        const user = await User.findById(id)
        if (!user) return res.status(404).json({ msg: "User doesn't exist" });

        var newUser;
        if (username != null) {
            if (username.trim() == "") {
                errors.emptyUsername = "Username cannot be empty"
                return res.status(200).json({ errors: errors });
            }

            // check if user with username already exists
            const existingUser = await User.findOne({ username: username })
            if (existingUser) {
                errors.existingUser = "User with username already exists"
                return res.status(200).json({ errors: errors });
            }

            // update user 
            newUser = await User.findByIdAndUpdate(id, { username: username }, { new: true })
        } else if (password != null) {
            if (currentPassword.trim() == "") {
                errors.emptyCurrentPassword = "Fields cannot be empty"
                return res.status(200).json({ errors: errors });
            }
            if (password.trim() == "") {
                errors.emptyNewPassword = "Fields cannot be empty"
                return res.status(200).json({ errors: errors });
            }

            // password confirmation before changing password
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                errors.invalidPassword = "Incorrect Current Password";
                return res.status(200).json({ errors: errors });
            }

            // update user with new password
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt)
            newUser = await User.findByIdAndUpdate(id, { password: hash }, { new: true })
        } else if (email != null) {
            // check if new email is valid 
            if (!validateEmail(email)) {
                errors.invalidEmail = "Invalid Email Address";
                return res.status(200).json({ errors: errors });
            }

            // update user with new email 
            newUser = await User.findByIdAndUpdate(id, { email: email }, { new: true })
        }

        if (!newUser) return res.status(200).json({ success: false })
        return res.status(200).json({
            success: true,
            user: {
                id: newUser._id,
                icon: newUser.icon,
                username: newUser.username,
                email: newUser.email,
                likes: newUser.likes,
                friends: newUser.friends
            }
        })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const deleteAccount = async (req, res) => {
    const { id, password,createdPlatforms,subscribedPlatforms} = req.body
    console.log("createdPlatforms                          "+createdPlatforms)
    console.log("subscribed platforms                      "+subscribedPlatforms)
    const errors = {}

    try {
        const user = await User.findById(id)
        if (!user) return res.status(404).json({ msg: "User doesn't exist" });

        // check if passwords match 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            errors.invalidPassword = "Incorrect Password";
            return res.status(200).json({ errors: errors });
        }

        //for each subscribed platform, remove subscriptions, leaderboard info
        subscribedPlatforms.forEach(async (platform)=>{
            await Platform.findByIdAndUpdate(
                platform._id,
                { $pull: { subscribers: { userId: id }  , daily_leaderboard:{userId:id}  , monthly_leaderboard:{userId:id}  ,   weekly_leaderboard:{userId:id}  , yearly_leaderboard:{userId:id}  , allTime_leaderboard:{userId:id} , reports:{userId:id}  },
                $inc: { 'subscriberCount': -1 },  
            })
        })


        //remove from global leaderboard
        await Global.findOneAndUpdate(
            {},
            { $pull: {daily_leaderboard:{userId:id}  , monthly_leaderboard:{userId:id}  ,   weekly_leaderboard:{userId:id}  , yearly_leaderboard:{userId:id}  , allTime_leaderboard:{userId:id} , reports:{userId:id} }
        })





        //for created platforms, transfer ownership to moderator,if no moderator, transfer to consumer, if no consumer, simply delete platform
        createdPlatforms.forEach(async (element)=>{

            let platform = await Platform.findById(element._id)
            let moderators = platform.subscribers.find(s=>s.role=="Moderator")
            //assign creator


            if(moderators){
                //assign creator to one of the moderator
                assignCreator(platform._id, moderators.userId)
            }
            //assign to consumer
            else if(platform.subscribers && platform.subscribers.length>1){
                let consumer = platform.subscribers.find(s=>s.role=="Consumer")
                assignCreator(platform._id,consumer.userId)
            }
            //no one to assign. Delete platform
            else{
                await Report.deleteMany({platformId:platform._id})
                await Quiz.deleteMany({platformId:platform._id})
                await Award.deleteMany({platformId:platform._id})

                await Platform.findByIdAndDelete(platform._id)
            }
        })



        //delete all the reports 
        await Report.deleteMany({submittedBy:id})

        //delete all submissions
        await Submission.deleteMany({userId:id})

        //delete all the quizzes made

        let ownedQuizzes = await Quiz.find({owner:id})

        ownedQuizzes.forEach(async (quiz)=>{

            //for every quiz, delete the submissions and reports that utilizes those quiz
            await Submission.deleteMany({quizId:quiz._id})
            await Report.deleteMany({submittedBy:quiz._id})
        })

        //delete quizzes
        await Quiz.deleteMany({owner:id})
        

        //for every friend, delete the friend
        user.friends.forEach(async (friend)=>{

            await User.findByIdAndUpdate(
                friend._id,
                { $pull: { friends: { userId: id } },  
            })
        })


        // finally, delete the user
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) return res.status(404).json({ success: false })


        return res.status(200).json({
            success: true,
            user: {
                id: deletedUser._id,
                username: deletedUser.username,
                email: deletedUser.email,
            }
        })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getUsersByFilter = async (req, res) => {
    try {
        var query = queryBuilder(null, req.query, User)
        const { q, page, pages, totalCount } = await paginateQuery(query, User, req.query.limit, req.query.offset)

        if (page > pages) 
            return res.status(404).json({ msg: "Page doesn't exist" })
        
        const users = await q

        res.status(200).json({ 
            users,
            page,
            pages,
            totalCount
        });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getInbox = async (req, res) => {
    console.log("INSIDE INBOX")
    const skip = parseInt(req.query.offset) || 0
    const limit = parseInt(req.query.limit) || 5 

    try {
        const slicedUser = await User.findById(req.params.id).slice(`inbox`, [skip,limit])
        const user = await User.findById(req.params.id)

        res.status(200).json({ 
            inbox: slicedUser.inbox,
            inboxPage: (skip / limit) + 1,
            inboxPages: Math.ceil(user.inbox.length / limit),
            inboxTotalUnreadCount: user.inbox.filter(i => !i.read).length,
            inboxTotalCount: user.inbox.length });
    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}

export const readNotification = async (req, res) => {
    console.log("INSIDE READ NOTIFICATION")
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id, "inbox._id": req.params.nid },
            { $set: { "inbox.$.read": true } },
            { new: true }
        )
     
        const index = user.inbox.findIndex((i => i._id.toString() === req.params.nid))
        
        res.status(200).json({ 
            updatedNotification: user.inbox[index], 
            index });
    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}

export const getFriendRequests = async (req, res) => {
    console.log("INSIDE GET FRIEND REQUESTS")
    const skip = parseInt(req.query.offset) || 0
    const limit = parseInt(req.query.limit) || 5 

    try {
        const user = await User.findById(req.params.id).slice('friendRequests', [skip,limit]).populate('friendRequests', 'username email icon')
        const u = await User.findById(req.params.id)

        const friendRequestsTotalCount = u.friendRequests.length
        const friendRequestsPages = Math.ceil(friendRequestsTotalCount / limit)
        const friendRequestsPage = (skip / limit) + 1

        res.status(200).json({ friendRequests: user.friendRequests, friendRequestsPage, friendRequestsPages, friendRequestsTotalCount });

    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}

export const sendFriendRequest = async (req, res) => {
    console.log("INSIDE SEND FRIEND REQ")
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $push: { friendRequests: { $each: [req.params.uid], $position: 0 }}},
            { new: true }
        )

        if (!user) return res.status(400).json({msg:"User does not exist"})
        
        res.status(200).json({ 
            userId: req.params.uid });
        
        if (onlineUsers.get(req.params.id)) {
            const sender = await User.findById(req.params.uid).select('username icon')
            io.to(onlineUsers.get(req.params.id)).emit('receiveFriendRequest', {
                friendRequest: sender
            })
        } 
    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}

export const acceptFriendRequest = async (req, res) => {
    console.log("INSIDE ACCEPT FRIEND REQ")
    try {
        const sender = await User.findByIdAndUpdate(
            req.params.uid,
            { $addToSet: { friends: req.params.id} },
            { new: true }
        )

        if (!sender) return res.status(400).json({msg:"User does not exist"})

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { friendRequests: req.params.uid },
            $addToSet: { friends: req.params.uid} },
            { new: true }
        )

        const other = await User.findByIdAndUpdate(
            req.params.uid,
            { $push: { inbox : {
                message: `${user.username} has accepted your friend request`,
                read: false
            } } },
            { new: true }
        )

        res.status(200).json({uid: req.params.uid});

        if (onlineUsers.get(req.params.uid)) {
            io.to(onlineUsers.get(req.params.uid)).emit('getInbox', { 
                inbox: [other.inbox[0]]
            })
        } 
    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}

export const declineFriendRequest = async (req, res) => {
    console.log("INSIDE DECLINE FRIEND REQ")
    try {
        await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { friendRequests: req.params.uid }},
            { new: true }
        )

        res.status(200).json({uid: req.params.uid});
    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}

export const getFriends = async (req, res) => {
    console.log("INSIDE GET FRIEND")
    const skip = parseInt(req.query.offset) || 0
    const limit = parseInt(req.query.limit) || 10

    try {
        const user = await User.findById(req.params.id).slice('friends', [skip,limit]).populate('friends', 'username email icon')
        const u = await User.findById(req.params.id)

        const friendsTotalCount = u.friends.length
        const friendsPages = Math.ceil(friendsTotalCount / limit)
        const friendsPage = (skip / limit) + 1

        res.status(200).json({ friends: user.friends, friendsPage, friendsPages, friendsTotalCount });
    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}

export const unfriend = async (req, res) => {
    console.log("INSIDE DELETE FRIEND")
  
    try {
        await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { friends: req.params.uid }},
            { new: true }
        )

        await User.findByIdAndUpdate(
            req.params.uid,
            { $pull: { friends: req.params.id }},
            { new: true }
        )

        res.status(200).json({uid: req.params.uid});
    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}

// To change a field, say name, newValue should be
// newValue = {
//  name: "NewName"
// }
export const updateUser = async (req, res) => {
    const { newValue, userId } = req.body
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(200).json({ msg: "User doesn't exist" });

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: newValue },
            { new: true }
        );
        if (!updatedUser) return res.status(200).json({ msg: "Something went wrong with updating user" });

        res.status(200).json(
            {
                user: {
                    id: updatedUser._id,
                    icon: updatedUser.icon,
                    username: updatedUser.username,
                    email: updatedUser.email,
                    likes: updatedUser.likes,
                    friends: updatedUser.friends
                }
            });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const uploadImage = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ errors: { userDNE: 'User does not exist'} })
        const cloud = await uploadImgToCloud(req.file.path)

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: { icon: cloud.secure_url, icon_cloud_id: cloud.public_id } }, 
            { new: true }
        );
        if (!updatedUser) return res.status(200).json({ msg: "Something went wrong with updating quiz" });

        res.status(200).json({
            user: {
                id: updatedUser._id,
                icon: updatedUser.icon,
                username: updatedUser.username,
                email: updatedUser.email,
                likes: updatedUser.likes,
                friends: updatedUser.friends
            }
        });
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: error.message })
    }
}