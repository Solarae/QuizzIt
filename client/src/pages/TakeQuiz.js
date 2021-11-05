import { React, useEffect, useState } from 'react'
import { Container, Col, Button } from 'react-bootstrap';

import TakeQuestionCard from '../components/Question/TakeQuestionCard'
import TakeQuizBanner from '../components/Quiz/TakeQuizBanner'

import { getQuiz } from '../actions/quizActions'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'


function TakeQuiz({ quizId }) {
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.quiz.isLoading)
    const quiz = useSelector((state) => state.quiz.quiz)
    const [questionsAttempted, setQuestionsAttempted] = useState({})
    // const platform = useSelector((state) => state.platform.platform)
    
    const history = useHistory()

    let { qid } = useParams()
    console.log(qid)
    console.log(useParams())
    // let { id } = useParams()

    
    useEffect(() => {
        if (!quiz) dispatch(getQuiz(qid))
    }, [dispatch, quiz])
    
    // useEffect(() => {
        //     if (!platform) dispatch(getQuiz(id))
        // }, [dispatch, platform])
    
    
    if (isLoading) {
        return ( <div> Loading... </div> )
    }
    
    const questionInput = (e, index) => {
        const newQuestionsAttempted = {...questionsAttempted}
        newQuestionsAttempted[index] = e.target.value
        setQuestionsAttempted(newQuestionsAttempted)
    }
    console.log(quiz.questions)

    const handleSubmit = () => {
        console.log(questionsAttempted)
    }

    return (
        <>
            <TakeQuizBanner></TakeQuizBanner>

            <div style={{ height: "10vh" }}></div>

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
                <Button variant="primary" onClick={handleSubmit} >Submit</Button>
            </Container>

        </>
    )
}

export default TakeQuiz