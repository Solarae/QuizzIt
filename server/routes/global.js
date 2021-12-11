import express from 'express';

import { getLeaderboard, searchLeaderboard } from '../controllers/global.js'

const router = express.Router()

router.get('/:id/leaderboard', getLeaderboard)
router.get('/:id/leaderboard/search', searchLeaderboard)

export default router