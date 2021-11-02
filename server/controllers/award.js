import User from '../models/User.js'
import Platform from '../models/Platform.js'
import Award from '../models/Award.js'

export const createAward = async (req, res) => {
    const errors = {}

    try {
        const platform = await Platform.findById(req.body.platformId);
        if (!platform) {
            errors.invalidPlatform = `No user with id: ${userId}`;
            return res.status(404).json({ errors: errors});
        }
    
        const award = new Award(req.body);
        const createdAward = await award.save();

        if (!createdAward) return res.status(404).json({ msg: "Something went wrong with creating the platform" });

        res.status(200).json({ award: createdAward })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getAward = async (req, res) => {
    try {
        const award = await Award.findById(req.params.id);
        if (!award) return res.status(200).json({ msg: "Award doesn't exist" });
        res.status(200).json({ award: award });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getAwardsByPlatformId = async (req, res) => {
    const { platformId } = req.query;
    try {
        const awards = await Award.find({ platformId: platformId });
        res.status(200).json({ awards: awards });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const updateAward = async (req, res) => {
    const { newValue, ownerId } = req.body
    const errors = {}
    try {
        const award = await Award.findById(req.params.id);
        if (!award) return res.status(200).json({ msg: "Award doesn't exist" });

        const platform = await Platform.findById(award.platformId);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        // check if user has update permissions
        if (ownerId === platform.owner) {
            errors.invalidOwner = "You don't have update permissions";
            return res.status(200).json({ errors: errors });
        }

        const updatedAward = await Award.findByIdAndUpdate(
            req.params.id, 
            { $set: newValue }, 
            { new: true }
        );
        if (!updatedAward) return res.status(404).json({ msg: "Something went wrong with updating the award" });
        res.status(200).json({ award: updatedAward });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const deleteAward = async (req, res) => {
    const { ownerId } = req.body
    const errors = {}

    try {
        const award = await Award.findById(req.params.id);
        if (!award) return res.status(404).json({ msg: "Award doesn't exist" });

        const platform = await Award.findById(award.platformId);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        // check if user has update permissions
        if (ownerId === platform.owner) {
            errors.invalidOwner = "You don't have update permissions";
            return res.status(200).json({ errors: errors });
        }

        const deletedAward = Award.findByIdAndDelete(req.params.id);
        if (!deletedAward) return res.status(404).json({ msg: "Something went wrong with deleting the award" });
        res.status(200).json({ award: award })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}