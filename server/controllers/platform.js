import User from '../models/User.js'
import Platform from '../models/Platform.js'
import mongoose from 'mongoose'

export const createPlatform = async (req, res) => {
    const { userId, name, description } = req.body;
    const errors = {};

    try {
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
            subscribers: [userId]
        });
        const createdPlatform = await newPlatform.save();

        if (!createdPlatform) return res.status(404).json({ msg: "Something went wrong with creating the platform" });

        user.platformInfos.push({
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

        await user.save();

        res.status(200).json({ platform: createdPlatform })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const deletePlatform = async (req, res) => {
    try {
        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })
        await platform.remove();

        const count = await User.updateMany(
            { _id: { $in: platform.subscribers } },
            { $pull: { platformInfos: { platformId: platform._id } } }
        )
        console.log(count)
        res.status(200).json({ platform: platform })
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

        const index = platform.subscribers.findIndex((id) => userId === id);

        if (index === -1) platform.subscribers.push(userId);
        await platform.save()

        user.platformInfos.push({
            platformId: platform._id,
            points: {
                daily: 0,
                weekly: 0,
                monthly: 0,
                biannual: 0,
                yearly: 0,
                allTime: 0
            },
            role: 'Consumer'
        })

        await user.save();

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

        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        platform.subscribers.pull(user._id)
        await platform.save();


        await user.update(
            { $pull: { platformInfos: { platformId: platform._id } } },
            { new: true }
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

        const platform = await Platform.findById(req.params.id);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        platform.reports.push({
            userId: user._id,
            text: text
        })

        await platform.save();

        res.status(200).json(platform);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}