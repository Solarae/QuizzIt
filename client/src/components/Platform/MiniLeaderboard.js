import React, { useState, useEffect } from 'react'
import { Image, Button, Row, Table, Nav, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPlatformLeaderboard } from '../../actions/platformActions';

function MiniLeaderboard({ platform }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [type, setType] = useState("daily")
    const isGetPlatLeaderboardLoading = useSelector((state) => state.platforms.isGetPlatLeaderboardLoading);
    const leaderboard = useSelector((state) => state.platforms.leaderboard)

    useEffect(() => {
        console.log("CALLING API")
        dispatch(getPlatformLeaderboard(
            platform._id,
            type,
            1
        ))
    }, [type, dispatch]);
    
    if (isGetPlatLeaderboardLoading) {
        return (<div>Loading...</div>)
    }

    return (
        <div className="position-relative container justify-content-center" style={{ marginTop: "13px", marginRight: "100px" }}>
            <Row>
                <h3>Platform Leaderboard</h3>
            </Row>
            <Row>
            <Nav fill variant="tabs">
                <Nav.Item>
                    <Nav.Link onClick={() => setType("daily")} disabled={type === "daily"}>Daily</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => setType("weekly")} disabled={type === "weekly"} >Weekly</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => setType("monthly")} disabled={type === "monthly"}>Monthly</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => setType("yearly")} disabled={type === "yearly"}>Yearly</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => setType("allTime")} disabled={type === "allTime"}>
                        All
                    </Nav.Link>
                </Nav.Item>
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
                                <td>{index + 1 }</td>
                                <td>
                                    {rank.userId.username}
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
                <Button variant="primary" size="sm" onClick={() => { history.push(`/platform/${platform._id}/leaderboard`) }}>
                    View Leaderboard
                </Button>
            </Row>

        </div>
    )
}
export default MiniLeaderboard;
