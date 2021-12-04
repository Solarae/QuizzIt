import express from 'express';
import { getUsersByFilter, getInbox, signin, tokenSignin, signup, editAccount, deleteAccount, updateUser, readNotification, getFriendRequests, sendFriendRequest, acceptFriendRequest, declineFriendRequest, getFriends, unfriend } from '../controllers/user.js';

const router = express.Router();

router.get('/', getUsersByFilter)
router.get('/:id/inbox', getInbox)
router.post('/:id/inbox/notification/:nid/read', readNotification)
router.get('/:id/friendRequests', getFriendRequests)
router.post('/:id/friendRequests/:uid/send', sendFriendRequest)
router.post('/:id/friendRequests/:uid/accept', acceptFriendRequest)
router.post('/:id/friendRequests/:uid/decline', declineFriendRequest)
router.get('/:id/friends', getFriends)
router.post('/:id/friends/:uid/unfriend', unfriend)
router.post('/signin', signin);
router.post('/tokenSignin', tokenSignin);
router.post('/signup', signup);
router.post('/edit', editAccount);
router.post('/delete', deleteAccount);
router.post('/update', updateUser);

export default router;