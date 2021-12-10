import React, { useState, useCallback, useRef } from 'react'
import { Image, Button, Overlay, Tooltip, Toast } from 'react-bootstrap';
import { upvotePlatform, downvotePlatform } from '../../actions/platformActions'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import SignUp from '../SignUp.js';
import SignIn from '../SignIn.js';
import FriendUnfriend from '../Button/FriendUnfriend'


function Banner({ user }) {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    let location = useLocation();

    return (
        <div style={{ height: "300px" }} className="position-relative">
            <div className="h-75 position-relative overflow-hidden p-3 p-md-5 text-center bg-danger" style={{ backgroundImage: `url(${user.banner})` }}>
            </div>
            <div className="h-25 position-relative p-3 p-md-1 bg-light" style={{ overflowWrap: "break-word" }} >
                <div className="row" >
                    <div className="col-6 d-flex justify-content-start"  >
                        <Image style={{ width: "150px", height: "150px", marginTop: "-82px" }} className="position-relative ms-5 bg-dark" src={user.icon && user.icon !== "" ? user.icon : "/quizzit_logo.png"} roundedCircle />
                        <div style={{ marginLeft: "2%" }}>
                            <p className="lead fw-normal" >
                                <i class="bi bi-people-fill"></i> {user.friends.length} Friends
                            </p>
                            <p className="lead fw-normal" style={{ marginTop: "-5px" }}><i class="bi bi-award-fill"></i> {user.awards.length} Awards</p>
                        </div>
                        <div className='mt-2' style={{marginLeft:"5%"}} >
                            <p className="lead fw-normal">
                                {((!auth.user || (auth.user.id !== user._id)) && !location.pathname.endsWith("edit")) ? <FriendUnfriend uid={user._id}></FriendUnfriend> : <span></span>}
                                {(auth.user && auth.user.id === user._id && !location.pathname.endsWith("edit")) ? <Link to={`/profile/${user._id}/edit`}><Button variant="primary btn-lg" style={{ marginRight: "10px" }} >Edit Profile</Button></Link> : <span></span>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ms-5 mt-1" style={{ width: '150px', textAlign: "center" }}>
                <h4 >{user.username}</h4>
            </div>

            {/* <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} /> */}
            {/* <SignUp show={showSignUp} handleClose={handleCloseSignUp} /> */}
        </div >
    )
}
export default Banner;
