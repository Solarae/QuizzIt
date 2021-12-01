import express from 'express';

import { 
    reportPlatform,getReport,getPlatformReport
} from '../controllers/report.js';

const router = express.Router();


router.get("/:id",getReport);
router.get("/getPlatformReport/:id",getPlatformReport)



router.post("/reportPlatform/:id",reportPlatform)





export default router;