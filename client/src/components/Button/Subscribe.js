import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { joinPlatform, leavePlatform } from '../../actions/platformActions'

import SignUp from '../SignUp.js';
import SignIn from '../SignIn.js';

function Subscribe({ platform, size, style }) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)

    const [showSignIn, setShowSignIn] = useState(false);
    const handleCloseSignIn = () => { setShowSignIn(false) };
    const handleShowSignIn = () => { setShowSignIn(true) };

    const [showSignUp, setShowSignUp] = useState(false);
    const handleCloseSignUp = () => { setShowSignUp(false) };
    const handleShowSignUp = () => { setShowSignIn(false); setShowSignUp(true) };
    
    const handleJoin = () => {
        if (user === null) {
            handleShowSignIn()
            return
        }
        dispatch(joinPlatform({
            userId: user.id,
            platformId: platform._id
        }))
    }

    const handleLeave = () => {
        dispatch(leavePlatform({
            userId: user.id,
            platformId: platform._id
        }))
    }
  
    return (
        <React.Fragment>
            {user && platform.subscribers.some((s) => s.userId === user.id) ?
            <Button size={size} disabled={user.id===platform.owner} onClick={handleLeave} variant="secondary btn-lg" style={{ ...style }}>{user.id===platform.owner ? "Owner" : "Unsubscribe"}</Button>
            : <Button size={size} onClick={handleJoin} variant="primary btn-lg" style={{ ...style }}>Subscribe</Button>}
            
            <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} />
            <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
        </React.Fragment>
    )
}

export default Subscribe