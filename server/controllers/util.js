import cloudinary from "../utils/cloudinary.js";
import Platform from '../models/Platform.js'

export const uploadImgToCloud = async (img) =>{
    try {
        const res = await cloudinary.uploader.upload(img, {
            upload_preset: 'dev_setups',
        });
        return res
    } catch (err) {
        console.error(err);
    }
}

export const queryBuilder = (q, queries, model) => {
    var query = {}
    var operations = []

    for (var key in queries) {
        if (key === 'expand') {
            var r = /,\s*(?![^()]*\))/gm
            var regex = /^([^()]+)(\(([^)]+)=([^)]+)\))?$/
            const populates = queries[key].split(r)
            for (var p in populates) {
                const m = regex.exec(populates[p])
                operations.push({
                    operation: 'populate',
                    path: m[1],
                    path_select: m[4] ? m[4].replace(/,/g, ' ') : null
                })
            }
        } else if (key === 'select') {
            operations.push({
                operation: 'select',
                fields: queries[key].replace(/,/g, ' ')
            })
        } else if (key === 'sort') {
            var sort = {}
            const sortFields = queries[key].split(',')
            for (var v in sortFields) {
                const [sortBy, orderBy] = sortFields[v].split(' ')
                if (orderBy) {
                    sort[sortBy] = orderBy === 'asc' ? 1 : -1
                } else {
                    sort[sortBy] = 1
                }
            }
            operations.push({
                operation: 'sort',
                sort: sort
            })
        } else if (key === 'limit' || key === 'offset') {
            break
        } else if (key === 'name') {
            query[key] = {
                "$regex": queries[key], 
                "$options": "i"
            }
        } else {
            query[key] = queries[key]
        }
    }
   
    q = q ? q : model.find(query)
    for (var o in operations) {
        const op = operations[o]
        if (op.operation === 'populate') {
            q = q.populate(op.path, op.path_select)
        } else if (op.operation === 'select') {
            q = q.select(op.fields)
        } else if (op.operation === 'sort') {
            q = q.sort(op.sort)
        }     
    }
    
    return q
}

export const paginateQuery = async (q, model, limit, offset) => {
    const pageSize = parseInt(limit) || 10
    const skip = parseInt(offset) || 0
    const page = skip / pageSize
    const totalCount = await model.countDocuments(q)
    console.log(totalCount)
    const pages = Math.ceil(totalCount / pageSize)
    console.log(pages)
    q = q.limit(pageSize).skip(skip)

    return { q, page, pages, totalCount }
}


export const checkIfModeratorOfPlatform = async (req,res) =>{


    try {
        let userId = req.params.uid
        let platformId = req.params.pid
    
    
        let platform = await Platform.findById(platformId)
        if (!platform) return res.status(200).json({message:"Platform does not exist"}) 


        let members = platform.subscribers

        let user = members.filter( member => member.userId == userId )

        console.log(user)

        if(user[0] && user[0].role == "Moderator" ){
            return res.status(200).json({user:user[0]})
        }

        return res.status(200).json({message:"User is not moderator"})
    

    } catch (error) {
        return res.status(500).json({message:error.message})       
    }




}