import express from 'express';
import { getUsersByFilter, signin, signup, editAccount, deleteAccount, updateUser } from '../controllers/user.js';

const router = express.Router();

router.get('/', getUsersByFilter)
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/edit', editAccount);
router.post('/delete', deleteAccount);
router.post('/update', updateUser);

export default router;