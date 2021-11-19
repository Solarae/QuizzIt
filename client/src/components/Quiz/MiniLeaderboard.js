import React from 'react'
import { Image, Button, Row, Table, Nav, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

function MiniLeaderboard({ quiz }) {
    const history = useHistory()

    return (
        <div className="position-relative container justify-content-center" style={{ marginTop: "13px", marginRight: "100px" }}>
            <Row>
                <h3>Quiz Leaderboard</h3>
            </Row>
            <Row>
                <Nav fill variant="tabs">
                    <Nav.Item>
                        <Nav.Link>Today</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link >Weekly</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link disabled>
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
                                Username
                            </Row>
                            <Row className="justify-content-center">
                                100 Points
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
                                Username
                            </Row>
                            <Row className="justify-content-center">
                                100 Points
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
                                Username
                            </Row>
                            <Row className="justify-content-center">
                                100 Points
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row>

            <Row style={{marginTop: "10px"}}>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>4</td>
                            <td>Mark</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Jacob</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Thornton</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Thornton</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>Thornton</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>Thornton</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>Thornton</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>

            <Row>
                <Button variant="primary" size="sm" onClick={()=>{history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}/leaderboard`)}}>
                    View Leaderboard
                </Button>
            </Row>

        </div>
    )
}
export default MiniLeaderboard;
