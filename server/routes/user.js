import express from 'express';
import { getUsersByFilter, getInbox, signin, tokenSignin, signup, editAccount, deleteAccount, updateUser } from '../controllers/user.js';

const router = express.Router();

router.get('/', getUsersByFilter)
router.get('/:id/inbox', getInbox)
router.post('/signin', signin);
router.post('/tokenSignin', tokenSignin);
router.post('/signup', signup);
router.post('/edit', editAccount);
router.post('/delete', deleteAccount);
router.post('/update', updateUser);

export default router;