import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Dropdown, Pagination } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import PlatformCard from '../components/Search/PlatformCard.js'
import QuizCard from '../components/Search/QuizCard'
import UserCard from '../components/Search/UserCard'

import { searchPlatform, searchQuiz, searchUser } from '../actions/searchActions.js'
import {
    RESET_MAX_PAGES
} from '../actions/types'

function Search() {
    const dispatch = useDispatch()

    // Get the search results from redux store
    const platforms = useSelector((state) => state.search.platforms)
    const quizzes = useSelector((state) => state.search.quizzes)
    const users = useSelector((state) => state.search.users)

    const platformPages = useSelector((state) => state.search.platformPages)
    const quizPages = useSelector((state) => state.search.quizPages)
    const userPages = useSelector((state) => state.search.userPages)
    const maxPages = Math.max(platformPages, quizPages, userPages)

    const isSearchPlatformLoading = useSelector((state) => state.search.isSearchPlatformLoading);
    const isSearchQuizLoading = useSelector((state) => state.search.isSearchQuizLoading);
    const isSearchUserLoading = useSelector((state) => state.search.isSearchUserLoading);

    const location_search = useLocation().search;
    const query = new URLSearchParams(location_search).get('query');

    // available filters (none, platform, quiz, user)
    const [filter, setFilter] = useState("quiz");

    // available sorts (oldest, newest)
    const [sort, setSort] = useState("oldest");

    const [page, setPage] = useState(1);
    
    // dispatch the SEARCH request
    useEffect(() => {
        console.log("searching");
        const sortQuery = sort==="oldest" ? "_id asc" : "_id desc"

        if (filter === "none" || filter === "platform") {
            dispatch(searchPlatform({
                query: { 'name': query, 'sort': sortQuery },
                page: page,
                limit: 4
            }))
        }

        if (filter === "none" || filter === "quiz") {
            dispatch(searchQuiz({
                query: { 'name': query, 'sort': sortQuery },
                page: page,
                limit: 4
            }))
        }

        if (filter === "none" || filter === "user") {
            dispatch(searchUser({
                query: { 'username': query, 'sort': sortQuery },
                page: page,
                limit: 4
            }))
        }
    }, [query, filter, sort, page, dispatch]);

    // reset the page and max pages when query or filter changes
    useEffect(() => {
        dispatch({
            type: RESET_MAX_PAGES
        })
        setPage(1)
    }, [query, filter, dispatch]);


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
                        platforms.map((p, idx) => (
                            <PlatformCard platform={p}></PlatformCard>
                        ))
                        :
                        ((filter === "platform" || filter === "none") && <p>No Platform Results</p>)
                    }

                    {/* Search results for quizzes */}
                    {filter === "none" && <hr />}
                    {(filter === "quiz" || filter === "none") && <h3>Quizzes</h3>}
                    {(filter === "quiz" || filter === "none") && quizzes && quizzes.length > 0 ?
                        quizzes.map((q, idx) => (
                            <QuizCard quiz={q}></QuizCard>
                        ))
                        :
                        ((filter === "quiz" || filter === "none") && <p>No Quiz Results</p>)
                    }

                    {/* Search results for users */}
                    {filter === "none" && <hr />}
                    {(filter === "user" || filter === "none") && <h3>Users</h3>}
                    {(filter === "user" || filter === "none") && users && users.length > 0 ?
                        users.map((user, idx) => (
                            <UserCard user={user}></UserCard>
                        ))
                        :
                        ((filter === "user" || filter === "none") && <p>No User Results</p>)
                    }

                    <Row style={{ marginTop: "40px", marginBottom: "80px" }}>
                        <Col className="d-flex justify-content-center" >
                            <Pagination >
                                <Pagination.Prev disabled={page === 1} onClick={() => { setPage(page - 1) }} />
                                {Array.from({ length: maxPages }).map((_, i) => (
                                    <Pagination.Item onClick={() => setPage(i + 1)} key={i + 1} active={page === i + 1}>
                                        {i + 1}
                                    </Pagination.Item>
                                ))}

                                <Pagination.Next disabled={page === maxPages} onClick={() => { setPage(page + 1) }} />
                            </Pagination>
                        </Col>
                    </Row>
                </Container>
            </div>

        </div >
    )
}
export default Search;
