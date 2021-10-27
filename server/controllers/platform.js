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
            platform: createdPlatform._id,
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

        User.updateMany (
            { _id: { $in: deletePlatform.users } },
            { $pull: { platformInfos : { platform: deletePlatform._id }}}
        )
        res.status(200).json({ platform: deletePlatform })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

