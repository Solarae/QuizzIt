import { React, useState } from 'react'
import { Col, Card, ButtonGroup, ToggleButton } from 'react-bootstrap';

function TakeQuestionCard({ quizId, question, questionNumber, questionInput }) {
    const [choiceValue, setChoiceValue] = useState();
    return (
        <Card bg="white" style={{ width: "220px" }} >
            <Card.Title style={{fontSize: "14pt"}}>{question.question}</Card.Title>
            <Col className="g-4">
            {/* <ButtonGroup> */}
                {question.choices.map((choice, idx) => (
                    <>
                    <input
                    key={idx}
                    type="radio"
                    name={idx}
                    value={choice}
                    checked={choiceValue === choice}
                    onChange={(e) => {
                        questionInput(e, questionNumber)
                        setChoiceValue(e.currentTarget.value)
                    }}
                  />{choice}
                    <div style={{ width: '20px'}}></div>
                  </>
                    // <ToggleButton key={idx} id={`choice-${idx}`} type="radio" variant={'outline-success'} name={idx} value={choice} checked={choiceValue === choice} onChange={(e) => setChoiceValue(e.currentTarget.value)}>
                    // {choice}
                    // </ToggleButton>
                ))}
            {/* </ButtonGroup> */}
            </Col>  
        </Card>
    )
}
export default TakeQuestionCard;