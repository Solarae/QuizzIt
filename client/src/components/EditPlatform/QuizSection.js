import React, { useState } from 'react'
import { Container, Row, Col, } from 'react-bootstrap';
import QuizCardMini from '../Cards/QuizCardMini.js'
import CreateQuiz from './CreateQuiz.js'

function QuizSection({ quizzesData }) {
    const [showCreateQuiz, setShowCreateQuiz] = useState(false);

    return (
        <Container>
            <h4 style={{ marginBottom: "20px" }}>Platform Quizzes</h4>
            <Row xs={1} md={4} className="g-4" >
                <Col style={{ minHeight: "220px" }} align="center">
                    <div className="position-relative top-50 start-50 translate-middle" >
                        <i className="bi bi-plus-circle justify-content-center" onClick={() => { setShowCreateQuiz(true) }} style={{ fontSize: "2.0rem", cursor: "pointer" }}></i>
                    </div>
                </Col>
                {quizzesData.length > 0 && quizzesData.map((quiz, idx) => (
                    <Col align="center">
                        <QuizCardMini quiz={quiz} showPlatform={false}></QuizCardMini>
                    </Col>
                ))}
            </Row>

            <CreateQuiz show={showCreateQuiz} handleClose={() => { setShowCreateQuiz(false) }}></CreateQuiz>
        </Container >

    )
}
export default QuizSection;
