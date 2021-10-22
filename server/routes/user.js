import express from 'express';
import { editAccount, signin, signup } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/:id', editAccount);

export default router;