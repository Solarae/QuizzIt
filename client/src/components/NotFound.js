import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

function NotFound() {
    const user = useSelector((state) => state.auth.user)

    const [showSignIn, setShowSignIn] = useState(true);
    const handleCloseSignIn = () => { setShowSignIn(false) };

    const [showSignUp, setShowSignUp] = useState(false);
    const handleCloseSignUp = () => { setShowSignUp(false) };
    const handleShowSignUp = () => { setShowSignIn(false); setShowSignUp(true) };

    return (
        <div className='justify-content-between'>
            { user.auth ? null :
                <React.Fragment>
                <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} />
                <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
                </React.Fragment>
            }
            <p>404 Page Not Found</p>
        </div>
    )
}

export default NotFound