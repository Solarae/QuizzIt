import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config()

import { JWT_SECRET } from '../config.js';

export const verify = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token)
            return res.status(401).json({ msg: 'No token'})
        
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
}

export const verifyUser = (req) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return null;
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken.userId;
    } catch (err) {
        return null;
    }
}

export const signInToken = (userId) => {
    return jwt.sign({
        userId: userId
    }, process.env.JWT_SECRET);
}

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) 
        return res.status(401).json({ msg: 'No token' })

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded 
        next()
    } catch (error) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
}