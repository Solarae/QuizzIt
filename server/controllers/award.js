import { uploadImgToCloud, queryBuilder, paginateQuery } from "./util.js";
import Platform from '../models/Platform.js'
import Award from '../models/Award.js'
import User from "../models/User.js";

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

        const cloud = await uploadImgToCloud(req.file.path)

        const award = new Award({
            title: title,
            description: description,
            icon: cloud.secure_url,
            icon_cloud_id: cloud.public_id,
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
    var query = queryBuilder(null, req.query, Award)
        const { q, page, pages, totalCount } = await paginateQuery(query, Award, req.query.limit, req.query.offset)

        if (page > pages) 
            return res.status(404).json({ msg: "Page doesn't exist" })
        
        const awards = await q

        res.status(200).json({ 
            awards,
            page,
            pages,
            totalCount
        });
}

export const updateAward = async (req, res) => {
    console.log("INSIDE UPDATE AWARds")
    const { userId, title, description, icon, platformId, requirementType, requirementCount } = req.body;

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

        var updatedAward
        console.log(`Req file is ${req.file}`)
        if (req.file) {
            const cloud = await uploadImgToCloud(req.file.path)
            updatedAward = await Award.findByIdAndUpdate(
                req.params.id,
                { $set: {...req.body,  icon: cloud.secure_url,
                    icon_cloud_id: cloud.public_id} },
                { new: true }
            );
        } else {
            console.log(req.body)
            updatedAward = await Award.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
        }
        
        if (!updatedAward) return res.status(404).json({ msg: "Something went wrong with updating the award" });
        console.log(updatedAward)
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



        //find list of id of user that has this award

        let ids = []

        let users = await User.find({})

        users.forEach((user)=>{
            let awards = user.awards

            let awd = awards.find((awdId)=>awdId == req.params.id)

            if(awd) ids.push(user._id)
        })

        console.log("The ids needed fix are " + ids)

        //for every user id that has the award, remove it
        ids.forEach(async (id)=>{
            await User.findByIdAndUpdate(
                id,
                { $pull: { awards: req.params.id }}
            )
        })


        const deletedAward = await Award.findByIdAndDelete(req.params.id);
        if (!deletedAward) return res.status(404).json({ msg: "Something went wrong with deleting the award" });
        res.status(200).json({ award: award })
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: error.message })
    }
}