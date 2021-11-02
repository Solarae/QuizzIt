import User from '../models/User.js'
import Platform from '../models/Platform.js'
import Award from '../models/Award.js'

export const createAward = async (req, res) => {
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
    const { newValue } = req.body
    try {
        const award = await Award.findByIdAndUpdate(
            req.params.id, 
            { $set: newValue }, 
            { new: true }
        );
        if (!award) return res.status(200).json({ msg: "Award doesn't exist" });
        res.status(200).json({ award: award });
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const deleteAward = async (req, res) => {
    const { confirmPassword } = req.body
    const errors = {}

    try {
        const award = await Award.findById(req.params.id);
        if (!award) return res.status(404).json({ msg: "Award doesn't exist" });

        const platform = await Award.findById(award.platformId);
        if (!platform) return res.status(404).json({ msg: "Platform doesn't exist" })

        const owner = await User.findById(platform.owner);

        // check if confirmPassword matches with owner's password
        const isMatch = await bcrypt.compare(confirmPassword, owner.password);
        if (!isMatch) {
            errors.invalidPassword = "Incorrect Password";
            return res.status(200).json({ errors: errors });
        }

        await award.remove()
        res.status(200).json({ award: award })
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}