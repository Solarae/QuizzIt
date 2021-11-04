import React from 'react'
import { Col, Card, ListGroup, Button } from 'react-bootstrap';

function QuestionCard({ question }) {
    return (
        <Card bg="white" style={{ width: "220px" }} >
            <Card.Title style={{fontSize: "14pt"}}>{question.question}</Card.Title>
            <Col className="g-4">
                    {question.choices.map((choice, idx) => (
                        <Col> {choice} </Col>
                    ))}
            </Col>  
            <Button variant="primary btn-sm"> Edit </Button>       
        </Card>
    )
}
export default QuestionCard;