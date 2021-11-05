import { React, useEffect, useState } from 'react'
import { Container, Col, Button } from 'react-bootstrap';

import TakeQuestionCard from '../components/Question/TakeQuestionCard'
import TakeQuizBanner from '../components/Quiz/TakeQuizBanner'
import CountDownTimer from '../components/Quiz/CountDownTimer';

import { getQuiz } from '../actions/quizActions'
import { makeSubmission } from '../actions/submissionActions';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'


function TakeQuiz() {
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.quiz.isLoading)
    const quiz = useSelector((state) => state.quiz.quiz)
    const [questionsAttempted, setQuestionsAttempted] = useState()
    
    const [timer, setTimer] = useState(0)

    const timerIncrement = () => { setTimer(timer + 1) }

    const history = useHistory()

    let { qid } = useParams()
    // console.log(qid)
    // console.log(useParams())
    
    useEffect(() => {
        if (!quiz) dispatch(getQuiz(qid))
    }, [dispatch, quiz])
        
    useEffect(() => {
        if (!isLoading && quiz.time == (timer/60)) handleSubmit()
    }, [timer])
    
    if (isLoading) {
        return ( <div> Loading... </div> )
    }
    
    const questionInput = (e, idx, index) => {
        const newQuestionsAttempted = {...questionsAttempted}
        newQuestionsAttempted[index] = idx
        setQuestionsAttempted(newQuestionsAttempted)
    }
    // console.log(quiz.questions)

    const handleSubmit = () => {
        console.log(questionsAttempted)

        let answers = Array(quiz.questions.length).fill(-1)
        for (var key in questionsAttempted) {
            answers[key] = String.fromCharCode(questionsAttempted[key] + 97) 
        }

        console.log(answers)

        if (answers.includes(-1)) {
            if (timer/60 >= quiz.time) {
                dispatch(makeSubmission({ 
                    quizId: qid, 
                    answers: answers,
                    platformId: quiz.platformId,
                    userId: '61789892168228326a5fadd9',
                    timeTaken: timer,
                }))
            }
            return;
        }
        dispatch(makeSubmission({ 
            quizId: qid, 
            answers: answers,
            platformId: quiz.platformId,
            userId: '61789892168228326a5fadd9',
            timeTaken: timer,
        }))

        history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}`)
    }

    const calculateTime = () => {
        const time = quiz.time
        const hrs = Math.floor(time/60)
        // console.log(hrs)
        const mins = time%60
        const secs = 0
        return {hrs, mins, secs}
    }

    return (
        <>
            <TakeQuizBanner></TakeQuizBanner>
            <div style={{ height: "10vh" }}></div>
            <CountDownTimer duration={calculateTime} counter={timerIncrement}></CountDownTimer>

            <Container className="row justify-content-center">
                <Col xs={1} md={4} className="g-4">
                    <div style={{ height: "3vh" }}></div>
                    {quiz.questions.map((question, idx) => (
                        <>
                            <Col>
                                <TakeQuestionCard quizId={qid} question={question} questionNumber={idx} questionInput={questionInput} ></TakeQuestionCard>
                            </Col>
                            <div style={{ height: '20px'}}></div>
                        </>
                        ))}
                </Col>
                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Container>
        </>
    )
}

export default TakeQuiz