import React from 'react'
import { Container, Image, Button, Row, Col, Table, Nav, Card, Pagination } from 'react-bootstrap';

function Leaderboard({ platform }) {

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
                        <Nav.Link>Daily</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>Weekly</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>Monthly</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>6mo</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>Yearly</Nav.Link>
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

            <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Col>
                    <Pagination className="justify-content-center">{items}</Pagination>
                </Col>
            </Row>

        </div>
    )
}
export default Leaderboard;
