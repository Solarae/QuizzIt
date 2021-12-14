import { useEffect, createRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSubmission } from "../actions/submissionActions"
import { Col, Container, Row, Button, Card } from "react-bootstrap"
import { useParams } from "react-router"
import SubmissionCard from "../components/Submission/SubmissionCard"
import TakeQuizBanner from '../components/Quiz/TakeQuizBanner'
import Loading from '../components/Loading'

function ReviewSubmission() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const { id } = useParams()
    const submission = useSelector((state) => state.submission.submission)
    const [quiz, setQuiz] = useState(null)
    const [qno, setqno] = useState(0)
    const [question, setQuestion] = useState(null)

    // ref to div that has scrollbar for quesiton button list 
    const btnListRef = createRef()

    const isGetSubmissionLoading = useSelector((state) => state.submission.isGetSubmissonLoadingSingle)

    //fetch the submission id
    useEffect(() => {
        console.log("CALLING DISPATCH")
        if (user)
            dispatch(getSubmission({
                id,
                query: {
                    expand: 'platformId(select=name),quizId(select=name,questions)'
                }
            }))
    }, [dispatch, user])

    useEffect(() => {
        if (submission) {
            setQuiz(submission.quizId)
            setQuestion(submission.quizId.questions[qno])
        }

    }, [submission])

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

    if (isGetSubmissionLoading || submission == null || quiz == null) {
        return (<Loading />)
    }
    console.log(submission)
    return (
        <div className="justify-content-between">
            <TakeQuizBanner q={quiz}></TakeQuizBanner>
            <br></br>
            <Container style={{ width: "100%" }}>
                <h2>Correct: {submission.score}/{submission.quizId.questions.length}</h2>
                <h2>Time Spent: {submission.timeTaken} seconds </h2>
                <div style={{ height: "10vh" }}></div>
                <Row style={{ 'height': '60vw' }}>
                    <Col className="my-50" xs={2} style={{ height: "60%" }} >
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
                        <Row>
                            <h2>Question {qno + 1}</h2>
                            <hr />
                        </Row>
                        <Row style={{ minHeight: '15%' }}>
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
                        <Row style={{}}>
                            <Col xs={6}>
                                <Option text={question.choices[0]}
                                    isAnswer={question.answer === 'a'}
                                    selected={submission.answers[qno] === 'a'}

                                ></Option>
                            </Col>
                            <Col xs={6}>
                                <Option text={question.choices[1]}
                                    isAnswer={question.answer === 'b'}
                                    selected={submission.answers[qno] === 'b'}
                                ></Option>
                            </Col>
                        </Row>
                        <Row style={{}} >
                            <Col xs={6}>
                                <Option text={question.choices[2]}
                                    isAnswer={question.answer === 'c'}
                                    selected={submission.answers[qno] === 'c'}
                                ></Option>
                            </Col>
                            <Col xs={6}>
                                <Option text={question.choices[3]}
                                    isAnswer={question.answer === 'd'}
                                    selected={submission.answers[qno] === 'd'}
                                ></Option>
                            </Col>
                        </Row>

                        <div style={{ height: "1vw" }}></div>
                        <Row align='center' style={{ height: '10%' }}>
                            <Col xs={4} ></Col>
                            <Col className="d-flex justify-content-between" xs={4} style={{}} >
                                <Button variant="primary" onClick={handlePrev} disabled={qno == 0} style={{ width: "45%", height: '60%' }}><i class="bi bi-caret-left-fill"></i> Prev</Button>
                                <Button variant="primary" onClick={handleNext} disabled={qno == quiz.questions.length - 1} style={{ width: "45%", height: '60%' }} >Next <i class="bi bi-caret-right-fill"></i></Button>
                            </Col>
                            <Col xs={4} ></Col>
                        </Row>

                    </Col>

                    <Col xs={2} >
                    </Col>
                </Row>
            </Container>
        </div>

    )

}

function Option({ text, isAnswer, selected }) {
    let border = ''
    if (isAnswer) {
        border = 'success'
    }
    if (!isAnswer && selected) {
        border = 'danger'
    }

    return (
        <span >
            <Card
                border={border}
                bg='Light'
                style={{ marginBottom: "1vw", borderWidth: "3px" }}
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

export default ReviewSubmission