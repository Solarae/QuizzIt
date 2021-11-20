import { React, useState } from 'react'
import { Col, Card } from 'react-bootstrap';

function SubmissionCard({ question,submission,idx }) {
    return (
        <Card bg={question.answer == submission.answers[idx] ? 'primary':'danger'} style={{ width: "50vw" }} >
            <Card.Title style={{fontSize: "16pt"}}>{question.question}</Card.Title>
            <Col className="g-4">
                {question.choices.map((choice, idx) => (
                    <>
                        {String.fromCharCode(65 + idx)}:{choice}
                        <div style={{ width: '20px'}}></div>
                    </>
                ))}
            </Col>  
        </Card>
    )
}
export default SubmissionCard;