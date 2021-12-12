import { React, useState } from 'react'
import { Col, Card } from 'react-bootstrap';

function TakeQuestionCard({ question, questionNumber, questionInput, answers}) {
    // const [choiceValue, setChoiceValue] = useState();
    console.log(answers, typeof answers[5])
    return (
        <Card bg="white" style={{ width: "50vw" }} >
            <Card.Title style={{fontSize: "16pt"}}>{question.question}</Card.Title>
            <Col className="g-4">
                {question.choices.map((choice, idx) => (
                    <>
                        <input
                        key={idx}
                        type="radio"
                        name={question._id + idx}
                        value={choice+idx+question._id} 
                        checked={(typeof answers[questionNumber] !== 'undefined') && (idx === answers[questionNumber])}
                        onChange={(e) => {
                            questionInput(e, idx, questionNumber)
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