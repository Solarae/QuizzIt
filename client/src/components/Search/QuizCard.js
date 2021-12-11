import React from 'react'
import { Card, Image, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import mongoose from 'mongoose'

function QuizCard({ quiz }) {
    const history = useHistory()

    const routeToQuiz = () => {
        history.push(`/platform/${quiz.platformId._id}/quiz/${quiz._id}`);
    }

    const routeToPlatform = () => {
        history.push(`/platform/${quiz.platformId._id}`);
    }

    const createdAt = mongoose.Types.ObjectId(quiz._id).getTimestamp();

    return (
        <Card style={{ marginBottom: "20px" }}>
            <Card.Body>
                <Row>
                    <Col md={3} className="my-auto" align="center" >
                        <Image style={{ width: "150px", height: "150px", cursor: 'pointer' }} onClick={routeToQuiz} className="bg-dark" src={quiz.thumbnail ? quiz.thumbnail : "/quizzit_logo.png"} thumbnail />
                        <p className="fs-6 text-muted" style={{marginBottom:"-10px"}}><i class="bi bi-stopwatch"></i> {quiz.time} min</p>
                    </Col>
                    <Col style={{}}>
                        <Row style={{ height: "25%" }}>
                            <p className="fs-4 text" style={{ cursor: 'pointer' }} onClick={routeToQuiz}>{quiz.name}</p>
                        </Row>
                        <Row style={{ height: "25%" }}>
                            <p><i class="bi bi-people-fill"></i> {quiz.submissionsCount} Taken
                                <i class="bi bi-dot" />
                                {moment(createdAt).fromNow()}
                                <i class="bi bi-dot" />
                                <i className="bi bi-hand-thumbs-up"></i> {quiz.likes && quiz.likes.totalLikes ? quiz.likes.totalLikes : 0}
                                <i className="bi bi-hand-thumbs-down" style={{ marginLeft: "10px" }}></i> {quiz.likes && quiz.likes.totalDislikes ? quiz.likes.totalDislikes : 0}
                            </p>
                        </Row>
                        <Row style={{ height: "25%" }} >
                            <Col>
                                <Image style={{ width: "40px", height: "40px", marginRight: "5px", cursor: 'pointer' }} onClick={routeToPlatform} className="bg-dark" src={quiz.platformId.icon ? quiz.platformId.icon : '/quizzit_logo.png'} thumbnail />
                                <span style={{ cursor: "pointer" }} onClick={routeToPlatform}>{quiz.platformId.name}</span>
                            </Col>
                        </Row>
                        <Row style={{ height: "25%", marginTop: "10px", marginBottom: "-5px" }}>
                            <p>{quiz.description}</p>
                        </Row>
                    </Col >
                </Row>
            </Card.Body>
        </Card>
    )
}
export default QuizCard;