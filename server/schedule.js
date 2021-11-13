import User from './models/User.js'
import Submission from './models/Submission.js'
import Platform from './models/Platform.js'

import cron from 'node-cron'

import { startOfYesterday, startOfToday, endOfToday, startOfWeek, startOfMonth, startOfYear } from 'date-fns'

const TYPES = ['platform', 'quiz']
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
        if (type == 'platform')
            collectionName = 'platforms'
        else
            collectionName = 'quizzes'
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
        const groupQuery1 = {
            _id: {
                [`${type}Id`]: `$${type}Id`,
                userId: "$userId",
            },
              points: {
                $sum: "$score"
            }
        }
        const groupQuery = {
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
                { $group: groupQuery1 },
                { $sort: { points: -1 } },
                { $group: groupQuery },
                { $merge: {
                    into: collectionName,
                    on: "_id",
                    whenMatched: "merge"
                } }
            ])
        } else {
            await Submission.aggregate([
                { $group: groupQuery1 },
                { $sort: { points: -1 } },
                { $group: groupQuery },
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
    await Platform.aggregate([ { $match: {} }, { $out: "platformDup" } ])
}

export const updateLeaderboardsJob = cron.schedule('0 0 * * *', updateLeaderboards);