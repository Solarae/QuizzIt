import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/User.js'

import { JWT_SECRET } from '../config.js';
import { validateSignUpInput, validateSignInInput } from '../util/validators.js';

export const signin = async (req, res) => {
    const { username , password } = req.body;
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
                name: newUser.name,
                email: newUser.email,
            }
        })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const editAccount = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ msg: "User doesn't exist" });

        const newUser;
        if (name) {
            newUser = await User.findByIdAndUpdate(req.params.id, { name: name }, { new : true })
        } else if (password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt)
            newUser = await User.findByIdAndUpdate(req.params.id, { password: hash }, { new : true })
        } else {
            newUser = await User.findByIdAndUpdate(req.params.id, { email: email }, { new : true })
        }
        if (!newUser) return res.status(200).json({ success: false})
        return res.status(200).json({ success: true })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}