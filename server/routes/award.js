import express from 'express';
import { getAward, createAward, updateAward, deleteAward } from '../controllers/award.js';

const router = express.Router();

router.get('/id', getAward);
router.post('/', createAward);
router.post('/id/edit', updateAward);
router.delete('/id', deleteAward);

export default router;