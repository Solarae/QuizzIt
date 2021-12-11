import React, { useState } from 'react'
import { Card, Image, Row, Col } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom'

import mongoose from 'mongoose'
import moment from 'moment'

function QuizCardMini({ quiz, showPlatform = true }) {
    const history = useHistory()
    let location = useLocation()

    const routeToQuiz = () => {
        history.push(`/platform/${quiz.platformId._id}/quiz/${quiz._id}`);
    }

    const routeToQuizEdit = () => {
        history.push(`/platform/${quiz.platformId._id}/quiz/${quiz._id}/edit`);
    }

    const routeToPlatform = () => {
        history.push(`/platform/${quiz.platformId._id}`);
    }

    const createdAt = mongoose.Types.ObjectId(quiz._id).getTimestamp();
    const isEdit = location.pathname.endsWith("edit")
    const isHome = location.pathname.endsWith("/")

    return (
        <Card>
            <Card.Body style={{ cursor: isEdit ? "pointer" : "" }} onClick={isEdit ? routeToQuizEdit : () => { }}>
                <Row>
                    <Col className="my-auto" align="center" >
                        {isEdit && (<i className="bi bi-pencil-square position-absolute top-0 start-100 translate-middle" style={{ fontSize: "1.3rem" }}></i>)}
                        <Image style={{ width: "100%", height: "150px", cursor: 'pointer' }} onClick={routeToQuiz} className="bg-dark" src={quiz.thumbnail ? quiz.thumbnail : "/quizzit_logo.png"} thumbnail />

                        <Row>
                            {
                                showPlatform &&
                                (
                                    <Col md={3} className="my-auto" style={{ padding: "0px" }}>
                                        <Image style={{ width: "40px", height: "40px", cursor: 'pointer' }} onClick={routeToPlatform} className="bg-dark" src={quiz.platformId.icon ? quiz.platformId.icon : '/quizzit_logo.png'} thumbnail />
                                    </Col>)

                            }
                            <Col md={showPlatform ? 9 : 12} align="start" style={{ padding: showPlatform ? "0px" : ""}}>
                                <p className="fs-5 text" style={{ cursor: 'pointer', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}} onClick={routeToQuiz}>{quiz.name}</p>
                                {showPlatform && <p className="text-muted" style={{ cursor: "pointer", marginTop: "-10px", fontSize: "11pt", whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }} onClick={routeToPlatform}>{quiz.platformId.name}</p>}
                                <p className="text-muted" style={{ marginTop: "-10px", fontSize: "9pt" }}><i class="bi bi-people-fill"></i> {quiz.submissionCount} Taken<i class="bi bi-dot" />{moment(createdAt).fromNow()}</p>
                                <p className="text-muted" align="right" style={{ marginTop: "-10px", marginBottom:"-10px", fontSize: "9pt"}}><i class="bi bi-stopwatch"></i> {quiz.time} min</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
export default QuizCardMini;