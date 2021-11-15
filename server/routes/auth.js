import express from 'express';
import { getSignedIn, signin, signout, signup } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/signout', signout)
router.get('/signedIn', getSignedIn)

export default router