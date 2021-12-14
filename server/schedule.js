import Award from './models/Award.js'
import Global from './models/Global.js'
import Platform from './models/Platform.js'
import Quiz from './models/Quiz.js'
import Report from './models/Report.js'
import Submission from './models/Submission.js'
import User from './models/User.js'
import cron from 'node-cron'

import { startOfYesterday, startOfToday, endOfToday, startOfWeek, startOfMonth, startOfYear } from 'date-fns'

const TYPES = ['platform', 'quiz', 'global']
const TIMES = ['daily', 'weekly', 'monthly', 'year', 'allTime']

const updateLeaderboards = async () => {
    const date = Date.now()
    console.log("Running scheduled job");
    for (const type of TYPES) {
        for (const t of TIMES) {
            updateLeaderboard(type, t)
        }
    }
    console.log(`Updating leaderboards successful after ${Date.now() - date}ms`);
}

const updateLeaderboard = async (type, time) => {
    try {
        var collectionName
        if (type === 'platform')
            collectionName = 'platforms'
        else if (type === 'quiz')
            collectionName = 'quizzes'
        else {
            collectionName = 'globals'
        }
        const end = endOfToday()
        var start
        if (time === 'daily') {
            start = startOfYesterday()
        } else if (time === 'weekly') {
            start = startOfWeek(end)
        } else if (time === 'monthly') {
            start = startOfMonth(end)
        } else {
            start = startOfYear(end)
        }

        const calculatePoints = type === 'global' ?
        {
            _id: {
                userId: "$userId",
            },
            points: {
                $sum: "$pointsAwarded"
            }
        } :
        {
            _id: {
                [`${type}Id`]: `$${type}Id`,
                userId: "$userId",
            },
            points: {
                $sum: "$pointsAwarded"
            }
        }

        const [ global ] = await Global.find({})
        const createLeaderboard = type === 'global' ? 
        {
            _id: global._id,
            [`${time}_leaderboard`]: {
                $push: {
                    userId: "$_id.userId",
                    points: "$points"
                }
            }
        } : 
        {
            _id: `$_id.${type}Id`,
            [`${time}_leaderboard`]: {
                $push: {
                    userId: "$_id.userId",
                    points: "$points"
                }
            }
        }
        if (time != 'allTime') {
            await Submission.aggregate([
                { $match: { createdAt: { $gte: start, $lt: end } } },
                { $group: calculatePoints },
                { $sort: { points: -1 } },
                { $group: createLeaderboard },
                { $merge: {
                    into: collectionName,
                    on: "_id",
                    whenMatched: "merge"
                } }
            ])
        } else {
            const results = await Submission.aggregate([
                { $group: calculatePoints },
                { $sort: { points: -1 } },
                { $group: createLeaderboard },
                { $merge: {
                    into: collectionName,
                    on: "_id",
                    whenMatched: "merge"
                } }
            ])
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

export const duplicateDB = async () => {
    await Award.aggregate([ { $match: {} }, { $out: "awardDuplicate" } ])
    await Global.aggregate([ { $match: {} }, { $out: "globalDuplicate" } ])
    await Platform.aggregate([ { $match: {} }, { $out: "platformDuplicate" } ])
    await Quiz.aggregate([ { $match: {} }, { $out: "quizDuplicate" } ])
    await Report.aggregate([ { $match: {} }, { $out: "reportDuplicate" } ])
    await Submission.aggregate([ { $match: {} }, { $out: "submissionDuplicate" } ])
    await User.aggregate([ { $match: {} }, { $out: "userDuplicate" } ])
}

export const updateLeaderboardsJob = cron.schedule('0 0 * * *', updateLeaderboards);
// export const updateLeaderboardsJob = cron.schedule('*/1 * * * *', updateLeaderboards);
