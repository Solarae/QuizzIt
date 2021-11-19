import React, { useState, useEffect } from 'react'
import Banner from '../components/Platform/Banner.js'
import Settings from '../components/EditPlatform/Settings.js'
import AwardSection from '../components/EditPlatform/AwardSection.js'
import QuizSection from '../components/EditPlatform/QuizSection.js'
import SignIn from '../components/SignIn.js';
import SignUp from '../components/SignUp.js'
import NotFound from '../components/NotFound.js'
import { getPlatform } from '../actions/platformActions'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

function EditPlatform() {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({});
    const auth = useSelector((state) => state.auth)
    const platform = useSelector((state) => state.platforms.platform)
    const quizzesData = useSelector((state) => state.platforms.quizzesData)
    const awardsData = useSelector((state) => state.platforms.awardsData)
    const isGetLoading = useSelector((state) => state.platforms.isGetLoading);

    let { id } = useParams();  // get the platform ID from the url

    const [showSignIn, setShowSignIn] = useState(true);
    const handleCloseSignIn = () => { setShowSignIn(false) };
    const handleShowSignIn = () => { setShowSignIn(true) };

    const [showSignUp, setShowSignUp] = useState(false);
    const handleCloseSignUp = () => { setShowSignUp(false) };
    const handleShowSignUp = () => { setShowSignIn(false); setShowSignUp(true) };

    // dispatch the GET_PLATFORM request on initial render
    useEffect(() => {
        dispatch(getPlatform({
            id: id
        }))
    }, [id, dispatch]);


    if (isGetLoading || !platform) {
        return (<div>Loading...</div>)
    }

    if (auth.user == null) {
        return (
            <div className='justify-content-between'>
                <SignIn show={showSignIn} handleClose={handleCloseSignIn} />
                <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
            </div>
        )
    }

    if (auth.user !== platform.owner)
        return <NotFound />
    
    return (
        <div className="justify-content-between">
            {Object.keys(platform).length !== 0 ? <Banner platform={platform} ></Banner> : <div></div>}

            <div style={{ height: "50px" }}></div>

            <div >
                <h2 className='text-center m-3'>Platform Edit page</h2>
                <QuizSection quizzesData={quizzesData}></QuizSection>
                <hr/>
                <AwardSection awardsData={awardsData}></AwardSection>
                <hr/>
                <Settings platform={platform}></Settings>
            </div>
        </div >
    )
}
export default EditPlatform;
