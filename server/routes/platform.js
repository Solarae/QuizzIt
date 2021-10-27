import express from 'express';
import {  } from '../controllers/platform.js';

const router = express.Router();

router.post('/', createPlatform);
router.delete('/:id', deletePlatform);

export default router;