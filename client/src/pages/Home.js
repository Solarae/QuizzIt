import React, { useState, useEffect } from 'react'
import { Row, Col, Dropdown, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import PlatformCard from '../components/Home/PlatformCard'
import QuizCardMini from '../components/Cards/QuizCardMini'
import MiniLeaderboard from '../components/Leaderboards/MiniLeaderboard'

import { searchPlatform, searchQuiz } from '../actions/searchActions.js'

function Home() {
    const dispatch = useDispatch()
    const platforms = useSelector((state) => state.search.platforms)
    const quizzes = useSelector((state) => state.search.quizzes)

    const isSearchPlatformLoading = useSelector((state) => state.search.isSearchPlatformLoading);
    const isSearchQuizLoading = useSelector((state) => state.search.isSearchQuizLoading);

    const maxLimit = 16 // max number of platforms or quizzes to show

    const [platformLimit, setPlatformLimit] = useState(9) // how many platforms to query 
    const showMorePlatforms = () => {
        setPlatformLimit(platformLimit + 4)
    }

    const [quizLimit, setQuizLimit] = useState(9) // how many quizzes to query 
    const showMoreQuizzes = () => {
        setQuizLimit(quizLimit + 4)
    }

    // dispatch the SEARCH request
    useEffect(() => {
        console.log("searching");

        dispatch(searchPlatform({
            query: { 'sort': "likes.totalLikes desc" },
            page: 1,
            limit: platformLimit
        }))

        dispatch(searchQuiz({
            query: { 'sort': "likes.totalLikes desc" },
            page: 1,
            limit: quizLimit
        }))
    }, [platformLimit, quizLimit]);

    // if maxLimit is reached or not enough platforms can be queried then set limit to maxLimit
    useEffect(() => {
        if (platforms && platforms.length !== platformLimit) setPlatformLimit(maxLimit)
    }, [platforms]);

    // if maxLimit is reached or not enough quizzes can be queried then set limit to maxLimit
    useEffect(() => {
        if (quizzes && quizzes.length !== quizLimit) setQuizLimit(maxLimit)
    }, [quizzes]);
    

    if (isSearchPlatformLoading || isSearchQuizLoading || !platforms || !quizzes) {
        return (<div>Loading...</div>)
    }

    return (
        <div className="justify-content-between" >
            <div style={{ height: "10px" }}></div>

            <div >
                <div className="row">
                    <div className="col-9" style={{}}>
                        <Container>
                            <Row className="">
                                <h5><i class="bi bi-graph-up-arrow"></i>  Trending Platforms </h5>
                            </Row>

                            <Row xs={1} md={4} className="g-4 me-auto">
                                {platforms.slice(0, platformLimit - 1).map((p, idx) => (

                                    <Col align="center">
                                        <PlatformCard platform={p}></PlatformCard>
                                    </Col>
                                ))}
                            </Row>
                            <Row>
                                {platformLimit !== maxLimit && <Button variant="outline-light" onClick={showMorePlatforms} style={{ color: "black", marginTop: "10px" }}>View More</Button>}
                            </Row>

                            <hr />

                            <Row className="">
                                <h5><i class="bi bi-graph-up-arrow"></i>  Trending Quizzes</h5>
                            </Row>
                            <Row xs={1} md={4} className="g-4 me-auto">
                                {quizzes.slice(0, quizLimit - 1).map((q, idx) => (

                                    <Col align="center">
                                        <QuizCardMini quiz={q}></QuizCardMini>
                                    </Col>
                                ))}
                            </Row>
                            <Row >
                                {quizLimit !== maxLimit && <Button variant="outline-light" onClick={showMoreQuizzes} style={{ color: "black", marginTop: "10px" }}>View More</Button>}
                            </Row>
                        </Container>


                    </div>
                    <div className="col" style={{}}>
                        <Row>
                            <Col align="center">
                                <h3 >Global Leaderboard</h3>
                            </Col>
                        </Row>
                        <MiniLeaderboard lbType="global" doc={platforms[0]}></MiniLeaderboard>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Home
