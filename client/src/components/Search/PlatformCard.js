import React, { useState } from 'react'
import { Card, Image, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Subscribe from '../Button/Subscribe'
import SignIn from '../SignIn';
import SignUp from '../SignUp';

function PlatformCard({ platform }) {
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const [showSignIn, setShowSignIn] = useState(false);
    const handleCloseSignIn = () => { setShowSignIn(false) };
    const handleShowSignIn = () => { setShowSignIn(true) };

    const [showSignUp, setShowSignUp] = useState(false);
    const handleCloseSignUp = () => { setShowSignUp(false) };
    const handleShowSignUp = () => { setShowSignIn(false); setShowSignUp(true) };

    const routeToPlatform = () => {
        history.push(`/platform/${platform._id}`);
    }

    // keep track of subscrbed status on frontend
    console.log(platform)
    // const [subscribed, setSubscribed] = useState(platform.subscribers.some((s) => s.userId===user.id));

    return (
        <Card style={{ marginBottom: "20px" }}>
            <Card.Body>
                <Row>
                    <Col md={3} className="my-auto" align="center" style={{ cursor: "pointer" }}>
                        <Image style={{ width: "150px", height: "150px" }} className="bg-dark" src={platform.icon ? platform.icon : '/quizzit_logo.png'} thumbnail />
                    </Col>
                    <Col md={6}>
                        <Row style={{ height: "33%" }}>
                            <p className="fs-4 text" onClick={routeToPlatform} style={{ cursor: "pointer" }}>{platform.name}</p>
                        </Row>
                        <Row style={{ height: "33%" }}>
                            <p><i class="bi bi-people-fill"></i> {platform.subscribers.length} Subscribers<i class="bi bi-dot" />{platform.quizCount} Quizzes</p>
                        </Row>
                        <Row style={{ height: "33%" }}>
                            <p>{platform.description}</p>
                        </Row>

                    </Col >
                    <Col md={3} align="center" className="my-auto" style={{}}>
                        <Subscribe platform={platform}/>
                    </Col>
                </Row>
            </Card.Body>
            <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} />
            <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
        </Card>
    )
}
export default PlatformCard;