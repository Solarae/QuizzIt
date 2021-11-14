import React, { useState } from 'react'
import { Image, Row, Col, Table, Nav, Card, Pagination } from 'react-bootstrap';
import { useSelector } from 'react-redux'

function Leaderboard({ platform }) {
    const memberList = useSelector((state) => state.platforms.memberList)

    const [leaderboard, setLb] = useState({
        type: "All",
        lb: platform.allTime_leaderboard
    })

    // for pagination buttons
    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }


    return (
        <div className="position-relative container justify-content-center" style={{ marginTop: "13px", marginRight: "100px" }}>
            <Row>
                <Col align="center">
                    <h3 >Platform Leaderboard</h3>
                </Col>
            </Row>
            <Row>
                <Nav fill variant="tabs"
                >
                    <Nav.Item>
                        <Nav.Link onClick={() => setLb({ type: "Daily", lb: platform.daily_leaderboard })} disabled={leaderboard.type === "Daily"}>Daily</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setLb({ type: "Weekly", lb: platform.weekly_leaderboard })} disabled={leaderboard.type === "Weekly"} >Weekly</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setLb({ type: "Monthly", lb: platform.monthly_leaderboard })} disabled={leaderboard.type === "Monthly"}>Monthly</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setLb({ type: "Biannual", lb: platform.biannual_leaderboard })} disabled={leaderboard.type === "Biannual"}>6mo</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setLb({ type: "Yearly", lb: platform.year_leaderboard })} disabled={leaderboard.type === "Yearly"}>Yearly</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setLb({ type: "All", lb: platform.allTime_leaderboard })} disabled={leaderboard.type === "All"}>
                            All
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <br />
            </Row>

            <Row className="justify-content-center" style={{ marginTop: "10px" }}>
                <Card border="dark" style={{ width: '50%' }}>
                    <Card.Body>
                        <Card.Title>1</Card.Title>
                        <Card.Text >
                            <Row className="justify-content-center">
                                <Image style={{ width: "80px", height: "80px" }} src="/quizzit_logo.png" roundedCircle thumbnail />
                            </Row>
                            <Row className="justify-content-center">
                                {leaderboard.lb[0] && memberList.find((m) => m.userId._id === leaderboard.lb[0].userId) ? memberList.find((m) => m.userId._id === leaderboard.lb[0].userId).userId.username : "--"}
                            </Row>
                            <Row className="justify-content-center">
                                {leaderboard.lb[0] ? (leaderboard.lb[0].points + ' Points') : ""}
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row>

            <Row className="justify-content-center" style={{ marginTop: "10px" }}>
                <Card border="dark" style={{ width: '40%', marginRight: "10px" }}>
                    <Card.Body>
                        <Card.Title>2</Card.Title>
                        <Card.Text >
                            <Row className="justify-content-center">
                                <Image style={{ width: "80px", height: "80px" }} src="/quizzit_logo.png" roundedCircle thumbnail />
                            </Row>
                            <Row className="justify-content-center">
                                {leaderboard.lb[1] && memberList.find((m) => m.userId._id === leaderboard.lb[1].userId) ? memberList.find((m) => m.userId._id === leaderboard.lb[1].userId).userId.username : "--"}
                            </Row>
                            <Row className="justify-content-center">
                                {leaderboard.lb[1] ? (leaderboard.lb[1].points + ' Points') : ""}
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card border="dark" style={{ width: '40%', marginLeft: "10px" }}>
                    <Card.Body>
                        <Card.Title>3</Card.Title>
                        <Card.Text >
                            <Row className="justify-content-center">
                                <Image style={{ width: "80px", height: "80px" }} src="/quizzit_logo.png" roundedCircle thumbnail />
                            </Row>
                            <Row className="justify-content-center">
                                {leaderboard.lb[2] && memberList.find((m) => m.userId._id === leaderboard.lb[2].userId) ? memberList.find((m) => m.userId._id === leaderboard.lb[2].userId).userId.username : "--"}
                            </Row>
                            <Row className="justify-content-center">
                                {leaderboard.lb[2] && <span>{leaderboard.lb[2].points} Points</span>}
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
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
                        {Array.from({ length: 7 }, (_, i) => i + 4).map((rank, _) =>
                            <tr>
                                <td>{rank}</td>
                                <td>
                                    {leaderboard.lb[rank - 1] && memberList.find((m) => m.userId._id === leaderboard.lb[rank - 1].userId) ? memberList.find((m) => m.userId._id === leaderboard.lb[rank - 1].userId).userId.username : "--"}
                                </td>
                                <td>
                                    {leaderboard.lb[rank - 1] && memberList.find((m) => m.userId._id === leaderboard.lb[rank - 1].userId) ? memberList.find((m) => m.userId._id === leaderboard.lb[rank - 1].userId).userId.points : "--"}
                                </td>
                            </tr>

                        )}
                    </tbody>
                </Table>
            </Row>

            <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Col>
                    <Pagination className="justify-content-center">{items}</Pagination>
                </Col>
            </Row>

        </div>
    )
}
export default Leaderboard;
