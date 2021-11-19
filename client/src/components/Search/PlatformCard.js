import React, { useState } from 'react'
import { Card, Image, Row, Col } from 'react-bootstrap';
import { joinPlatform, leavePlatform, upvotePlatform, downvotePlatform } from '../../actions/platformActions'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import LikeDislike from '../Button/LikeDislike';
import Subscribe from '../Button/Subscribe'

function PlatformCard({ platform }) {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()

    const routeToPlatform = () => {
        history.push(`/platform/${platform._id}`);
    }

    const handleJoin = () => {
        dispatch(joinPlatform({
            userId: auth.user.id,
            platformId: platform._id
        }))
        // setSubscribed(true);
    }

    const handleLeave = () => {
        dispatch(leavePlatform({
            userId: auth.user.id,
            platformId: platform._id
        }))
        // setSubscribed(false);
    }

    const handleLike = () => {
        // if (auth.user === null) {
        //     handleShowSignIn()
        //     return 
        // }
        dispatch(upvotePlatform({
            userId:auth.user.id,
            platformId: platform._id
        }))        
    }

    const handleDislike = () => {
        // if (auth.user === null) {
        //     handleShowSignIn()
        //     return 
        // }
        dispatch(downvotePlatform({
            userId:auth.user.id,
            platformId: platform._id
        }))      
    }

    // keep track of subscrbed status on frontend
    console.log(platform)
    // const [subscribed, setSubscribed] = useState(platform.subscribers.some((s) => s.userId===auth.user.id));

    return (
        <Card style={{ marginBottom: "20px" }}>
            <Card.Body>
                <Row>
                    <Col onClick={routeToPlatform} md={3} className="my-auto" align="center" style={{ cursor: "pointer" }}>
                        <Image style={{ width: "150px", height: "150px" }} className="bg-dark" src={platform.icon ? platform.icon : '/quizzit_logo.png'} thumbnail />
                    </Col>
                    <Col onClick={routeToPlatform} md={6} style={{ cursor: "pointer" }}>
                        <Row style={{ height: "25%" }}>
                            <p className="fs-4 text">{platform.name}</p>
                        </Row>
                        <Row style={{ height: "25%" }}>
                            <p><i class="bi bi-people-fill"></i> {platform.subscribers.length} Subscribers<i class="bi bi-dot" />{platform.quizzes.length} Quizzes</p>
                        </Row>
                        <Row style={{ height: "25%" }}>
                            <p>{platform.description}</p>
                        </Row>
                        <Row style={{ height: "25%" }}>
                        <LikeDislike handleLike={handleLike} handleDislike={handleDislike} likedKey='likedPlatforms' dislikedKey="dislikedPlatforms" object={platform}> </LikeDislike>
                        </Row>

                    </Col >
                    <Col md={3} align="center" className="my-auto" style={{}}>
                        <Subscribe handleLeave={handleLeave} handleJoin={handleJoin}/>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
export default PlatformCard;