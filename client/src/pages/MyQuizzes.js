import React, { useState, useEffect } from 'react'
import { Image, Dropdown, Row, Col, Table, Nav, Button, Form, FormControl, Card, NavItem } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import Pagination from '../components/Pagination'
import { useLocation, useHistory } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { searchQuiz } from '../actions/searchActions'

function MyQuizzes() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { search } = useLocation()
    const searchParams = new URLSearchParams(search)
    const page = parseInt(searchParams.get('page')) || 1
    const url = "/myQuizzes"
    const filter = searchParams.get('filter') || ''

    const { user } = useSelector((state) => state.auth)
    const { isSearchQuizLoading, quizzes, quizPages, totalCount, errors } = useSelector((state) => state.search) 

    const setPage = (page) => {
        history.push(`${url}?filter=${filter}&page=${page}`)}
    
    useEffect(() => {
        console.log(page)
        console.log(typeof page)
        var query = (filter === 'draft' || filter === 'published') ? {
            userId: user.id,
            status: filter
        } : {
            userId: user.id,
        }
        
        dispatch(searchQuiz({
            query,
            page,
            limit: 10
        }))
        
    }, [search, dispatch]);

    if (isSearchQuizLoading) {
        return (<div>Loading...</div>)
    }

    if (errors)
        return (Object.values(errors).map(v => ( <div key={v}>{v}</div>)))
    
        return (
            <div className="position-relative container justify-content-center" style={{ marginTop: "13px", marginRight: "100px" }}>
                <Dropdown className="ms-auto">
                                <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ fontSize: "1.4rem", marginBottom: "-20px" }}>
                                    <i class="bi bi-filter"></i>Filter
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="" onClick={() => history.push(`${url}?filter=&page=${page}`)}>No Filter {filter === '' && <i class="bi bi-check"></i>}</Dropdown.Item>
                                    <Dropdown.Item href="" onClick={() => history.push(`${url}?filter=draft&page=${page}`)}>Draft {filter === 'Draft' && <i class="bi bi-check"></i>}</Dropdown.Item>
                                    <Dropdown.Item href="" onClick={() => history.push(`${url}?filter=published&page=${page}`)}>Published {filter === 'Published' && <i class="bi bi-check"></i>}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                <Row style={{ marginTop: "10px" }}>
                    <Table hover>
                    <thead>
                        <tr>
                            <th>Quiz Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                        <tbody>
                            {quizzes?.map((q) =>
                                <tr>
                                    <td>
                                        {q.name}
                                    </td>
                                    <td>
                                        {q.status}
                                    </td>
                                    
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row>
    
                <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Col>
                        <Pagination page={page} pages={quizPages} changePage={setPage} />
                    </Col>
                </Row>
    
            </div>
        )
}
export default MyQuizzes;
