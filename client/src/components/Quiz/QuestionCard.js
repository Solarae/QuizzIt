import React from 'react'
import { Col, Card, ListGroup } from 'react-bootstrap';

function QuestionCard({ quizId }) {
    return (
        <Card bg="white" style={{ width: "220px" }} >
            <Card.Title style={{fontSize: "11pt"}}>Question Title</Card.Title>
            <Col className="g-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <Col> Option Text </Col>
                    ))}
            </Col>         
        </Card>
    )
}
export default QuestionCard;