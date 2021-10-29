import React from 'react'
import { Container, Col } from 'react-bootstrap';

import Banner from '../components/Quiz/Banner'
import QuestionCard from '../components/Quiz/QuestionCard'

function EditQuiz({ quizId }) {
    return (
        <>
            <Banner></Banner>

            <div style={{ height: "100px" }}></div>

            <Container className="row justify-content-center">
                <Col xs={1} md={4} className="g-4">
                        {Array.from({ length: 9 }).map((_, idx) => (
                            <>
                            <Col>
                                <QuestionCard quizId={quizId}></QuestionCard>
                            </Col>
                            <div style={{ height: '20px'}}></div>
                            </>
                        ))}
                </Col>
            </Container>
        </>
    )
}

export default EditQuiz