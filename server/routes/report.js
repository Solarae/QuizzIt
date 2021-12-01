import express from 'express';

import { 
    reportPlatform,getReport,getPlatformReport
} from '../controllers/report.js';

import {checkIfModeratorOfPlatform} from "../controllers/util.js"

const router = express.Router();


router.get("/:id",getReport);
router.get("/getPlatformReport/:id",getPlatformReport)
router.get("/checkIfModeratorOfPlatform/:uid/:pid",checkIfModeratorOfPlatform)



router.post("/reportPlatform/:id",reportPlatform)





export default router;