import { React, useEffect } from 'react'
import { Container, Col, Table, Button } from 'react-bootstrap';

import Banner from '../components/Quiz/Banner'

import { getQuiz } from '../actions/quizActions'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'


function Quiz() {
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

    if (isLoading) {
        return ( <div> Loading... </div> )
    }
    return (
        <>
            <Banner></Banner>      

            <div style={{ height: "10vh" }}></div>
                <Container>
                <Col>
                <Table striped bordered hover>
                    <tr><th>Quiz Rules</th></tr>
                    <tr>
                        <th>Time</th>
                        <th>{quiz.time}</th>
                    </tr>
                    <tr>
                        <th>Number of Questions</th>
                        <th>{quiz.questions.length}</th>
                    </tr>
                </Table>
                <div className="d-grid gap-1">
                    <Button variant="outline-primary btn-lg" style={{ marginLeft: "10px" }}>Take Quiz</Button>
                    <Button variant="primary btn-lg" style={{ marginLeft: "10px" }}>View Submissions</Button>
                </div>
                </Col>
                <Col>
                    <div> Leaderboard Goes Here</div>
                </Col>
                </Container>
        </>
    )
}

export default Quiz