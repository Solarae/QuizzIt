import User from './models/User.js'
import Submission from './models/Submission.js'
import Platform from './models/Platform.js'

import { startOfYesterday, startOfToday, startOfWeek, startOfMonth, startOfYear } from 'date-fns'

const TYPES = ['platform', 'quiz']
const TIMES = ['daily', 'weekly', 'monthly', 'year', 'allTime']

export const updateLeaderboards = async () => {
    for (const type of TYPES) {
        for (const t of TIMES) {
            updateLeaderboard(type, t)
        }
    }
}

export const updateLeaderboard = async (type, time) => {
    try {
        const end = startOfToday()
        if (time === 'daily') {
            const start = startOfYesterday()
        } else if (time === 'weekly') {
            const start = startOfWeek()
        } else if (time === 'monthly') {
            const start = startOfMonth()
        } else {
            const start = startOfYear()
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
            const result = await Submission.aggregate([
                { $match: { createdAt: { $gte: start, $lt: end } } },
                { $group: groupQuery1 },
                { $sort: { points: -1 } },
                { $group: groupQuery  },
                { $merge: {
                    into: "platformDup",
                    on: "_id",
                    whenMatched: "merge"
                } }
            ])
        } else {
            const result = await Submission.aggregate([
                { $group: groupQuery1 },
                { $sort: { points: -1 } },
                { $group: groupQuery  },
                { $merge: {
                    into: "platformDup",
                    on: "_id",
                    whenMatched: "merge"
                } }
            ])
        }
        
        console.log(result)
    } catch (error) {
        console.log(error.message)
    }
}

export const duplicateDB = async () => {
    await Platform.aggregate([ { $match: {} }, { $out: "platformDup" } ])
}