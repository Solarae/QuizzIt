import express from 'express';
import upload from '../utils/multer.js'

import { getAward, getAwardsByFilter, createAward, updateAward, deleteAward } from '../controllers/award.js';

const router = express.Router();

router.get('/:id', getAward);
router.get('/', getAwardsByFilter);
router.post('/', upload.single("image"), createAward);
router.post('/:id/update', updateAward);
router.delete('/:id', deleteAward);

export default router;