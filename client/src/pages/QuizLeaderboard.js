import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Nav, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Banner from '../components/Quiz/Banner.js'
import Leaderboard from '../components/Quiz/Leaderboard.js'
import { getQuiz } from '../actions/quizActions'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function QuizLeaderboard() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const auth = useSelector((state) => state.auth)
    const quiz = useSelector((state) => state.quiz.quiz)
    const isLoading = useSelector((state) => state.quiz.isLoading);

    let { qid } = useParams(); 
    let { id } = useParams();
    useEffect(() => {
        dispatch(getQuiz({
            id: qid
        }))
    }, [qid, dispatch]);

    if (isLoading || !quiz) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="justify-content-between">
            {/* {Object.keys(platform).length !== 0 ? <Banner platform={platform} ></Banner> : <div></div>} */}
            <Banner></Banner>

            <div style={{ height: "10vh" }}></div>

            <Container>
                <p style={{ cursor: 'pointer', }} onClick={() => {history.push(`/platform/${id}/quiz/${qid}`)}}><i class="bi bi-arrow-left"></i> Back to quiz page</p>
                <Row style={{}}>
                    <Col className="justify-content-md-center" style={{}}>
                        <Leaderboard quiz={quiz}></Leaderboard>
                    </Col>
                </Row>
            </Container >

        </div>
    )
}
export default QuizLeaderboard;
