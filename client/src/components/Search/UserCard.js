import React, { useState } from 'react'
import { Card, Image, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import FriendUnfriend from '../Button/FriendUnfriend'

function UserCard({ user }) {
    const routeToUser = () => {
        // history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}`);
    }

    return (
        <Card style={{ marginBottom: "20px" }}>
            <Card.Body>
                <Row>
                    <Col md={3} className="my-auto" align="center" >
                        <Image style={{ width: "150px", height: "150px", cursor: 'pointer' }} onClick={routeToUser} className="bg-dark" src={user.icon ? user.icon : "/quizzit_logo.png"} thumbnail roundedCircle />
                    </Col>
                    <Col style={{}}>
                        <Row style={{ height: "20%" }}>
                            <p className="fs-4 text" style={{ cursor: 'pointer' }} onClick={routeToUser}>{user.username}</p>
                        </Row>
                        <Row style={{ height: "20%", marginTop: "10px" }}>
                            <p>
                                Member of {user.platformsJoined} platforms
                            </p>
                        </Row>
                        <Row style={{ height: "20%", marginTop: "10px" }}>
                            <p><i class="bi bi-award-fill"></i> {user.awards.length} Awards</p>
                        </Row>
                        <Row style={{ height: "20%", marginTop: "10px", marginBottom: "-5px" }}>
                            <FriendUnfriend uid={user._id}/>
                        </Row>
                    </Col >
                </Row>
            </Card.Body>
        </Card>
    )
}
export default UserCard;