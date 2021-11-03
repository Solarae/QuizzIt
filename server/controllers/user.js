import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/User.js'

import { JWT_SECRET } from '../config.js';
import { validateSignUpInput, validateSignInInput, validateEmail } from '../util/validators.js';

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

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
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

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
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
        if (username!=null) {
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
        } else if (password!=null) {
            if (currentPassword.trim() == "") {
                errors.emptyCurrentPassword = "Fields cannot be empty"
                return res.status(200).json({ errors: errors });
            }
            if (password.trim() == "") {
                errors.emptyNewPassword= "Fields cannot be empty"
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
        } else if (email!=null) {
            // check if new email is valid 
            if (!validateEmail(email)){
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
                username: newUser.username,
                email: newUser.email,
            }
        })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const deleteAccount = async (req, res) => {
    const { id, password } = req.body
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

        // delete the user
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
    var query = {}
    for(var key in req.query){ 
        query[key] = {
            "$regex": req.query.input, 
            "$options": "i"
        }
    }

    try {
        const users = await User.find(query);
        res.status(200).json({ users: users });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}