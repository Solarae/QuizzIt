import { React, useEffect, useState, createRef } from 'react'
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

    // ref to div that has scrollbar for quesiton button list 
    const btnListRef = createRef()

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
        dispatch(getQuiz(qid, {
            expand: 'platformId(select=name,owner,icon,banner,subscribers)'
        }))
    }, [dispatch, qid])

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
                history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}`)
            }
            return;
        }

        dispatch(makeSubmission({
            quizId: qid,
            answers: answers,
            platformId: quiz.platformId,
            userId: user.id,
            timeTaken: timer,
        }))

        history.push(`/platform/${quiz.platformId._id}/quiz/${quiz._id}`)
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
        btnListRef.current.scrollTop = 20 * (qno - 1) // scrolls to the button in the button list
    }

    const handleNext = () => {
        setqno(qno + 1)
        setQuestion(quiz.questions[qno + 1])
        btnListRef.current.scrollTop = 20 * (qno + 1) // scrolls to the button in the button list
    }

    const handleJumpto = (idx) => {
        setqno(idx)
        setQuestion(quiz.questions[idx])
    }

    if (!user) {
        return (<Row align='center'><div>Please Sign In</div></Row>)
    }

    return (
        <div className="justify-content-between">
            <TakeQuizBanner></TakeQuizBanner>
            <div style={{ height: "10vh" }}></div>

            <CountDownTimer duration={calculateTime} counter={timerIncrement}></CountDownTimer>

            <Container style={{ width: "100%" }}>
                <Row style={{ 'height': '60vw' }}>
                    <Col className="my-auto" xs={2} style={{ height: "80%" }} >
                        <div ref={btnListRef} className="overflow-auto my-auto questionScroll" style={{ height: "100%", borderRight: 'solid', borderWidth: "1px", borderColor: '#bfbfbf', display: 'inline-block', paddingRight: '3vw', paddingTop: '1vw', paddingBottom: '1vw' }}>

                            {quiz.questions.map((question, idx) => (
                                <>
                                    <Col>
                                        <Button disabled={idx === qno} variant={idx === qno ? 'secondary' : 'primary'} onClick={() => { handleJumpto(idx) }}>{idx + 1}</Button>
                                    </Col>
                                    <div style={{ height: '20px' }}></div>
                                </>
                            ))}
                        </div>
                    </Col>
                    <Col align='center' xs={8} style={{ height: "90%" }}>
                        <Row style={{ height: '40%' }}>
                            <h2>Question {qno + 1}</h2>
                            <hr />
                            <Card
                                border="dark"
                                bg='Light'
                            >
                                <Card.Body>
                                    <Card.Text>
                                        <h4>{question.question}</h4>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>

                        <br />
                        <Row style={{  }}>
                            <Col xs={6}>
                                <Option text={question.choices[0]} selected={userAnswers[qno] === 'a'} onClick={() => { questionInput(qno, 'a') }}></Option>
                            </Col>
                            <Col xs={6}>
                                <Option text={question.choices[1]} selected={userAnswers[qno] === 'b'} onClick={() => { questionInput(qno, 'b') }}></Option>
                            </Col>
                        </Row>
                        <Row style={{  }}>
                            <Col xs={6}>
                                <Option text={question.choices[2]} selected={userAnswers[qno] === 'c'} onClick={() => { questionInput(qno, 'c') }}></Option>
                            </Col>
                            <Col xs={6}>
                                <Option text={question.choices[3]} selected={userAnswers[qno] === 'd'} onClick={() => { questionInput(qno, 'd') }}></Option>
                            </Col>
                        </Row>

                        <Row align='center' style={{ height: '10%' }}>
                            <Col xs={4} ></Col>
                            <Col className="d-flex justify-content-between" xs={4} >
                                <Button variant="primary" onClick={handlePrev} disabled={qno == 0} style={{ width: "45%" }}><i class="bi bi-caret-left-fill"></i> Previous</Button>
                                <Button variant="primary" onClick={handleNext} disabled={qno == quiz.questions.length - 1} style={{ width: "45%" }} >Next <i class="bi bi-caret-right-fill"></i></Button>
                            </Col>
                            <Col xs={4} ></Col>
                        </Row>

                        <div style={{ height: "4vw" }}></div>
                        <Row align='center'>
                            <Col align='center' style={{}}>
                                <Button variant="success" disabled={userAnswers.includes(-1)} onClick={handleSubmit}>Submit Quiz</Button>
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
                style={{ marginBottom: "1vw", borderWidth: '3px' }}
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