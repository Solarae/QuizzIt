import Report from '../models/Report.js'
import Platform from '../models/Platform.js'


export const reportPlatform = async (req,res) =>{


    try {
        console.log("EWgewg")
        let platformId = req.params.id
        let platform = await Platform.findById(platformId)

        if(!platform) return res.status(500).json({message:"invalid platformId"})



        let {description,timeSubmitted} = req.body
    
    
        let report = new Report ({
            platformId: platformId,
            description: description,
            timeSubmitted: timeSubmitted,
            type: "platformReport"
    
        })
    
    
        let createdReport = await report.save()
    
        if (!createdReport) return 
        
        return res.status(200).json({createdReport:createdReport})        



    } catch (error) {
        return res.status(500).json({message:error.message})
    }



}


export const getReport = () =>{

}


export const getPlatformReport = () =>{

}