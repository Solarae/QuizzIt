import React, { useState, useEffect } from 'react'
import { Image, Button, Row, Col, Table, Nav, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function MiniLeaderboard({ doc, id, url, isGetLeaderboardLoading, leaderboard, errors, getLeaderboard }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [type, setType] = useState("daily")
    
    const types = [ { queryStr: 'daily', type: 'Daily' }, { queryStr: 'weekly', type: 'Weekly' },
                    { queryStr: 'monthly', type: 'Monthly' }, { queryStr: 'year', type: 'Yearly' },
                    { queryStr: 'allTime', type: 'All Time' } ]
   
    useEffect(() => {
        dispatch(getLeaderboard(
            {
                id,
                query: { 
                    type,
                    offset: 0,
                    limit: 10,
                }
        }))
    }, [type, dispatch]);

    const routeToLeaderboardPage = () => history.push(url)

    if (isGetLeaderboardLoading) {
        return (<div>Loading...</div>)
    }

    if (errors)
        return (Object.values(errors).map(v => ( <div key={v}>{v}</div>)))

    return (
        <div className="col" style={{}}>
            <Row>
                <Col align="center">
                    <h3 >{`${doc} Leaderboard`}</h3>
                </Col>
            </Row>
            <div className="position-relative container justify-content-center" style={{ marginTop: "13px", marginRight: "100px" }}>
            <Row>
                <Nav fill variant="tabs">
                    {types.map((t) => 
                        <Nav.Item>
                            <Nav.Link onClick={() => setType(t.queryStr)} disabled={type === t.queryStr}>{t.type}</Nav.Link>
                        </Nav.Item>
                    )}
                </Nav>
                <br />
            </Row>

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
                            <tr>
                                <td>{index + 1}</td>
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
            <Row>
                <Button variant="primary" size="sm" onClick={routeToLeaderboardPage}>
                    View Leaderboard
                </Button>
            </Row>

            </div>
        </div>

    )
}
export default MiniLeaderboard;
