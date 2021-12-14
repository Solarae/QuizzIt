import { React, useEffect, useState } from 'react'
import { Container, Col, Table, Button, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import Banner from '../components/Quiz/Banner'
import { getQuiz, getQuizLeaderboard } from '../actions/quizActions'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import MiniLeaderboard from '../components/Leaderboards/MiniLeaderboard.js'
import Loading from '../components/Loading'


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

    const { isGetQuizLeaderboardLoading, leaderboard, errors } = useSelector((state) => state.quiz)

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
        dispatch(getQuiz(qid, {
            expand: 'platformId(select=name,owner,icon,banner,subscribers)'
        }))
    }, [dispatch, qid])

    if (isLoading) {
        return (<Loading />)
    }

    const handleTakeQuiz = () => {
        if (user) {
        history.push(`/platform/${id}/quiz/${quiz._id}/take`)
        } else {
            handleShowSignIn()
        }
    }
    const handleViewSubmission = () => {
        history.push(`/viewQuizSubmission/${quiz._id}`)
    }

    return (
        <>
            <Banner isEdit={false}></Banner>

            <div style={{ height: "10vh" }}></div>
            <Container>
                <Row style={{marginBottom: '2vw'}}>
                    <Col align='center'>
                        <h3>Description</h3>
                        <p className='text-muted' style={{ wordBreak: 'break-all', whiteSpace: 'normal' }}>
                            {quiz.description}
                        </p>
                        <hr />
                        <h4>Quiz Rules</h4>
                        <Table striped bordered hover style={{ width: '50%' }}>
                            <tr>
                            </tr>
                            <tr>
                                <th>Time</th>
                                <th>{quiz.time} min</th>
                            </tr>
                            <tr>
                                <th>Number of Questions</th>
                                {/* {console.log(quiz)} */}
                                <th>{quiz.questions.length}</th>
                            </tr>
                        </Table>

                        <br />

                        <div className="d-grid gap-1" style={{ width: "50%" }}>
                            <Button variant="outline-primary btn-lg" style={{ marginLeft: "10px" }} onClick={handleTakeQuiz}>Take Quiz</Button>
                            <Button variant="primary btn-lg" style={{ marginLeft: "10px" }} onClick={handleViewSubmission}>View My Submissions</Button>
                        </div>
                    </Col>
                </Row>
                <hr />
                <Row >
                    <Col style={{marginTop:'2vw'}}>
                        <MiniLeaderboard {...leaderboardProps}></MiniLeaderboard>
                    </Col>
                </Row>
            </Container>

            <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} />
            <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
        </>
    )
}

export default Quiz