import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import platformRoutes from './routes/platform.js'
import quizRoutes from './routes/quiz.js'
import submissionRoutes from './routes/submission.js'
import awardRoutes from './routes/award.js'

import { updateLeaderboardsJob, duplicateDB } from './schedule.js'

dotenv.config()

import { MONGO_URI } from './config.js';

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(cors({ 
    origin: ["http://localhost:3000", "https://quizz-it.netlify.app"],
    credentials: true }));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!')
})


mongoose.connect(MONGO_URI, {useNewURLParser: true, useUnifiedTopology: true})
    .then(() => console.log(`MongoDB connected`))
    .catch(error => console.log(error.message));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/submissions',submissionRoutes)
app.use('/api/quizzes', quizRoutes);
app.use('/api/awards', awardRoutes);

// Setup Server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://quizz-it.netlify.app"]
    }
})

var onlineUsers = new Map()

const getByValue = (searchValue, map) => {
    for (const [key, value] of map.values()) {
        if (value == searchValue)
            return key
    }
    console.log(`Client has left`)
    return null
}

io.on('connection', (socket) => {
    console.log(`Client has connected`)

    socket.on('newUser', (userId) => {
        onlineUsers.set(userId, socket.id)
        console.log(`${userId} has logged in`)
    })

    socket.on('disconnect', () => {
        onlineUsers.delete(getByValue(socket.id, onlineUsers))
        console.log(onlineUsers.size)
        console.log(`Client has left`)
    })
})

export { io, onlineUsers }