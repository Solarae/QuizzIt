import React, { useState, useEffect } from 'react'
import { Image, Row, Col, Table, Nav, Button, Form, FormControl, Card, NavItem } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import Pagination from '../Pagination'
import { useLocation, useHistory } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { getQuizzes } from '../actions/searchActions'

function MyQuizzes() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { search } = useLocation()
    const searchParams = new URLSearchParams(search)
    const page = parseInt(searchParams.get('page')) || 1

    const filter = searchParams.get('filter') || ''

    const { user } = useSelector((state) => state.auth)

    const setPage = (page) => {
        history.push(`${url}?filter=${filter}&page=${page}`)}
    
    useEffect(() => {
        var query = (filter === 'draft' || filter === 'published') ? {
            userId: user.id,
            status: 'Draft',
            offset: 10 * (page - 1),
            limit: 10,
        } : {
            userId: user.id,
            offset: 10 * (page - 1),
            limit: 10
        }
        
        dispatch(getLeaderboard({
            id,
            query
        }))
        
    }, [search, dispatch]);

    if (isGetLeaderboardLoading) {
        return (<div>Loading...</div>)
    }

    if (errors)
        return (Object.values(errors).map(v => ( <div key={v}>{v}</div>)))
    
    return (
        <div className="position-relative container justify-content-center" style={{ marginTop: "13px", marginRight: "100px" }}>
            <Row>
                <Col align="center">
                    <h3>{`${doc} Leaderboard`}</h3>
                </Col>
                <Col>
                <Form className="d-flex me-auto" style={{ marginLeft: "2%", width: "30%" }} onSubmit={handleSearch}>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        value={queryName}
                        className="me-2"
                        aria-label="Search"
                        onChange={onQueryChange}
                    />
                    <i class="bi bi-search" onClick={handleSearch} style={{ color: "black", fontSize: "1.5rem", marginLeft: "2px", marginTop: "2px", cursor: "pointer" }} ></i>
        </Form>
                </Col>
            </Row>
            <Row>
                <Nav fill variant="tabs"
                >   
                    {types.map((t) => 
                        <Nav.Item key={t.queryStr}>
                            <LinkContainer to={`${url}?type=${t.queryStr}&filter=${filter}`}><Nav.Link>{t.type}</Nav.Link></LinkContainer>
                        </Nav.Item>
                    )}
                </Nav>
                <br />
            </Row>
            <Row><Button onClick={() => history.push(`${url}?type=${type}&filter=friends`)}>Friends Only</Button></Row>
            <Row style={{ marginTop: "10px" }}>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((rank, index) =>
                            <tr key={rank._id}>
                                <td>{name === '' ? (page - 1) * 10 + index + 1 : (apiPage - 1) * 10 + index +1}</td>
                                <td>
                                    {rank.username}
                                </td>
                                <td>
                                    {rank.points}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>

            <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Col>
                    <Pagination page={name === '' ? page : apiPage} pages={pages} changePage={setPage} />
                </Col>
            </Row>

        </div>
    )
}
export default MyQuizzes;
