import React, { useState, useEffect } from 'react'
import { Image, Row, Col, Table, Nav, Button, Form, FormControl, Card, NavItem } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import Pagination from '../Pagination'
import { useLocation, useHistory } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import Loading from '../Loading'

function Leaderboard({ doc, id, url, isGetLeaderboardLoading, leaderboard, apiPage, pages, errors, searchLeaderboard, getLeaderboard }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { search } = useLocation()
    const searchParams = new URLSearchParams(search)
    const page = parseInt(searchParams.get('page')) || 1

    const types = [ { queryStr: 'daily', type: 'Daily' }, { queryStr: 'weekly', type: 'Weekly' },
                    { queryStr: 'monthly', type: 'Monthly' }, { queryStr: 'year', type: 'Yearly' },
                    { queryStr: 'allTime', type: 'All Time' } ]
    const type = searchParams.get('type') || "daily"
    const filter = searchParams.get('filter') || ''

    const { user } = useSelector((state) => state.auth)

    const name = searchParams.get('userName')
    const [queryName, setQueryName] = useState(searchParams.get('userName') || '');
    const onQueryChange = (e) => setQueryName(e.target.value)
    const handleSearch = (e) => {
        e.preventDefault()
        history.push(`${url}?type=${type}&userName=${queryName}`)
    }

    const setPage = (page) => {
        console.log(page)
        history.push(`${url}?type=${type}&filter=${filter}&page=${page}`)}
    
    useEffect(() => {
        if (name) {
            dispatch(searchLeaderboard({
                id, 
                query: { type, name }
            }))
        } else {
            var query = filter === 'friends' && user ? {
                type,
                userId: user.id,
                offset: 10 * (page - 1),
                limit: 10,
            } : {
                type,
                offset: 10 * (page - 1),
                limit: 10
            }
            
            dispatch(getLeaderboard({
                id,
                query
            }))
        }
        
    }, [user, search, dispatch]);

    if (isGetLeaderboardLoading) {
        return (<Loading />)
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

    // const dispatch = useDispatch()
    // const history = useHistory()
    // let { id } = useParams();  // get the platform ID and quiz ID from the url
    
    // const { search } = useLocation()
    // const searchParams = new URLSearchParams(search);
    // for (let p of searchParams) {
    //     console.log(p)
    // }
    
    // const { isGetPlatLeaderboardLoading, leaderboard, errors } = useSelector((state) => state.platforms);
    
    // const types = [ { queryStr: 'daily', type: 'Daily' }, { queryStr: 'weekly', type: 'Weekly' },
    //                 { queryStr: 'monthly', type: 'Monthly' }, { queryStr: 'year', type: 'Yearly' },
    //                 { queryStr: 'allTime', type: 'All Time' } ]
    // const type = searchParams.get('type') || "daily"
    // const filter = searchParams.get('filter') || ''
    
    // const page = parseInt(searchParams.get('page')) || -1
    // const { user } = useSelector((state) => state.auth)
    // const apiPage = useSelector((state) => state.platforms.leaderboardPage)
    // const pages = useSelector((state) => state.platforms.leaderboardPages)
    // const setPage = (page) => {
    //     console.log(page)
    //     history.push(`/platform/${id}/leaderboard?type=${type}&filter=${filter}&page=${page}`)
    // }
    
    // console.log(searchParams.get('userName') || '')
    // const [name, setQueryName] = useState(searchParams.get('userName') || '');
    // console.log(name)
    // const onQueryChange = (e) => setQueryName(e.target.value)
    // const handleSearch = (e) => {
    //     history.push(`/platform/${id}/leaderboard?type=${type}&userName=${name}`)
    // }

    // useEffect(() => {
    //     console.log("Calling useeffect")
    //     console.log(window.location.href)
    //     if (name !== '') {
    //         dispatch(searchLeaderboard(id, { type, name }))
    //     } else {
    //         var query = filter === 'friends' && user ? {
    //             type,
    //             userId: user.id,
    //             offset: 10 * (page - 1),
    //             limit: 10,
    //         } : {
    //             type,
    //             offset: 10 * (page - 1),
    //             limit: 10
    //         }
    //         console.log(query)
    //         dispatch(getPlatformLeaderboard(
    //             id,
    //             query
    //         ))
    //     }
        
    // }, [user, useLocation().search, dispatch]);
    
    // if (isGetPlatLeaderboardLoading) {
    //     return (<div>Loading...</div>)
    // }

    // if (errors)
    //     return (Object.values(errors).map(v => ( <div key={v}>{v}</div>)))
    
    // return (
    //     <div className="position-relative container justify-content-center" style={{ marginTop: "13px", marginRight: "100px" }}>
    //         <Row>
    //             <Col align="center">
    //                 <h3 >Platform Leaderboard</h3>
    //             </Col>
    //             <Col>
    //             <Form className="d-flex me-auto" style={{ marginLeft: "2%", width: "30%" }} onSubmit={handleSearch}>
    //                 <FormControl
    //                     type="search"
    //                     placeholder="Search"
    //                     className="me-2"
    //                     aria-label="Search"
    //                     onChange={onQueryChange}
    //                 />
    //                 <i class="bi bi-search" onClick={handleSearch} style={{ color: "black", fontSize: "1.5rem", marginLeft: "2px", marginTop: "2px", cursor: "pointer" }} ></i>
    //     </Form>
    //             </Col>
    //         </Row>
    //         <Row>
    //             <Nav fill variant="tabs"
    //             >   
    //                 {types.map((t) => 
    //                     <Nav.Item>
    //                         <LinkContainer to={`/platform/${id}/leaderboard?type=${t.queryStr}&filter=${filter}`}><Nav.Link>{t.type}</Nav.Link></LinkContainer>
    //                     </Nav.Item>
    //                 )}
    //             </Nav>
    //             <br />
    //         </Row>
    //         <Row><Button onClick={() => history.push(`/platform/${id}/leaderboard?type=${type}&filter=friends`)}>Friends Only</Button></Row>
    //         <Row style={{ marginTop: "10px" }}>
    //             <Table hover>
    //                 <thead>
    //                     <tr>
    //                         <th>Rank</th>
    //                         <th>User</th>
    //                         <th>Points</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {leaderboard.map((rank, index) =>
    //                         <tr key={rank._id}>
    //                             <td>{name === '' ? (page - 1) * 10 + index + 1 : (apiPage - 1) * 10 + index +1}</td>
    //                             <td>
    //                                 {rank.username}
    //                             </td>
    //                             <td>
    //                                 {rank.points}
    //                             </td>
    //                         </tr>
    //                     )}
    //                 </tbody>
    //             </Table>
    //         </Row>

    //         <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
    //             <Col>
    //                 <Pagination page={name === '' ? page : apiPage} pages={pages} changePage={setPage} />
    //             </Col>
    //         </Row>

    //     </div>
    // )
}
export default Leaderboard;
