import {React,useEffect} from 'react'
import { Container, Col, Table, Button } from 'react-bootstrap';

import Banner from '../components/Quiz/Banner'

import { getQuiz } from '../actions/quizActions'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'


function Quiz() {
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.quiz.isLoading)
    const quiz = useSelector((state) => state.quiz.quiz)
    const history = useHistory()

    let { qid } = useParams()

    useEffect(() => {
        dispatch(getQuiz('617b7f8d5ff650a255484597'))
    }, [dispatch, quiz])

    if (isLoading) {
        return ( <div> Loading... </div>)
    }
    console.log(isLoading)
    return (
        <div>
            <Banner></Banner>      

            <div style={{ height: "10vh" }}></div>
                <Container>
                <Col>
                <Table striped bordered hover>
                    <tr><th>Quiz Rules</th></tr>
                    <tr>
                        <th>Time</th>
                        <th>5 minutes</th>
                    </tr>
                    <tr>
                        <th>Number of Questions</th>
                        <th>20</th>
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
        </div>
    )
}

export default Quiz