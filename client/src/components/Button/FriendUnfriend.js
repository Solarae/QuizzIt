import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { sendFriendRequest, unfriend } from '../../actions/profileActions'

import SignUp from '../SignUp.js';
import SignIn from '../SignIn.js';

function FriendUnfriend({ uid }) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)

    const [showSignIn, setShowSignIn] = useState(false);
    const handleCloseSignIn = () => { setShowSignIn(false) };
    const handleShowSignIn = () => { setShowSignIn(true) };

    const [showSignUp, setShowSignUp] = useState(false);
    const handleCloseSignUp = () => { setShowSignUp(false) };
    const handleShowSignUp = () => { setShowSignIn(false); setShowSignUp(true) };
    
    const handleFriend = () => {
        if (user === null) {
            handleShowSignIn()
            return
        }
        dispatch(sendFriendRequest(
            user.id,
            uid
        ))
    }

    const handleUnfriend = () => {
        dispatch(unfriend(
            { id: user.id, 
            userId: uid }
        ))
    }

    console.log(`UID is ${uid}`)
  
    return (
        <React.Fragment>
            {user && user.friends.some((f) => f === uid) ?
            <Button onClick={handleUnfriend} variant="secondary btn-lg" >Unfriend</Button>
            : <Button onClick={handleFriend} variant="primary btn-lg">Friend</Button>}
            
            <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} />
            <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
        </React.Fragment>
    )
}

export default FriendUnfriend