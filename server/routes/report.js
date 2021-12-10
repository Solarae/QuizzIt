import express from 'express';

import { 
    reportPlatform,getReport,getPlatformReport,deleteReport, getAllManagedPlatform, deleteManyPlatformReport,getQuizReport, deleteManyQuizReport
} from '../controllers/report.js';

import {checkIfModeratorOfPlatform} from "../controllers/util.js"

const router = express.Router();


router.get("/:id",getReport)





router.get("/",getPlatformReport)
router.get("/getQuizReport/:id",getQuizReport)




// router.get("/getReportForUser/:id",getAllReportForUser)




router.post("/reportPlatform/:id",reportPlatform)

router.delete("/deleteReport/:id",deleteReport)
router.post("/deleteManyPlatformReport/:id",deleteManyPlatformReport)
router.post("/deleteManyQuizReport/:id",deleteManyQuizReport)


export default router;