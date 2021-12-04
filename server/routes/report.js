import express from 'express';

import { 
    reportPlatform,getReport,getPlatformReport,deleteReport, getAllManagedPlatform, deleteManyPlatformReport
} from '../controllers/report.js';

import {checkIfModeratorOfPlatform} from "../controllers/util.js"

const router = express.Router();


router.get("/:id",getReport)





router.get("/",getPlatformReport)





// router.get("/getReportForUser/:id",getAllReportForUser)



router.get("/checkIfModeratorOfPlatform/:uid/:pid",checkIfModeratorOfPlatform)



router.post("/reportPlatform/:id",reportPlatform)

router.delete("/deleteReport/:id",deleteReport)
router.post("/deleteManyPlatformReport/:id",deleteManyPlatformReport)



export default router;