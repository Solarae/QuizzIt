import React, { useState, useEffect } from 'react'
import { Image, Row, Col, Table, Nav, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { getPlatformLeaderboard } from '../../actions/platformActions';
import Pagination from '../Pagination'
import { useParams } from 'react-router-dom'

function Leaderboard() {
    const dispatch = useDispatch()
    let { id, qid } = useParams();  // get the platform ID and quiz ID from the url
    const [type, setType] = useState("daily")
    const isGetPlatLeaderboardLoading = useSelector((state) => state.platforms.isGetPlatLeaderboardLoading);
    const leaderboard = useSelector((state) => state.platforms.leaderboard)
    const pages = useSelector((state) => state.platforms.leaderboardPages)
    const [page, setPage] = useState(1)

    console.log(pages)
    useEffect(() => {
        console.log("CALLING API")
        dispatch(getPlatformLeaderboard(
            id,
            type,
            page
        ))
    }, [page, type, dispatch]);
    
    if (isGetPlatLeaderboardLoading) {
        return (<div>Loading...</div>)
    }
    
    return (
        <div className="position-relative container justify-content-center" style={{ marginTop: "13px", marginRight: "100px" }}>
            <Row>
                <Nav fill variant="tabs"
                >
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
                        <Nav.Link onClick={() => setType("biannual")} disabled={type === "biannual"}>6mo</Nav.Link>
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
                                <td>{(page - 1) * 10 + index +1}</td>
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

            <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Col>
                    <Pagination page={page} pages={pages} changePage={setPage} />
                </Col>
            </Row>

        </div>
    )
}
export default Leaderboard;
