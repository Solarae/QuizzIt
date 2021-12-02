import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Dropdown, Pagination } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import PlatformCard from '../components/Search/PlatformCard.js'
import QuizCard from '../components/Search/QuizCard'
import UserCard from '../components/Search/UserCard'

import { searchPlatform, searchQuiz, searchUser } from '../actions/searchActions.js'

import mongoose from 'mongoose'

function Search() {
    const dispatch = useDispatch()

    // Get the search results from redux store
    const platforms = useSelector((state) => state.search.platforms)
    const quizzes = useSelector((state) => state.search.quizzes)
    const users = useSelector((state) => state.search.users)

    const isSearchPlatformLoading = useSelector((state) => state.search.isSearchPlatformLoading);
    const isSearchQuizLoading = useSelector((state) => state.search.isSearchQuizLoading);
    const isSearchUserLoading = useSelector((state) => state.search.isSearchUserLoading);

    const location_search = useLocation().search;
    const query = new URLSearchParams(location_search).get('query');

    // available filters (none, platform, quiz, user)
    const [filter, setFilter] = useState("quiz");

    // available sorts (oldest, newest)
    const [sort, setSort] = useState("oldest");

    // dispatch the SEARCH request
    useEffect(() => {
        console.log("searching");

        if (filter === "none" || filter === "platform") {
            dispatch(searchPlatform({
                query: { 'name': query }
            }))
        }

        if (filter === "none" || filter === "quiz") {
            dispatch(searchQuiz({
                query: { 'name': query }
            }))
        }

        if (filter === "none" || filter === "user") {
            dispatch(searchUser({
                query: { 'username': query }
            }))
        }
    }, [query, filter, sort, dispatch]);

    // compares the creation time of mongodb documents a and b
    const compareDates = (a, b) => {
        if (sort === "oldest") {
            return mongoose.Types.ObjectId(a._id).getTimestamp() - mongoose.Types.ObjectId(b._id).getTimestamp()
        }
        else if (sort === "newest") {
            return mongoose.Types.ObjectId(b._id).getTimestamp() - mongoose.Types.ObjectId(a._id).getTimestamp()
        }
        else {
            return 0;
        }
    }


    if (isSearchPlatformLoading || isSearchQuizLoading || isSearchUserLoading) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="justify-content-between">
            <div >
                {/* <h2 className='text-center m-3'>Search page</h2> */}
                <Container style={{ width: "80%", marginTop: "30px" }}>
                    <Row>
                        <Col md={1}>
                            <Dropdown className="ms-auto">
                                <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ fontSize: "1.4rem", marginBottom: "-20px" }}>
                                    <i class="bi bi-filter"></i>Filter
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="" onClick={() => { setFilter("none") }}>No Filter {filter === "none" && <i class="bi bi-check"></i>}</Dropdown.Item>
                                    <Dropdown.Item href="" onClick={() => { setFilter("platform") }}>Platforms {filter === "platform" && <i class="bi bi-check"></i>}</Dropdown.Item>
                                    <Dropdown.Item href="" onClick={() => { setFilter("quiz") }}>Quizzes {filter === "quiz" && <i class="bi bi-check"></i>}</Dropdown.Item>
                                    <Dropdown.Item href="" onClick={() => { setFilter("user") }}>Users {filter === "user" && <i class="bi bi-check"></i>}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                        <Col md={1}>
                            <Dropdown >
                                <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ fontSize: "1.4rem", marginBottom: "-20px" }}>
                                    <i class="bi bi-arrow-down"></i>Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="" onClick={() => { setSort("oldest") }}>Oldest {sort === "oldest" && <i class="bi bi-check"></i>}</Dropdown.Item>
                                    <Dropdown.Item href="" onClick={() => { setSort("newest") }}>Newest {sort === "newest" && <i class="bi bi-check"></i>}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

                    <hr />

                    {/* Search results for platforms */}
                    {(filter === "platform" || filter === "none") && <h3>Platforms</h3>}
                    {(filter === "platform" || filter === "none") && platforms && platforms.length > 0 ?
                        platforms.sort(compareDates).map((p, idx) => (
                            <PlatformCard platform={p}></PlatformCard>
                        ))
                        :
                        ((filter === "platform" || filter === "none") && <p>No Platform Results</p>)
                    }

                    {/* Search results for quizzes */}
                    {filter === "none" && <hr />}
                    {(filter === "quiz" || filter === "none") && <h3>Quizzes</h3>}
                    {(filter === "quiz" || filter === "none") && quizzes && quizzes.length > 0 ?
                        quizzes.sort(compareDates).map((q, idx) => (
                            <QuizCard quiz={q}></QuizCard>
                        ))
                        :
                        ((filter === "quiz" || filter === "none") && <p>No Quiz Results</p>)
                    }
                    
                    {/* Search results for users */}
                    {filter === "none" && <hr />}
                    {(filter === "user" || filter === "none") && <h3>Users</h3>}
                    {(filter === "user" || filter === "none") && users && users.length > 0 ?
                        users.sort(compareDates).map((user, idx) => (
                            <UserCard user={user}></UserCard>
                        ))
                        :
                        ((filter === "user" || filter === "none") && <p>No User Results</p>)
                    }
                </Container>
            </div>

        </div >
    )
}
export default Search;
