import express from 'express';
import { 
    createPlatform, deletePlatform, 
    joinPlatform, leavePlatform, 
    reportPlatform 
} from '../controllers/platform.js';

const router = express.Router();

router.post('/', createPlatform);
router.delete('/:id', deletePlatform);
router.post('/:id/join', joinPlatform);
router.post('/:id/leave', leavePlatform);
router.post('/:id/report', reportPlatform);

export default router;