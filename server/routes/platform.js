import express from 'express';
import upload from '../utils/multer.js'

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
    uploadImage,
    editMemberRole,
    searchLeaderboard
} from '../controllers/platform.js';

const router = express.Router();

router.get('/:id', getPlatform);
router.get('/', getPlatformsByFilter);
router.get('/:id/memberList', getPlatformMemberlist)
router.get('/:id/leaderboard', getLeaderboardByType);
router.get('/:id/leaderboard/search', searchLeaderboard);
router.post('/', createPlatform);
router.post('/:id/delete', deletePlatform);
router.post('/:id/update', updatePlatform);
router.post('/:id/upload', upload.single("image"), uploadImage)
router.post('/:id/join', joinPlatform);
router.post('/:id/leave', leavePlatform);
router.post('/:id/report', reportPlatform);
router.post('/:id/upvote',upvotePlatform)
router.post('/:id/downvote',downvotePlatform)
router.post('/:id/editRole', editMemberRole)


export default router;