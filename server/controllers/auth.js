import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/User.js'

import { verify, verifyUser, signInToken } from '../middleware/auth.js'
import { validateSignUpInput, validateSignInInput, validateEmail } from '../utils/validators.js';

export const getSignedIn = async (req, res) => {
    try {
        console.log("Calling getSignedIn")
        const userId = verifyUser(req)
        console.log(userId)
        if (!userId) {
            return res.status(200).json({
                isAuthenticated: false,
                user: null,
            })
        }

        const loggedInUser = await User.findOne({ _id: userId });

        return res.status(200).json({
            isAuthenticated: true,
            user: {
                id: loggedInUser._id,
                username: loggedInUser.username,
                email: loggedInUser.email,
                friends: loggedInUser.friends,  
                role: loggedInUser.role,
                icon: loggedInUser.icon 
            }
        })
    } catch (error) {
        res.json(false)
    }
}

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

        const token = signInToken(user._id)
        console.log(token)
        console.log(user)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                friends: user.friends, 
                role: user.role,
                icon: user.icon         
            }
        })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const signout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
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

        const token = signInToken(resUser._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).status(200).json({
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                friends: newUser.friends,
                role: newUser.role,
                icon: newUser.icon
            }
        })

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}