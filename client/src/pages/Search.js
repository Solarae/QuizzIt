import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import PlatformCard from '../components/Search/PlatformCard.js'
import QuizCard from '../components/Search/QuizCard'

function Search() {

    if (false) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="justify-content-between">
            <div >
                {/* <h2 className='text-center m-3'>Search page</h2> */}
                <Container style={{ width: "80%", marginTop: "30px" }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="white" id="dropdown-basic" style={{fontSize: "1.4rem", marginBottom: "-20px"}}>
                            <i class="bi bi-filter"></i>Filter
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="">Platforms</Dropdown.Item>
                            <Dropdown.Item href="">Quizzes</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <hr />

                    {/* Search results section below */}
                    <PlatformCard></PlatformCard>
                    <hr />
                    <QuizCard></QuizCard>
                </Container>
            </div>

        </div >
    )
}
export default Search;
