import { React, useEffect, useState } from 'react'
import { Container, Col, Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import Banner from '../components/Quiz/Banner'
import { getQuiz, getQuizLeaderboard } from '../actions/quizActions'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import MiniLeaderboard from '../components/Leaderboards/MiniLeaderboard.js'


function Quiz() {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.user)
    const isLoading = useSelector((state) => state.quiz.isLoading)
    const quiz = useSelector((state) => state.quiz.quiz)

    const [showSignIn, setShowSignIn] = useState(false);
    const handleCloseSignIn = () => { setShowSignIn(false) };
    const handleShowSignIn = () => { setShowSignIn(true) };

    const [showSignUp, setShowSignUp] = useState(false);
    const handleCloseSignUp = () => { setShowSignUp(false) };
    const handleShowSignUp = () => { setShowSignIn(false); setShowSignUp(true) };

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
        if (user) {
        history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}/take`)
        } else {
            handleShowSignIn()
        }
    }
    const handleViewSubmission = () =>{
        history.push(`/viewQuizSubmission/${quiz._id}`)
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
                    <Button variant="primary btn-lg" style={{ marginLeft: "10px" }} onClick={handleViewSubmission}>View Submissions</Button>
                </div>
                </Col>
                <MiniLeaderboard {...leaderboardProps}></MiniLeaderboard>
                </Container>

                <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} />
                <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
        </>
    )
}

export default Quiz