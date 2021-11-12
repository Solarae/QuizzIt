import User from './models/User.js'
import Submission from './models/Submission.js'

const TYPES = ['platform', 'quiz']
const TIMES = ['daily', 'weekly', 'monthly', 'biannual', 'year', 'allTime']

export const updateLeaderboards = async () => {
    for (const type of TYPES) {
        for (const t of TIMES) {
            updateLeaderboard(type, t)
        }
    }
}

export const updateLeaderboard = async (type, time) => {
    try {
        const groupQuery1 = {
            _id: {
                [`${type}Id`]: `$${type}Id`,
                userId: "$userId",
            },
              points: {
                $sum: "$pointsAwarded"
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
        const result = await Submission.aggregate([
            { $match: { time: { $lte : 10 } } },
            { $group: groupQuery1 },
            { $sort: { points: -1 } },
            { $group: groupQuery  },
            { $merge: {
                into: "mycopy",
                on: "_id",
                whenMatched: "merge"
            } }
        ])
        console.log(result)
    } catch (error) {
        console.log(error.message)
    }
}

export const duplicateDB = async () => {
    await Platform.aggregate([ { $match: {} }, { $out: "mycopy" } ])
}