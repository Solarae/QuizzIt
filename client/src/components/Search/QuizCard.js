import React, { useState } from 'react'
import { Card, Image, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import mongoose from 'mongoose'

function QuizCard({ quiz }) {
    const auth = useSelector((state) => state.auth)
    const history = useHistory()

    const routeToQuiz = () => {
        history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}`);
    }

    const routeToPlatform = () => {
        history.push(`/platform/${quiz.platformId}`);
    }

    const createdAt = mongoose.Types.ObjectId(quiz._id).getTimestamp();

    return (
        <Card style={{ marginBottom: "20px" }}>
            <Card.Body>
                <Row>
                    <Col md={3} className="my-auto" align="center" >
                        <Image style={{ width: "150px", height: "150px", cursor: 'pointer' }} onClick={routeToQuiz} className="bg-dark" src={quiz.thumbnail ? quiz.thumbnail: "/quizzit_logo.png"} thumbnail />
                    </Col>
                    <Col style={{}}>
                        <Row style={{ height: "20%" }}>
                            <p className="fs-4 text" style={{ cursor: 'pointer' }} onClick={routeToQuiz}>{quiz.name}</p>
                        </Row>
                        <Row style={{ height: "20%" }}>
                            <p>{quiz.submissions.length} submissions<i class="bi bi-dot" />{moment(createdAt).fromNow()}</p>
                        </Row>
                        <Row style={{ height: "20%" }} >
                            <Col>
                                <Image style={{ width: "40px", height: "40px", marginRight: "5px", cursor: 'pointer' }} onClick={routeToPlatform} className="bg-dark" src={quiz.platformIcon ? quiz.platformIcon : '/quizzit_logo.png'} thumbnail />
                                <span style={{ cursor: "pointer" }} onClick={routeToPlatform}>{quiz.platformName}</span>
                            </Col>
                        </Row>
                        <Row style={{ height: "20%", marginTop: "10px", marginBottom: "-5px" }}>
                            <p>{quiz.description}</p>
                        </Row>
                        <Row style={{ height: "20%" }}>
                            <p>
                                <i className="bi bi-hand-thumbs-up"></i> {quiz.likes && quiz.likes.totalLikes ? quiz.likes.totalLikes : 0}
                                <i className="bi bi-hand-thumbs-down" style={{ marginLeft: "10px" }}></i> {quiz.likes && quiz.likes.totalDislikes ? quiz.likes.totalDislikes : 0}
                            </p>
                        </Row>

                    </Col >
                </Row>
            </Card.Body>
        </Card>
    )
}
export default QuizCard;