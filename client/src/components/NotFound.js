import React from 'react'
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

function NotFound() {
    const [showSignIn, setShowSignIn] = useState(true);
    const handleCloseSignIn = () => { setShowSignIn(false) };

    const [showSignUp, setShowSignUp] = useState(false);
    const handleCloseSignUp = () => { setShowSignUp(false) };
    const handleShowSignUp = () => { setShowSignIn(false); setShowSignUp(true) };

    return (
        <div className='justify-content-between'>
            <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} />
            <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
            <p>404 Page Not Found</p>
        </div>
    )
}

export default NotFound