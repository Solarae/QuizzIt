import { React, useEffect, useState } from 'react'
import { Container, Col, Button } from 'react-bootstrap';

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
    
    const user = useSelector((state)=>state.auth.user)
    const quiz = useSelector((state) => state.quiz.quiz)
    const isLoading = useSelector((state) => state.quiz.isLoading)
    const [questionsAttempted, setQuestionsAttempted] = useState([])
    const [timer, setTimer] = useState(0)
    const [qno, setqno] = useState(0)
    const [question, setQuestion] = useState(quiz.questions[qno])

    const history = useHistory()
    const timerIncrement = () => { setTimer(timer + 1) }
    let { qid } = useParams()

    useEffect(() => {
        if (!isLoading && quiz.time == (timer/60)) {
            handleSubmit()
        }
    }, [timer])
    
    useEffect(() => {
        console.log(quiz.questions)
    }, [])

    if (isLoading) {
        return (<Loading />)
    }
    
    const questionInput = (e, idx, index) => {
        // e.preventDefault()
        const newQuestionsAttempted = {...questionsAttempted}
        newQuestionsAttempted[index] = idx
        setQuestionsAttempted(newQuestionsAttempted)
        console.log(questionsAttempted)
    }

    const handleSubmit = () => {

        let answers = Array(quiz.questions.length).fill(-1)
        
        for (var key in questionsAttempted) {
            answers[key] = String.fromCharCode(questionsAttempted[key] + 97) 
        }        

        if (answers.includes(-1)) {
            if (timer/60 >= quiz.time) {
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
        const hrs = Math.floor(time/60)
        // console.log(hrs)
        const mins = time%60
        const secs = 0
        return {hrs, mins, secs}
    }
    
    const handlePrev = () => {
        setqno(qno-1)
        setQuestion(quiz.questions[qno-1])       
    }

    const handleNext = () => {
        setqno(qno+1)
        setQuestion(quiz.questions[qno+1])
    }
    
    const handleJumpto = (idx) => {
        setqno(idx)
        setQuestion(quiz.questions[idx])
    }

    return (
        <>
            <TakeQuizBanner></TakeQuizBanner>
            <div style={{ height: "10vh" }}></div>
           
            <CountDownTimer duration={calculateTime} counter={timerIncrement}></CountDownTimer>

            <Container className="row justify-content-center">
                    <div style={{ height: "3vh" }}></div>
                <Col xs={3}>
                    {quiz.questions.map((question, idx) => (
                        <>
                            <Col>
                                <Button variant={idx==qno?"secondary":"primary"} onClick={() => {handleJumpto(idx)}}>{idx+1}</Button>
                            </Col>
                            <div style={{ height: '20px'}}></div>
                        </>
                        ))}
                </Col>
                <Col>
                    <TakeQuestionCard quizId={qid} question={question} questionNumber={qno} questionInput={questionInput} answers={questionsAttempted}></TakeQuestionCard>

                    <Button variant="primary" onClick={handleNext} disabled={qno==quiz.questions.length-1} >Next</Button>

                    <Button variant="primary" onClick={handlePrev} disabled={qno==0}>Previous</Button>

                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>

                </Col>
            </Container>
        </>
    )
}

export default TakeQuiz