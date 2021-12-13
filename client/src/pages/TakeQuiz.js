import { React, useEffect, useState } from 'react'
import { Container, Col, Button, Card, Row } from 'react-bootstrap';

import TakeQuestionCard from '../components/Question/TakeQuestionCard'
import TakeQuizBanner from '../components/Quiz/TakeQuizBanner'
import CountDownTimer from '../components/Quiz/CountDownTimer';

import { getQuiz } from '../actions/quizActions'
import { makeSubmission } from '../actions/submissionActions';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Loading from '../components/Loading'



function TakeQuiz() {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.user)
    const quiz = useSelector((state) => state.quiz.quiz)
    const isLoading = useSelector((state) => state.quiz.isLoading)
    const [userAnswers, setUserAnswers] = useState({})
    const [timer, setTimer] = useState(0)
    const [qno, setqno] = useState(0)
    const [question, setQuestion] = useState(null)

    const history = useHistory()
    const timerIncrement = () => { setTimer(timer + 1) }
    let { qid } = useParams()

    useEffect(() => {
        if (!isLoading && quiz.time == (timer / 60)) {
            handleSubmit()
        }
    }, [timer])

    // load the quiz
    useEffect(() => {
        dispatch(getQuiz(qid))
    }, [])

    useEffect(() => {
        if (quiz) {
            setQuestion(quiz.questions[qno])
            setUserAnswers(Array(quiz.questions.length).fill(-1))
        }
    }, [quiz])


    if (isLoading || !quiz || !question) {
        return (<Loading />)
    }

    const questionInput = (qIndex, answer) => {
        let newAnswers = [...userAnswers]
        newAnswers[qIndex] = answer
        setUserAnswers(newAnswers)
        console.log(newAnswers)

    }

    const handleSubmit = () => {
        let answers = userAnswers

        if (answers.includes(-1)) {
            if (timer / 60 >= quiz.time) {
                dispatch(makeSubmission({
                    quizId: qid,
                    answers: answers,
                    platformId: quiz.platformId,
                    userId: user.id,
                    timeTaken: timer,
                }))
            }
            history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}`)
            return;
        }

        dispatch(makeSubmission({
            quizId: qid,
            answers: answers,
            platformId: quiz.platformId,
            userId: user.id,
            timeTaken: timer,
        }))

        history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}`)
    }

    const calculateTime = () => {
        const time = quiz.time
        const hrs = Math.floor(time / 60)
        // console.log(hrs)
        const mins = time % 60
        const secs = 0
        return { hrs, mins, secs }
    }

    const handlePrev = () => {
        setqno(qno - 1)
        setQuestion(quiz.questions[qno - 1])
    }

    const handleNext = () => {
        setqno(qno + 1)
        setQuestion(quiz.questions[qno + 1])
    }

    const handleJumpto = (idx) => {
        setqno(idx)
        setQuestion(quiz.questions[idx])
    }

    return (
        <div className="justify-content-between">
            <TakeQuizBanner></TakeQuizBanner>
            <div style={{ height: "10vh" }}></div>

            <CountDownTimer duration={calculateTime} counter={timerIncrement}></CountDownTimer>

            <Container style={{ width: "100%" }}>
                <Row>
                    <Col className="my-auto" xs={2} style={{  }}>
                        {quiz.questions.map((question, idx) => (
                            <>
                                <Col>
                                    <Button disabled={idx === qno} onClick={() => { handleJumpto(idx) }}>{idx + 1}</Button>
                                </Col>
                                <div style={{ height: '20px' }}></div>
                            </>
                        ))}
                    </Col>
                    <Col align='center' xs={8} style={{  }}>
                        <Card
                            border="dark"
                            bg='Light'
                        >
                            <Card.Body>
                                <Card.Text>
                                    <h3>{question.question}</h3>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <br />
                        <Row >
                            <Col xs={6}>
                                <Option text={question.choices[0]} selected={userAnswers[qno] === 'a'} onClick={() => { questionInput(qno, 'a') }}></Option>
                            </Col>
                            <Col xs={6}>
                                <Option text={question.choices[1]} selected={userAnswers[qno] === 'b'} onClick={() => { questionInput(qno, 'b') }}></Option>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Option text={question.choices[2]} selected={userAnswers[qno] === 'c'} onClick={() => { questionInput(qno, 'c') }}></Option>
                            </Col>
                            <Col xs={6}>
                                <Option text={question.choices[3]} selected={userAnswers[qno] === 'd'} onClick={() => { questionInput(qno, 'd') }}></Option>
                            </Col>
                        </Row>

                        <div style={{ height: "5vw" }}></div>
                        <Row align='center'>
                            <Col xs={4} ></Col>
                            <Col className="d-flex justify-content-between" xs={4} >
                                <Button variant="primary" onClick={handlePrev} disabled={qno == 0}>Previous</Button>
                                <Button variant="primary" onClick={handleNext} disabled={qno == quiz.questions.length - 1} >Next</Button>
                            </Col>
                            <Col xs={4} ></Col>
                        </Row>

                        <div style={{ height: "5vw" }}></div>
                        <Row>
                            <Col>
                                <Button variant="primary" onClick={handleSubmit}>Submit Quiz</Button>
                            </Col>
                        </Row>

                    </Col>

                    <Col xs={2} >
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

function Option({ text, selected, onClick }) {
    return (
        <span onClick={(e) => { e.preventDefault(); onClick() }}>
            <Card
                className="questionOption"
                border={selected ? "primary" : ""}
                bg='Light'
                style={{ marginBottom: "1vw" }}
            >
                <Card.Body>
                    <Card.Text>
                        {text}
                    </Card.Text>
                </Card.Body>
            </Card>
        </span>
    )

}

export default TakeQuiz