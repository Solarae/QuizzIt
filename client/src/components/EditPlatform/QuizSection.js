import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col, } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import QuizCard from '../Platform/QuizCard.js'
import CreateQuiz from './CreateQuiz.js'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function QuizSection({ platform }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const auth = useSelector((state) => state.auth)

    const [showCreateQuiz, setShowCreateQuiz] = useState(false);

    return (
        <Container>
            <h4 style={{ marginBottom: "20px" }}>Platform Quizzes</h4>
            <Row xs={1} md={4} className="g-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                    <Col align="center">
                        <QuizCard></QuizCard>
                    </Col>
                ))}
                <Col align="center" className="my-auto">
                    <i className="bi bi-plus-circle" onClick={()=>{setShowCreateQuiz(true)}} style={{ fontSize: "2.0rem", cursor:"pointer" }}></i>
                </Col>
            </Row>

            <CreateQuiz show={showCreateQuiz} handleClose={()=>{setShowCreateQuiz(false)}}></CreateQuiz>
        </Container >

    )
}
export default QuizSection;
