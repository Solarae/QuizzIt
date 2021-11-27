import React, { useState } from 'react'
import { Card, Image, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

import mongoose from 'mongoose'
import moment from 'moment'

function QuizCard({ quiz }) {
    const history = useHistory()

    const routeToQuiz = () => {
        history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}`);
    }

    const routeToPlatform = () => {
        history.push(`/platform/${quiz.platformId}`);
    }

    const createdAt = mongoose.Types.ObjectId(quiz._id).getTimestamp();

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col className="my-auto" align="center" >
                        <Image style={{ width: "100%", height: "150px", cursor: 'pointer' }} onClick={routeToQuiz} className="bg-dark" src={quiz.thumbnail ? quiz.thumbnail : "/quizzit_logo.png"} thumbnail />

                        <Row>
                            <Col md={3} className="my-auto" style={{ padding: "0px"}}>
                                <Image style={{ width: "40px", height: "40px", cursor: 'pointer' }} onClick={routeToPlatform} className="bg-dark" src={quiz.platformIcon ? quiz.platformIcon : '/quizzit_logo.png'} thumbnail />
                            </Col>
                            <Col align="start" style={{ padding: "0px" }}>
                                <p className="fs-5 text" style={{ cursor: 'pointer' }} onClick={routeToQuiz}>{quiz.name}</p>
                                <p className="text-muted" style={{ cursor: "pointer", marginTop: "-10px", fontSize: "11pt" }} onClick={routeToPlatform}>{quiz.platformName}</p>
                                <p className="text-muted" style={{ marginTop: "-10px", fontSize: "9pt" }}><i class="bi bi-people-fill"></i> {quiz.submissions.length} Taken<i class="bi bi-dot" />{moment(createdAt).fromNow()}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
export default QuizCard;