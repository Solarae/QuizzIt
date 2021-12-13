import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Banner from '../components/Quiz/Banner.js'
import Leaderboard from '../components/Leaderboards/Leaderboard.js'
import { getQuiz, getQuizLeaderboard, searchLeaderboard } from '../actions/quizActions'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function QuizLeaderboard() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const quiz = useSelector((state) => state.quiz.quiz)
    const isLoading = useSelector((state) => state.quiz.isLoading);

    const { isGetQuizLeaderboardLoading, leaderboard, leaderboardPage, leaderboardPages, errors } = useSelector((state) => state.quiz);

    const { id, qid} = useParams();  // get the platform ID from the url
    const url = `/platform/${id}/quiz/${qid}/leaderboard`

    const leaderboardProps = {
        doc: 'Quiz',
        id: qid,
        url,
        isGetLeaderboardLoading: isGetQuizLeaderboardLoading,
        leaderboard,
        apiPage: leaderboardPage,
        pages: leaderboardPages,
        errors,
        searchLeaderboard,
        getLeaderboard: getQuizLeaderboard
    }
    useEffect(() => {
        dispatch(getQuiz(qid))
    }, [qid, dispatch]);

    if (isLoading || !quiz) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="justify-content-between">
            {Object.keys(quiz).length !== 0 ? <Banner isEdit={false} ></Banner> : <div></div>}
            <div style={{ height: "50px" }}></div>
            <Container>
                <p style={{ cursor: 'pointer', }} onClick={() => { history.push(`/platform/${id}/quiz/${qid}`) }}><i class="bi bi-arrow-left"></i> Back to Quiz Page</p>
                <Leaderboard {...leaderboardProps}></Leaderboard>
            </Container >
        </div >
    )
}
export default QuizLeaderboard;
