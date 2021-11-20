import { React, useState } from 'react'
import { Col, Card } from 'react-bootstrap';

function SubmissionCard({ question,submission,idx }) {
    return (
        <Card style={{ width: "70vw" }} >
            <Card.Header>Question {idx+1})</Card.Header>
            <Card.Body>
                <h6 className="ml-5">Points Earned:{  question.answer === submission.answers[idx] ? "1":"0"}/1</h6>
                <br/>
                <Card.Title style={{fontSize: "16pt"}}>{question.question}</Card.Title>
                <Col className="g-4">
                    {question.choices.map((choice, idx) => (
                        <>
                            {String.fromCharCode(65 + idx)}:{choice}
                            <div style={{ width: '20px'}}></div>
                        </>
                    ))}
                </Col>  
            </Card.Body>
            <h6> Your Response:{submission.answers[idx].toUpperCase()} </h6>
        </Card>
    )
}
export default SubmissionCard;