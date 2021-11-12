import User from './models/User.js'
import Platform from './models/Platform.js'

export const updateLeaderboards = async () => {
    updateLeaderboard('daily')
    updateLeaderboard('weekly')
    updateLeaderboard('monthly')
    updateLeaderboard('biannual')
    updateLeaderboard('year')
    updateLeaderboard('allTime')
}

export const updateLeaderboard = async (type) => {
    const sortQuery = {
        [`subscribers.points.${type}`]: -1
    }
    const groupQuery = {
        _id: "$_id",
        [`${type}_leaderboard`]: {
            $push: {
                userId: "$subscribers",
                points: `$subscribers.points.${type}`
            }
        }
    }
    const projectQuery = {
        platformId: "$_id",
        leaderboard: `$${type}_leaderboard`,
        type: `${type}`
    }
    const result = await Platform.aggregate([
        { $unwind: "$subscribers" },
        { $sort: sortQuery },
        { $group: groupQuery },
        { $project: projectQuery },
        { $out: "Hello"}
        // { $merge: {
        //     into: "testingM",
        //     on: "_id",
        //     whenMatched: "merge"
        // }}
        // { $unwind: "$subscribers" },
        // { $sort: { "subscribers.points.daily": -1 } },
        // { $group: { 
        //     _id: "$_id",
        //     "daily_leaderboard": { 
        //         $push: {
        //             userId: "$subscribers",
        //             points: "$subscribers.points.daily"
        //         }
        //     }
        // } },
        // { $project: { 
        //     platformId: "$_id",
        //     leaderboard: "$daily_leaderboard", 
        //     type: "daily" } },
        // { $merge: {
        //     into: "pokemon",
        //     on: "_id",
        //     whenMatched: "merge"
        // } }
    ])
    console.log(result)
}

export const duplicateDB = async () => {
    await Platform.aggregate([ { $match: {} }, { $out: "mycopy" } ])
}