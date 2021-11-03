import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col, } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import QuizCard from '../Platform/QuizCard.js'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function QuizSection({ platform }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const auth = useSelector((state) => state.auth)

    return (
        <Container>
            <h4 style={{ marginBottom: "20px" }}>Platform Quizzes</h4>
            <Row xs={1} md={4} className="g-4">
                {Array.from({ length: 6}).map((_, idx) => (
                    <Col align="center">
                        <QuizCard></QuizCard>
                    </Col>
                ))}
                <Col align="center" className="my-auto">
                    <i className="bi bi-plus-circle" style={{fontSize:"2.0rem"}}></i>
                </Col>
            </Row>
        </Container >

    )
}
export default QuizSection;
