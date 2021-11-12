import User from './models/User.js'
import Submission from './models/Submission.js'
import Platform from './models/Platform.js'

import { startOfYesterday, startOfToday, endOfToday, startOfWeek, startOfMonth, startOfYear } from 'date-fns'

const TYPES = ['platform']
const TIMES = ['daily', 'weekly', 'monthly', 'year', 'allTime']

export const updateLeaderboards = async () => {
    for (const type of TYPES) {
        for (const t of TIMES) {
            console.log(type, t)
            updateLeaderboard(type, t)
        }
    }
}

export const updateLeaderboard = async (type, time) => {
    try {
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
        console.log(type)
        console.log(start)
        if (time != 'allTime') {
            await Submission.aggregate([
                { $match: { createdAt: { $gte: start, $lt: end } } },
                { $group: groupQuery1 },
                { $sort: { points: -1 } },
                { $group: groupQuery },
                { $merge: {
                    into: "platformDup",
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
                    into: "platformDup",
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