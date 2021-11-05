import { React, useState } from 'react'
import { Col, Card, Button } from 'react-bootstrap';

import EditQuestion from './EditQuestion'

function EditQuestionCard({ quizId, question }) {
    const [showEditQuestion, setShowEditQuestion] = useState(false);
    const handleShowEditQuestion = () => { setShowEditQuestion(true) };
    const handleCloseEditQuestion = () => { setShowEditQuestion(false) };

    return (
        <Card bg="white" style={{ width: "220px" }} >
            <Card.Title style={{fontSize: "14pt"}}>{question.question}</Card.Title>
            <Col className="g-4">
                    {question.choices.map((choice, idx) => (
                        <Col> {choice} </Col>
                    ))}
            </Col>  
            <Button onClick={handleShowEditQuestion} variant="primary btn-sm" > Edit </Button>
            <EditQuestion quizId={quizId} show={showEditQuestion} handleClose={handleCloseEditQuestion} question={question} ></EditQuestion>       
        </Card>
    )
}
export default EditQuestionCard;