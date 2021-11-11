import express from 'express';
import { getUsersByFilter, signin, tokenSignin, signup, editAccount, deleteAccount, updateUser, promoteMember, demoteMember } from '../controllers/user.js';

const router = express.Router();

router.get('/', getUsersByFilter)
router.post('/signin', signin);
router.post('/tokenSignin', tokenSignin);
router.post('/signup', signup);
router.post('/edit', editAccount);
router.post('/delete', deleteAccount);
router.post('/update', updateUser);
router.post('/promote',promoteMember)
router.post('/demote',demoteMember)

export default router;