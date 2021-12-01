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

    
}


export const getPlatformReport = async (req,res) =>{

    try {
        let id = req.params.id

        let reports = await Report.find({platformId:id})
    
        return res.status(200).json({report:reports})  

    } catch (error) {
        
        return res.status(500).json({message:error.message})
    }

}