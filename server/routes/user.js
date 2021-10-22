import express from 'express';
import { editAccount, signin, signup } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/edit', editAccount);

export default router;