import express from 'express';
import { 
    getPlatform, createPlatform, 
    deletePlatform, joinPlatform, 
    leavePlatform, reportPlatform 
} from '../controllers/platform.js';

const router = express.Router();

router.get('/:id', getPlatform);
router.post('/', createPlatform);
router.post('/:id/delete', deletePlatform);
router.post('/:id/join', joinPlatform);
router.post('/:id/leave', leavePlatform);
router.post('/:id/report', reportPlatform);

export default router;