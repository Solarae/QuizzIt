import bcrypt from "bcryptjs";

import User from '../models/User.js'
import Platform from '../models/Platform.js'

export const createPlatform = async (req, res) => {
    const { userId, name, description } = req.body;
    const errors = {};

    try {
        if (name.trim() === "") {
            errors.emptyName = "Platform name cannot be empty";
        }
        if (description.trim() === "") {
            errors.emptyDesc = "Platform description cannot be empty";
        }
        if (errors.emptyName || errors.emptyDesc) return res.status(200).json({ errors: errors });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: `No user with id: ${userId}` });

        const platform = await Platform.findOne({ name: name });
        if (platform) {
            errors.platformExists = `Platform with name: ${name} already exists`;
            return res.status(200).json({ errors: errors });
        }

        const newPlatform = new Platform({
            name: name,
            owner: userId,
            description: description,
            subscribers: [{
                userId,
                role: 'Creator'
            }]
        });
        const createdPlatform = await newPlatform.save();

        if (!createdPlatform) return res.status(404).json({ msg: "Something went wrong with creating the platform" });

        user.platformInfos.push(createdPlatform._id)

        await user.save();

        res.status(200).json({ platform: createdPlatform })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const deletePlatform = async (req, res) => {
    const { userId, confirmPassword } = req.body
    const errors = {}

    try {
        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        const owner = await User.findById(platform.owner);

        if (userId !== String(platform.owner)) {
            errors.invalidOwner = "You don't have delete permissions";
            return res.status(200).json({ errors: errors });
        }

        // check if confirmPassword matches with owner's password
        const isMatch = await bcrypt.compare(confirmPassword, owner.password);
        if (!isMatch) {
            errors.invalidPassword = "Incorrect Password";
            return res.status(200).json({ errors: errors });
        }

        await platform.remove();

        const count = await User.updateMany(
            { _id: { $in: platform.subscribers.map(s => s.userId ) } },
            { $pull: { platforms: platform._id } }
        )
        console.log(count)
        res.status(200).json({ platform: platform })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getPlatform = async (req, res) => {
    try {
        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(200).json({ msg: "Platform doesn't exist" });
        res.status(200).json({ platform: platform });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

// To change a field, say name, newValue should be
// newValue = {
//  name: "NewName"
// }
export const updatePlatform = async (req, res) => {
    const { newValue, userId, confirmPassword } = req.body
    try {
        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(200).json({ msg: "Platform doesn't exist" });

        const owner = await User.findById(platform.owner);

        if (userId !== String(platform.owner)) {
            errors.invalidOwner = "You don't have update permissions";
            return res.status(200).json({ errors: errors });
        }

        // check if confirmPassword matches with owner's password\
        /*
        const isMatch = await bcrypt.compare(confirmPassword, owner.password);
        if (!isMatch) {
            errors.invalidPassword = "Incorrect Password";
            return res.status(200).json({ errors: errors });
        }
        */

        const updatedPlatform = await Platform.findByIdAndUpdate(
            req.params.id, 
            { $set: newValue }, 
            { new: true }
        );
        if (!updatedPlatform) return res.status(200).json({ msg: "Something went wrong with updating platform" });

        res.status(200).json({ platform: updatedPlatform });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const joinPlatform = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User doesn't exist" })

        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        const index = platform.subscribers.findIndex((subscriber) => userId === subscriber.userId);

        if (index === -1) platform.subscribers.push({
            userId,
            role: 'Consumer'
        });
        await platform.save()

        user.platformInfos.push(platform._id)

        await user.save();

        res.status(200).json({ platform: platform });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const leavePlatform = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User doesn't exist" })

        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        await platform.update(
            { $pull: { subscribers: { userId: user._id } } },
            { new: true }
        )
        // platform.subscribers.pull(user._id)
        // await platform.save();

        await user.update(
            { $pull: { platforms: platform._id } },
            { new: true }
        )

        res.status(200).json({ platform: platform });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const reportPlatform = async (req, res) => {
    const { userId, text } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: "User doesn't exist" })

        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        platform.reports.push({
            userId: user._id,
            text: text
        })

        await platform.save();

        res.status(200).json({ platform: platform });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getPlatformsByFilter = async (req, res) => {
    var query = {}
    for(var key in req.query){ 
        query[key] = {
            "$regex": req.query[key], 
            "$options": "i"
        }
    }

    try {
        const platforms = await Platform.find(query);
        res.status(200).json({ platforms: platforms });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}