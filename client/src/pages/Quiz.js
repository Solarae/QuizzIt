import { React, useEffect } from 'react'
import { Container, Col, Table, Button } from 'react-bootstrap';

import Banner from '../components/Quiz/Banner'
import { getQuiz, getQuizLeaderboard } from '../actions/quizActions'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import MiniLeaderboard from '../components/Leaderboards/MiniLeaderboard.js'


function Quiz() {
    const dispatch = useDispatch()

    const isLoading = useSelector((state) => state.quiz.isLoading)
    const quiz = useSelector((state) => state.quiz.quiz)
    const history = useHistory()

    const { isGetQuizLeaderboardLoading, leaderboard, errors} = useSelector((state) => state.quiz)

    const { id, qid } = useParams();  // get the platform ID from the url
    const url = `/platform/${id}/quiz/${qid}/leaderboard`

    const leaderboardProps = {
        doc: 'Quiz',
        id: qid,
        url,
        isGetLeaderboardLoading: isGetQuizLeaderboardLoading,
        leaderboard,
        errors,
        getLeaderboard: getQuizLeaderboard
    }

    useEffect(() => {
        dispatch(getQuiz(qid))
    }, [dispatch, qid])

    if (isLoading) {
        return ( <div> Loading... </div> )
    }
    const handleTakeQuiz = () => {
        history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}/take`)
    }
    
    return (
        <>
            <Banner isEdit={false}></Banner>      

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
                    <Button variant="outline-primary btn-lg" style={{ marginLeft: "10px" }} onClick={handleTakeQuiz}>Take Quiz</Button>
                    <Button variant="primary btn-lg" style={{ marginLeft: "10px" }}>View Submissions</Button>
                </div>
                </Col>
                <MiniLeaderboard {...leaderboardProps}></MiniLeaderboard>
                </Container>
        </>
    )
}

export default Quiz