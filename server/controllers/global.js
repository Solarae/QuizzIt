import Global from '../models/Global.js'
import User from '../models/User.js'

export const getLeaderboard = async (req, res) => {
    const { type, userId } = req.query
    const skip = parseInt(req.query.offset) || 0
    const limit = parseInt(req.query.limit) || 10 
    
    if (type !== 'daily' && type !== 'weekly' && type !== 'monthly' && type !== 'year' && type !== 'allTime')
        return res.status(404).json({ msg: "Invalid leaderboard type" }); 

    try {
        const id = await getGlobalId()
        var projectQuery
        
        if (userId) {
            const user = await User.findById(userId)
            if (!user) res.status(404).json({ msg: "User doesn't exist" });
            projectQuery = {
                leaderboard: {
                    $slice: [{ $filter: { 
                        input: `$${type}_leaderboard`,
                        as: "rank", 
                        cond:  { $in: ["$$rank.userId", user.friends] } 
                    }}, skip, limit]
                },
                totalCount: {
                    $size: { $filter: { 
                        input: `$${type}_leaderboard`,
                        as: "rank", 
                        cond:  { $in: ["$$rank.userId", user.friends] } 
                    }}
                }
            }
        } else {
            projectQuery = {
                leaderboard: {
                    $slice: [`$${type}_leaderboard`, skip, limit]
                },
                totalCount: {
                    $size: `$${type}_leaderboard`
                }
            }
        }
        
        const [ leaderboardInfo ] = await Global.aggregate([
            { $match: { _id: ObjectId(id) } },
            { $project: projectQuery },
            { $lookup: {
                from: "users",
                localField: "leaderboard.userId",
                foreignField: "_id",
                as: "populatedLeaderboard"
            }},
            { $set: {
                leaderboard: {
                    $map: {
                        input: "$leaderboard",
                        as: "rank",
                        in: {
                            $mergeObjects: [
                                "$$rank",
                                { $arrayElemAt: [
                                    "$populatedLeaderboard",
                                    { $indexOfArray: [ "$populatedLeaderboard._id", "$$rank.userId" ] }
                                ]}
                            ]
                        }
                    }
                }
            }},
            { $project: {
                _id: 1,
                totalCount: 1,
                leaderboard: {
                    _id: 1,
                    points: 1,
                    username: 1
                }
            }}
        ])
        
        if (!leaderboardInfo) return res.status(404).json({ msg: "Global doesn't exist "} )
        const leaderboardPage = (skip / limit) + 1
        const leaderboardPages = Math.ceil(leaderboardInfo.totalCount / limit)
       
        res.status(200).json({
            leaderboard: leaderboardInfo.leaderboard,
            leaderboardPage,
            leaderboardPages,
            leaderboardTotalCount: leaderboardInfo.totalCount
        })
    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}

export const searchLeaderboard = async (req, res) => {
    const { type, name } = req.query 
    
    if (type !== 'daily' && type !== 'weekly' && type !== 'monthly' && type !== 'year' && type !== 'allTime')
    return res.status(404).json({ errors: { invalidLeaderboardType: 'Invalid leaderboard type'}}); 

    try {
        const id = await getGlobalId()
    
        const user = await User.findOne({ username: name })
        if (!user) return res.status(404).json({ errors: { userDNE: 'User does not exist'} } )

        const [ info ] = await Global.aggregate([
            { $match: {_id: ObjectId(id) } },
            { $project: {
                index: {
                    $indexOfArray: [
                        `$${type}_leaderboard.userId`,
                        user._id
                    ]
                  },
            }}
        ])

        if (!info) return res.status(404).json({ msg: "Global doesn't exist "} )

        const skip = Math.floor(info.index / 10) * 10

        const [ leaderboardInfo ] = await Global.aggregate([
            { $match: { _id: ObjectId(id) } },
            { $project: {
                leaderboard: {
                    $slice: [`$${type}_leaderboard`, skip, 10]
                },
                totalCount: {
                    $size: `$${type}_leaderboard`
                }
            }},
            { $lookup: {
                from: "users",
                localField: "leaderboard.userId",
                foreignField: "_id",
                as: "populatedLeaderboard"
            }},
            { $set: {
                leaderboard: {
                    $map: {
                        input: "$leaderboard",
                        as: "rank",
                        in: {
                            $mergeObjects: [
                                "$$rank",
                                { $arrayElemAt: [
                                    "$populatedLeaderboard",
                                    { $indexOfArray: [ "$populatedLeaderboard._id", "$$rank.userId" ] }
                                ]}
                            ]
                        }
                    }
                }
            }},
            { $project: {
                _id: 1,
                totalCount: 1,
                leaderboard: {
                    _id: 1,
                    points: 1,
                    username: 1
                }
            }} 
        ])

        if (!leaderboardInfo) return res.status(404).json({ msg: "Global doesn't exist "} )

        const leaderboardPage = skip / 10
        const leaderboardPages = Math.ceil(leaderboardInfo.totalCount / 10 )

        res.status(200).json({ 
            leaderboard: leaderboardInfo.leaderboard, 
            leaderboardPage, 
            leaderboardPages ,
            leaderboardTotalCount: leaderboardInfo.totalCount });
    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}

const getGlobalId = async () => {
    try {
        const [ global ] = await Global.find({})
        return global._id
    } catch (error) {
        res.status(404).json({ msg: error.message }) 
    }
}