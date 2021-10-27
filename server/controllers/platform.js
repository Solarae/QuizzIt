import User from '../models/User.js'
import Platform from '../models/Platform.js'

export const createPlatform = async (req, res) => {
    const { userId, platformName } = req.body;

    try {
        const user = User.findById(userId);
        if (!user) return res.status(404).json({ msg: `No user with id: ${userId}` });

        const platform = Platform.findOne({ name: platformName });
        if (platform) return res.status(404).json({ msg: `Platform with name: ${platformName} already exists` });

        const newPlatform = new Platform({ name: platformName, owner: userId });
        const createdPlatform = await newPlatform.save();

        if (!createdPlatform) return res.status(404).json({ msg: "Something went wrong with registering the user" });

        user.platformInfos.push( {
            platformId: createdPlatform._id,
            points: {
                daily: 0,
                weekly: 0,
                monthly: 0,
                biannual: 0,
                yearly: 0,
                allTime: 0
            },
            role: 'Creator'
        })

        res.status(200).json({ platform: createdPlatform })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const deletePlatform = async (req, res) => {
    try {
        const deletePlatform = await Todo.findById(req.params.id);
        deletePlatform.remove();

        const user = await User.findById(deleteTodo.user)
        if (!user) return res.status(404).json({ msg: "User doesn't exist" })

        User.updateMany(
            { _id: { $in: deletePlatform.users } },
            { $pull: { platformInfos : { platform: deletePlatform._id }}}
        )
        res.status(200).json({ platform: deletePlatform })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const joinPlatform = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User doesn't exist" })

        const platform = await Todo.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        const isMember = platform.users.filter((id) => userId !== id);

        if (!isMember) platform.users.push(userId);

        user.platformInfos.push( {
            platformId: platform._id,
            points: {
                daily: 0,
                weekly: 0,
                monthly: 0,
                biannual: 0,
                yearly: 0,
                allTime: 0
            },
            role: 'Member'
        })

        res.status(200).json(platform);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const leavePlatform = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User doesn't exist" })

        const platform = await Todo.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        platform.users.pull(platform._id)

        user.update( 
            { $pull: { platformInfos : { platform: platform._id }}}
        )

        res.status(200).json(platform);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const reportPlatform = async (req, res) => {
    const { userId, text } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User doesn't exist" })

        const platform = await Todo.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        platform.reports.push({
            userId: user._id,
            text: text 
        })

        res.status(200).json(platform);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}