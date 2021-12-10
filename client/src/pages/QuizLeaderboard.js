import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Banner from '../components/Quiz/Banner.js'
import Leaderboard from '../components/Quiz/Leaderboard.js'
import { getQuiz } from '../actions/quizActions'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function QuizLeaderboard() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const quiz = useSelector((state) => state.quiz.quiz)
    const isLoading = useSelector((state) => state.quiz.isLoading);

    let { qid } = useParams(); 
    let { id } = useParams();
    useEffect(() => {
        dispatch(getQuiz(qid))
    }, [qid, dispatch]);

    if (isLoading || !quiz) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="justify-content-between">
            {Object.keys(quiz).length !== 0 ? <Banner platform={platform} ></Banner> : <div></div>}
            <div style={{ height: "50px" }}></div>
            <Container>
                <p style={{ cursor: 'pointer', }} onClick={() => { history.push(`/platform/${id}/quiz/${qid}`) }}><i class="bi bi-arrow-left"></i> Back to Quiz Page</p>
                <Leaderboard></Leaderboard>
            </Container >
        </div >
    )
}
export default QuizLeaderboard;
