import express from 'express';
import { signin, signup, editAccount, deleteAccount } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/edit', editAccount);
router.post('/delete', deleteAccount);

export default router;