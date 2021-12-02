import React, { useState } from 'react'
import { Card, Image, Row, Col } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom'

import mongoose from 'mongoose'
import moment from 'moment'

function QuizCardMini({ quiz }) {
    const history = useHistory()
    let location = useLocation()

    const routeToQuiz = () => {
        history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}`);
    }

    const routeToQuizEdit = () => {
        history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}/edit`);
    }

    const routeToPlatform = () => {
        history.push(`/platform/${quiz.platformId}`);
    }

    const createdAt = mongoose.Types.ObjectId(quiz._id).getTimestamp();
    const isEdit = location.pathname.endsWith("edit")
    const isHome = location.pathname.endsWith("/")

    return (
        <Card>
            <Card.Body style={{ cursor: isEdit ? "pointer" : ""}} onClick={isEdit ? routeToQuizEdit : ()=>{}}>
                <Row>
                    <Col className="my-auto" align="center" >
                        {isEdit && (<i className="bi bi-pencil-square position-absolute top-0 start-100 translate-middle" style={{ fontSize: "1.3rem" }}></i>)}
                        <Image style={{ width: "100%", height: "150px", cursor: 'pointer' }} onClick={routeToQuiz} className="bg-dark" src={quiz.thumbnail ? quiz.thumbnail : "/quizzit_logo.png"} thumbnail />

                        <Row>
                            {
                                isHome &&
                                <Col md={3} className="my-auto" style={{ padding: "0px" }}>
                                    <Image style={{ width: "40px", height: "40px", cursor: 'pointer' }} onClick={routeToPlatform} className="bg-dark" src={quiz.platformIcon ? quiz.platformIcon : '/quizzit_logo.png'} thumbnail />
                                </Col>
                                
                            }
                            <Col align="start" style={{ padding: isHome ? "0px" : "" }}>
                                <p className="fs-5 text" style={{ cursor: 'pointer' }} onClick={routeToQuiz}>{quiz.name}</p>
                                {isHome && <p className="text-muted" style={{ cursor: "pointer", marginTop: "-10px", fontSize: "11pt" }} onClick={routeToPlatform}>{quiz.platformName}</p>}
                                <p className="text-muted" style={{ marginTop: "-10px", fontSize: "9pt" }}><i class="bi bi-people-fill"></i> {quiz.submissions.length} Taken<i class="bi bi-dot" />{moment(createdAt).fromNow()}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
export default QuizCardMini;