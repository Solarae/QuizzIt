import Report from '../models/Report.js'
import Platform from '../models/Platform.js'


export const reportPlatform = async (req,res) =>{


    try {
        let platformId = req.params.id
        let platform = await Platform.findById(platformId)

        if(!platform) return res.status(500).json({message:"invalid platformId"})



        let {description,submittedBy} = req.body
    
    
        let report = new Report ({
            platformId: platformId,
            description: description,
            timeSubmitted: Date.now(),
            submittedBy:submittedBy,
            type: "platformReport",    
        })
    
    
        let createdReport = await report.save()
        
        return res.status(200).json({createdReport:createdReport})        



    } catch (error) {
        return res.status(500).json({message:error.message})
    }



}


export const getReport = () =>{

    return "sss"
}


export const getPlatformReport =  async (req,res) =>{


    try {
        let reports = await Report.find().populate("platformId").populate("submittedBy")
        return res.status(200).json({report:reports})  

    } catch (error) {
        
        return res.status(500).json({message:error.message})
    }

}
//find all platforms the user is a moderator of
export const getAllManagedPlatform = async (req,res) =>{
    try {
        let userId = req.params.id

        let result = []

        let platforms = await Platform.find()

        platforms.forEach(platform => {
            
            let members = platform.subscribers

            let user = members.filter((member) => member._id == userId )

            if (user[0] && user[0].role == "Moderator" || user[0].role == "Admin"){
                result.push(platform._id)
            }
        })

        console.log(data)

        return res.status(200).json({platforms:result})



    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteReport = async(req,res) =>{

    try {
        let id = req.params.id
        let report = await Report.findOneAndDelete({_id:id})

        return res.status(200).json({report:report})  


    } catch (error) {
        return res.status(500).json({message:error.message})      
    }

}