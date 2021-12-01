import React, { useState, useEffect } from 'react'
import { Image, Row, Col, Table, Nav, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { getQuizLeaderboard } from '../../actions/quizActions';
import Pagination from '../Pagination'

function Leaderboard({ quiz }) {
    const dispatch = useDispatch()
    const [type, setType] = useState("daily")
    const isGetQuizLeaderboardLoading = useSelector((state) => state.quiz.isGetPlatLeaderboardLoading);
    const leaderboard = useSelector((state) => state.quiz.leaderboard)
    const pages = useSelector((state) => state.quiz.leaderboardPages)
    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(getQuizLeaderboard(
            quiz._id,
            type,
            page
        ))
    }, [page, type, dispatch]);
    
    if (isGetQuizLeaderboardLoading) {
        return (<div>Loading...</div>)
    }

    return (
        <div className="position-relative container justify-content-center" style={{ marginTop: "13px", marginRight: "100px" }}>
            <Row>
                <Col align="center">
                    <h3 >Quiz Leaderboard</h3>
                </Col>
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

            {/* <Row className="justify-content-center" style={{ marginTop: "10px" }}>
                <Card border="dark" style={{ width: '50%' }}>
                    <Card.Body>
                        <Card.Title>1</Card.Title>
                        <Card.Text >
                            <Row className="justify-content-center">
                                <Image style={{ width: "80px", height: "80px" }} src="/quizzit_logo.png" roundedCircle thumbnail />
                            </Row>
                            <Row className="justify-content-center">
                                Username
                            </Row>
                            <Row className="justify-content-center">
                                100 Points
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row> */}

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
