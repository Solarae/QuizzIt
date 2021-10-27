import express from 'express';
import { createPlatform, deletePlatform } from '../controllers/platform.js';

const router = express.Router();

router.post('/', createPlatform);
router.delete('/:id', deletePlatform);

export default router;