import express from 'express';
import { 
    createPlatform, deletePlatform, 
    joinPlatform, leavePlatform, 
    reportPlatform 
} from '../controllers/platform.js';

const router = express.Router();

router.post('/', createPlatform);
router.delete('/:id', deletePlatform);
router.post('/join', joinPlatform);
router.post('/leave', leavePlatform);
router.post('/report', reportPlatform);

export default router;