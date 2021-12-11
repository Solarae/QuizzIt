import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col, InputGroup, FormControl, OverlayTrigger, Image, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import Banner from '../components/Profile/Banner';
import PlatformCard from '../components/Home/PlatformCard'
import QuizCardMini from '../components/Cards/QuizCardMini'

import { getProfile } from '../actions/profileActions'

function Profile() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const { profile, subscribedPlatforms, likedQuizzes, awards, createdPlatforms, isGetProfileLoading } = useSelector((state) => state.profile)

    let { id } = useParams();  // get the user ID from the url

    useEffect(() => {
        dispatch(getProfile({
            id: id
        }))
    }, [id, dispatch]);

    if (isGetProfileLoading || !profile) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="justify-content-between">
            <Banner user={profile}></Banner>

            <div style={{ height: "80px" }}></div>

            <div >
                <div className="row">
                    <div className="col-9" style={{}}>
                        <Container>
                            <Row className="">
                                <Col xs lg="6">
                                    <h5><i class="bi bi-hand-thumbs-up-fill"></i> Subscribed Platforms</h5>
                                </Col>
                            </Row>

                            <Row xs={1} md={4} className="g-4 me-auto">
                                {(!subscribedPlatforms || subscribedPlatforms.length === 0) && <p>No Subscribed Platforms</p>}
                                {subscribedPlatforms && subscribedPlatforms.map((p, idx) => (

                                    <Col align="center">
                                        <PlatformCard platform={p} showSubscribe={false}></PlatformCard>
                                    </Col>
                                ))}
                            </Row>

                            <hr />

                            <Row className="">
                                <h5><i class="bi bi-hand-thumbs-up-fill"></i> Liked Quizzes</h5>
                            </Row>
                            <Row xs={1} md={4} className="g-4 me-auto">
                                {(!likedQuizzes || likedQuizzes.length === 0) && <p>No Liked Quizzes</p>}
                                {likedQuizzes && likedQuizzes.map((q, idx) => (

                                    <Col align="center">
                                        <QuizCardMini quiz={q}></QuizCardMini>
                                    </Col>
                                ))}
                            </Row>

                        </Container>

                    </div>
                    <div className="col" style={{}}>
                        <Row>
                            <Col align="center">
                                <h3>Awards</h3>
                            </Col>
                        </Row>
                        <Row xs={1} md={3} align='center' className="justify-content-center">
                            {(!awards || awards.length === 0) && <p>No Awards</p>}
                            {awards && awards.map((a, idx) => (
                                <Col align='center' style={{ marginBottom: "10px" }}>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="button-tooltip-2">{a.title}</Tooltip>}
                                    >
                                        {({ ref, ...triggerHandler }) => (
                                            <Image
                                                ref={ref}
                                                rounded
                                                style={{ width: '50px', height: '50px' }}
                                                src={a.icon}
                                                {...triggerHandler}
                                            />
                                        )}
                                    </OverlayTrigger>
                                </Col>
                            ))}
                        </Row>

                        <Row>
                            <Col align="center" >
                                <h3 >Created Platforms</h3>
                            </Col>
                        </Row>
                        <Row xs={1} md={1} align='center'>
                            {(!createdPlatforms || createdPlatforms.length === 0) && <p>No created platforms</p>}
                            {createdPlatforms && createdPlatforms.map((p, idx) => (
                                <span>
                                    <Col align='center' style={{ width: '50%', marginBottom: "10px" }}>
                                        <PlatformCard platform={p} showSubscribe={false}></PlatformCard>
                                    </Col>
                                    <div class="w-100"></div>
                                </span>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Profile
