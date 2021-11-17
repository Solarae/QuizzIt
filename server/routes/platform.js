import express from 'express';
import { 
    getPlatform, createPlatform,
    deletePlatform, updatePlatform,
    joinPlatform, leavePlatform, 
    reportPlatform, 
    getPlatformsByFilter,
    getPlatformMemberlist,
    getLeaderboardByType,
    upvotePlatform,
    downvotePlatform,
} from '../controllers/platform.js';

const router = express.Router();

router.get('/:id', getPlatform);
router.get('/', getPlatformsByFilter);
router.get('/:id/getMemberList',getPlatformMemberlist)
router.get('/:id/leaderboard', getLeaderboardByType);
router.post('/', createPlatform);
router.post('/:id/delete', deletePlatform);
router.post('/:id/update', updatePlatform);
router.post('/:id/join', joinPlatform);
router.post('/:id/leave', leavePlatform);
router.post('/:id/report', reportPlatform);
router.post('/:id/upvote',upvotePlatform)
router.post('/:id/downvote',downvotePlatform)


export default router;