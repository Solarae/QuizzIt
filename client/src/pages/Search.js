import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import PlatformCard from '../components/Search/PlatformCard.js'
import QuizCard from '../components/Search/QuizCard'

import { searchPlatform, searchQuiz } from '../actions/searchActions.js'

function Search() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const auth = useSelector((state) => state.auth)

    const platforms = useSelector((state) => state.search.platforms)
    const quizzes = useSelector((state) => state.search.quizzes)
    const isSearchPlatformLoading = useSelector((state) => state.search.isSearchPlatformLoading);
    const isSearchQuizLoading = useSelector((state) => state.search.isSearchQuizLoading);

    const location_search = useLocation().search;
    const query = new URLSearchParams(location_search).get('query');

    const [filter, setFilter] = useState({
        platform: true,
        quiz: true
    });

    // dispatch the SEARCH_PLATFORM request
    useEffect(() => {
        console.log("searching");
        dispatch(searchPlatform({
            query: { 'name': query }
        }))

        dispatch(searchQuiz({
            query: { 'name': query }
        }))
    }, [query, filter, dispatch]);

    if (isSearchPlatformLoading || isSearchQuizLoading) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="justify-content-between">
            <div >
                {/* <h2 className='text-center m-3'>Search page</h2> */}
                <Container style={{ width: "80%", marginTop: "30px" }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ fontSize: "1.4rem", marginBottom: "-20px" }}>
                            <i class="bi bi-filter"></i>Filter
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="">Platforms</Dropdown.Item>
                            <Dropdown.Item href="">Quizzes</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <hr />

                    {/* Search results section below */}
                    <h3>Platforms</h3>
                    {filter.platform && platforms && platforms.length>0 ?
                        platforms.map((p, idx) => (
                            <PlatformCard platform={p}></PlatformCard>
                        ))
                        :
                        <p>No Platform Results</p>
                    }
                    <hr />
                    <h3>Quizzes</h3>
                    {filter.quiz && quizzes && quizzes.length>0 ?
                        quizzes.map((q, idx) => (
                            <QuizCard quiz={q}></QuizCard>
                        ))
                        :
                        <p>No Quiz Results</p>
                    }
                </Container>
            </div>

        </div >
    )
}
export default Search;
