import React, { useState, useEffect } from 'react'
import { Row, Col, Dropdown, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import PlatformCard from '../components/Home/PlatformCard'
import QuizCard from '../components/Home/QuizCard'
import MiniLeaderboard from '../components/Platform/MiniLeaderboard'

import { searchPlatform, searchQuiz } from '../actions/searchActions.js'

function Home() {
    const dispatch = useDispatch()
    const platforms = useSelector((state) => state.search.platforms)
    const quizzes = useSelector((state) => state.search.quizzes)

    const isSearchPlatformLoading = useSelector((state) => state.search.isSearchPlatformLoading);
    const isSearchQuizLoading = useSelector((state) => state.search.isSearchQuizLoading);

    const query = ""
    
    // dispatch the SEARCH request
    useEffect(() => {
        console.log("searching");

        dispatch(searchPlatform({
            query: { 'name': query }
        }))

        dispatch(searchQuiz({
            query: { 'name': query }
        }))
    }, []);

    if (isSearchPlatformLoading || isSearchQuizLoading || !platforms || !quizzes) {
        return (<div>Loading...</div>)
    }

    return (
        <div className="justify-content-between" >
            <div style={{ height: "10px" }}></div>

            <div >
                <div className="row">
                    <div className="col-9" style={{  }}>
                        <Container>
                            <Row className="">
                                <h5><i class="bi bi-graph-up-arrow"></i>  Trending Platforms </h5>
                            </Row>

                            <Row xs={1} md={4} className="g-4 me-auto">
                                {platforms.map((p, idx) => (

                                    <Col align="center">
                                        <PlatformCard platform={p}></PlatformCard>
                                    </Col>
                                ))}
                            </Row>

                            <hr />

                            <Row className="">
                                <h5><i class="bi bi-graph-up-arrow"></i>  Trending Quizzes</h5>
                            </Row>
                            <Row xs={1} md={4} className="g-4 me-auto">
                                {quizzes.map((q, idx) => (

                                    <Col align="center">
                                        <QuizCard quiz={q}></QuizCard>
                                    </Col>
                                ))}
                            </Row>
                        </Container>


                    </div>
                    <div className="col" style={{}}>
                        <MiniLeaderboard platform={platforms[0]}></MiniLeaderboard>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Home
