import express from 'express';
import { 
    getPlatform, createPlatform,
    deletePlatform, updatePlatform,
    joinPlatform, leavePlatform, 
    reportPlatform, 
    getPlatformsByFilter,
    getPlatformMemberlist
} from '../controllers/platform.js';

const router = express.Router();

router.get('/:id', getPlatform);
router.get('/', getPlatformsByFilter);
router.get('/getMemberList/:id',getPlatformMemberlist)
router.post('/', createPlatform);
router.post('/:id/delete', deletePlatform);
router.post('/:id/update', updatePlatform);
router.post('/:id/join', joinPlatform);
router.post('/:id/leave', leavePlatform);
router.post('/:id/report', reportPlatform);

export default router;