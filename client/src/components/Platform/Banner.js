import React, { useState, useCallback, useRef } from 'react'
import { Image, Button, Overlay, Tooltip } from 'react-bootstrap';
import { joinPlatform, leavePlatform, upvotePlatform, downvotePlatform } from '../../actions/platformActions'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import SignUp from '../SignUp.js';
import SignIn from '../SignIn.js';
import Report from './Report.js'
import LikeDislike from '../Button/LikeDislike';
import Subscribe from '../Button/Subscribe';

function Banner({ platform }) {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    const [showSignIn, setShowSignIn] = useState(false);
    const handleCloseSignIn = () => { setShowSignIn(false) };
    const handleShowSignIn = () => { setShowSignIn(true) };

    const [showSignUp, setShowSignUp] = useState(false);
    const handleCloseSignUp = () => { setShowSignUp(false) };
    const handleShowSignUp = () => { setShowSignIn(false); setShowSignUp(true) };

    const handleJoin = () => {
        if (auth.user === null) {
            handleShowSignIn()
            return 
        }
        dispatch(joinPlatform({
            userId: auth.user.id,
            platformId: platform._id
        }))
    }

    const handleLeave = () => {
        dispatch(leavePlatform({
            userId: auth.user.id,
            platformId: platform._id
        }))
    }

    const handleLike = () => {
        if (auth.user === null) {
            handleShowSignIn()
            return 
        }
        dispatch(upvotePlatform({
            userId:auth.user.id,
            platformId: platform._id
        }))        


        // dispatch(updateUser({
        //     newValue: { likes: likes },
        //     userId: auth.user.id
        // }))

    }

    const handleDislike = () => {
        if (auth.user === null) {
            handleShowSignIn()
            return 
        }
        dispatch(downvotePlatform({
            userId:auth.user.id,
            platformId: platform._id
        }))      

        // dispatch(updateUser({
        //     newValue: { likes: likes },
        //     userId: auth.user.id
        // }))

    }

    const [showReport, setShowReport] = useState(false);
    const handleCloseReport = useCallback(() => { setShowReport(false) }, []);
    const handleShowReport = () => { 
        if (auth.user === null) {
            handleShowSignIn()
            return 
        }
        setShowReport(true) 
    };

    // used to show tooltip after clicking "share" button
    const [showTooltip, setShowTooltip] = useState(false);
    const targetTooltip = useRef(null);

    return (
        <div style={{ height: "300px" }} className="position-relative">
            <div className="h-75 position-relative overflow-hidden p-3 p-md-5 text-center bg-danger" style={{ backgroundImage: `url(${platform.banner})` }}>
            </div>
            <div className="h-25 position-relative p-3 p-md-1 bg-light" style={{ overflowWrap: "break-word" }} >
                <div className="row">
                    <div className="col-6 d-flex justify-content-start" >
                        <Image style={{ width: "150px", height: "150px", marginTop: "-82px" }} className="position-relative ms-5 bg-dark" src={platform.icon && platform.icon !== "" ? platform.icon : "/quizzit_logo.png"} thumbnail />
                        <div style={{ marginLeft: "2%" }}>
                            <p className="lead fw-normal" style={{ marginBottom: "10px" }}>
                                <i class="bi bi-people-fill"></i> {platform.subscribers.length} Subscribers
                                <LikeDislike handleLike={handleLike} handleDislike={handleDislike} likedKey='likedPlatforms' dislikedKey="dislikedPlatforms" object={platform}> </LikeDislike>
                            </p>
                            <p className="lead fw-normal">
                                {platform.description}
                            </p>
                        </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end" >
                        <div className="mt-2 justify-content-center" style={{ marginRight: "3%" }}>
                            <div className="position-relative" >
                                <p className="lead fw-normal justify-content-between">
                                    <Link to={`/platform/${platform._id}/edit`}><Button variant="primary btn-lg" >Edit</Button></Link>
                                    <Subscribe handleLeave={handleLeave} handleJoin={handleJoin} platform={platform}/>
                                    <CopyToClipboard text={window.location.href}>
                                        <i className="bi bi-share"
                                            ref={targetTooltip}
                                            onMouseLeave={() => setShowTooltip(false)}
                                            onClick={() => setShowTooltip(true)}
                                            style={{ marginLeft: "25px", cursor: "pointer" }}></i>
                                    </CopyToClipboard>
                                    <Overlay target={targetTooltip.current} show={showTooltip} placement="top">
                                        {(props) => (
                                            <Tooltip id="overlay-example" {...props}>
                                                Link copied
                                            </Tooltip>
                                        )}
                                    </Overlay>
                                    <i className="bi bi-flag-fill" style={{ marginLeft: "20px", cursor: "pointer" }} onClick={handleShowReport}></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h4 className="ms-5 mt-1">{platform.name}</h4>
            </div>

            <Report platformId={platform._id} show={showReport} handleClose={handleCloseReport}></Report>
            <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} />
            <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
        </div >
    )
}
export default Banner;
