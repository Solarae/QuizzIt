import React, { useState, useEffect } from 'react'
import { Image, Button, Row, Table, Nav, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPlatformLeaderboard } from '../../actions/platformActions';

function MiniLeaderboard() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [type, setType] = useState("daily")
    const { id } = useParams();  
    const types = [ { queryStr: 'daily', type: 'Daily' }, { queryStr: 'weekly', type: 'Weekly' },
                    { queryStr: 'monthly', type: 'Monthly' }, { queryStr: 'year', type: 'Yearly' },
                    { queryStr: 'allTime', type: 'All Time' } ]
                    
    const { isGetPlatLeaderboardLoading, leaderboard, errors } = useSelector((state) => state.platforms);
   
    useEffect(() => {
        dispatch(getPlatformLeaderboard(
            id,
            { type,
            offset: 0,
            limit: 10,
            }
        ))
    }, [type, dispatch]);

    const routeToLeaderboardPage = () => history.push(`/platform/${id}/leaderboard`)

    if (isGetPlatLeaderboardLoading) {
        return (<div>Loading...</div>)
    }

    return (
        <div className="position-relative container justify-content-center" style={{ marginTop: "13px", marginRight: "100px" }}>
            <Row>
                <Nav fill variant="tabs">
                    {types.map((t) => 
                        <Nav.Item>
                            <Nav.Link onClick={() => setType(t.queryStr)} disabled={type === "daily"}>{t.type}</Nav.Link>
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
    )
}
export default MiniLeaderboard;
