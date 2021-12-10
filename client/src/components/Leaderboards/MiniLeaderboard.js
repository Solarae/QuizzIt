import React, { useState, useEffect } from 'react'
import { Image, Button, Row, Table, Nav, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPlatformLeaderboard } from '../../actions/platformActions';

function MiniLeaderboard({ lbType, doc }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [type, setType] = useState("daily")
    const { isGetPlatLeaderboardLoading, leaderboard, errors } = useSelector((state) => state.platforms);
   
    useEffect(() => {
        console.log("CALLING API")
        if (lbType === "platform" || lbType === "global") {
            dispatch(getPlatformLeaderboard(
                doc._id,
                { type,
                offset: 0,
                limit: 10,
                }
            ))
        }
    }, [type, dispatch]);

    const routeToLeaderboardPage = () => {
        if (lbType === "global") {
            history.push("/leaderboard/global")
        }
        else if (lbType === "platform") {
            history.push(`/platform/${doc._id}/leaderboard`)
        }
        else if (lbType === "quiz") {
            history.push(`/platform/${doc.platformId}/quiz/${doc._id}/leaderboard`)
        }
    }

    if (isGetPlatLeaderboardLoading) {
        return (<div>Loading...</div>)
    }

    

    return (
        <div className="position-relative container justify-content-center" style={{ marginTop: "13px", marginRight: "100px" }}>
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
