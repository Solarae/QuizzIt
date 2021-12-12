import React, { useState, useCallback, useRef } from 'react'
import { Image, Button, Overlay, Tooltip, Toast, Row, Col } from 'react-bootstrap';
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
            <Row className="p-3 p-md-1 bg-white" >
                <Col className="justify-content-center"  >
                    <Row className="justify-content-center" >
                        <Image style={{ width: "10vw", height: "10vw", border:'solid', padding:'0' }} className="bg-dark" src={user.icon && user.icon !== "" ? user.icon : "/quizzit_logo.png"} roundedCircle fluid />
                    </Row>
                    <Row align="center">
                        <h4 >{user.username}</h4>
                    </Row>

                    {((!auth.user || (auth.user.id !== user._id)) && !location.pathname.endsWith("edit")) ?
                        <Row align="center" style={{ marginBottom: '25px' }}>
                            <Col>
                                <FriendUnfriend uid={user._id}></FriendUnfriend>
                            </Col>
                        </Row>
                        : <span></span>
                    }

                    {(auth.user && auth.user.id === user._id && !location.pathname.endsWith("edit")) ?
                        <Row align="center" style={{ marginBottom: '25px' }}>
                            <Col>
                                <Link to={`/profile/${user._id}/edit`}>
                                    <Button><i class="bi bi-gear-fill"></i> Settings</Button>
                                </Link>
                            </Col>
                        </Row>
                        : <span></span>
                    }

                </Col>
            </Row>

            <Row align="center" className="justify-content-center bg-light" style={{ paddingTop: "20px", borderBottomStyle: "solid", borderBottomColor: "#949494" }} >
                <Col>
                    <p className="lead fw-normal" >
                        <i class="bi bi-people-fill"></i> {user.friends.length} Friends
                    </p>
                </Col>
                <Col>
                    <p className="lead fw-normal" ><i class="bi bi-award-fill"></i> {user.awards.length} Awards</p>
                </Col>
                <Col>
                    <p className="lead fw-normal" ><i class="bi bi-book-fill"></i> {user.platformsJoined} Platforms Joined</p>
                </Col>
            </Row>

            {/* <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} /> */}
            {/* <SignUp show={showSignUp} handleClose={handleCloseSignUp} /> */}
        </div >
    )
}
export default Banner;
