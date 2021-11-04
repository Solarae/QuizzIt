import User from '../models/User.js'
import Platform from '../models/Platform.js'
import Award from '../models/Award.js'

export const createAward = async (req, res) => {
    const { userId, title, description, icon, platformId, requirementType, requirementCount } = req.body;
    const errors = {}

    try {
        const platform = await Platform.findById(platformId);
        if (!platform) {
            errors.invalidPlatform = `No platform with id: ${platform._id}`;
            return res.status(404).json({ errors: errors });
        }

        if (userId !== String(platform.owner)) {
            errors.invalidOwner = "You don't have create permissions";
            return res.status(200).json({ errors: errors });
        }

        const award = new Award({
            title: title,
            description: description,
            icon: icon,
            platformId: platformId,
            requirementType: requirementType,
            requirementCount: requirementCount
        });
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

export const getAwardsByFilter = async (req, res) => {
    var query = {}
    for (var key in req.query) {
        query[key] = req.query[key];
    }

    try {
        const awards = await Award.find(query);
        res.status(200).json({ awards: awards });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const updateAward = async (req, res) => {
    const { newValue, userId } = req.body
    const errors = {}
    try {
        const award = await Award.findById(req.params.id);
        if (!award) return res.status(200).json({ msg: "Award doesn't exist" });

        const platform = await Platform.findById(award.platformId);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        // check if user has update permissions
        if (userId !== String(platform.owner)) {
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
    const { userId } = req.body
    const errors = {}

    try {
        const award = await Award.findById(req.params.id);
        if (!award) return res.status(404).json({ msg: "Award doesn't exist" });

        const platform = await Platform.findById(award.platformId);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        // check if user has update permissions
        if (userId !== String(platform.owner)) {
            errors.invalidOwner = "You don't have update permissions";
            return res.status(200).json({ errors: errors });
        }

        const deletedAward = await Award.findByIdAndDelete(req.params.id);
        if (!deletedAward) return res.status(404).json({ msg: "Something went wrong with deleting the award" });
        res.status(200).json({ award: award })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}