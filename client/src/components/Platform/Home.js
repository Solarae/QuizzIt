import React from 'react'
import { Container, Image, Button, Row, Col } from 'react-bootstrap';
import QuizCard from './QuizCard.js';

function Home({ platformId }) {
    return (
        <div className="position-relative container d-flex justify-content-center" style={{ marginTop: "13px" }}>

            <Row xs={1} md={4} className="g-4">
                {Array.from({ length: 9 }).map((_, idx) => (
                    <Col>
                        <QuizCard></QuizCard>
                    </Col>
                ))}
            </Row>

        </div>
    )
}
export default Home;
