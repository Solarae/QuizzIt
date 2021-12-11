import express from 'express';

import { getLeaderboard, searchLeaderboard } from '../controllers/global.js'

const router = express.Router()

router.get('/leaderboard', getLeaderboard)
router.get('/leaderboard/search', searchLeaderboard)

export default router