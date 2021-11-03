import { React, useEffect, useState } from 'react'
import { Container, Col, Button } from 'react-bootstrap';

import Banner from '../components/Quiz/Banner'
import QuestionCard from '../components/Question/QuestionCard'
import AddQuestion from '../components/Question/AddQuestion'

import { getQuiz } from '../actions/quizActions'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'


function EditQuiz({ quizId }) {
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.quiz.isLoading)
    const quiz = useSelector((state) => state.quiz.quiz)
    // const platform = useSelector((state) => state.platform.platform)

    const history = useHistory()

    let { qid } = useParams()
    // let { id } = useParams()

    useEffect(() => {
        if (!quiz) dispatch(getQuiz(qid))
    }, [dispatch, quiz])

    // useEffect(() => {
    //     if (!platform) dispatch(getQuiz(id))
    // }, [dispatch, platform])

    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const handleShowAddQuestion = () => { 
        console.log("show add")
        setShowAddQuestion(true) };
    const handleCloseAddQuestion = () => { setShowAddQuestion(false) };



    if (isLoading) {
        return ( <div> Loading... </div> )
    }
    return (
        <>
            <Banner></Banner>

            <div style={{ height: "10vh" }}></div>

            <Container className="row justify-content-center">
                <Col xs={1} md={4} className="g-4">
                    <Button onClick={handleShowAddQuestion} variant="primary btn-lg" style={{ marginLeft: "10px" }}>Add Question</Button>
                    {Array.from({ length: 9 }).map((_, idx) => (
                        <>
                        <Col>
                            <QuestionCard quizId={quizId}></QuestionCard>
                        </Col>
                        <div style={{ height: '20px'}}></div>
                        </>
                        ))}
                </Col>
            </Container>

            <AddQuestion quizId={quizId} show={showAddQuestion} handleClose={handleCloseAddQuestion}></AddQuestion>
        </>
    )
}

export default EditQuiz