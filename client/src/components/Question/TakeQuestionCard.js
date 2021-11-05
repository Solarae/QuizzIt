import { React, useState } from 'react'
import { Col, Card, ButtonGroup, ToggleButton } from 'react-bootstrap';

function TakeQuestionCard({ quizId, question, questionNumber, questionInput }) {
    const [choiceValue, setChoiceValue] = useState();
    return (
        <Card bg="white" style={{ width: "220px" }} >
            <Card.Title style={{fontSize: "14pt"}}>{question.question}</Card.Title>
            <Col className="g-4">
                {question.choices.map((choice, idx) => (
                    <>
                        <input
                        key={idx}
                        type="radio"
                        name={question._id + idx}
                        value={choice}
                        checked={choiceValue === choice}
                        onChange={(e) => {
                            questionInput(e, idx, questionNumber)
                            setChoiceValue(e.currentTarget.value)
                        }}
                    />{choice}
                        <div style={{ width: '20px'}}></div>
                  </>
                ))}
            </Col>  
        </Card>
    )
}
export default TakeQuestionCard;