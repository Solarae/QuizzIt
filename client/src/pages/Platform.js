import React from 'react'
import { Container, Row, Col, Nav, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Banner from '../components/Platform/Banner.js'
import Home from '../components/Platform/Home.js'

function Platform({ platformId }) {
    return (
        <div className="justify-content-between">
            <Banner></Banner>

            <div style={{ height: "50px" }}></div>

            <div >
                <div className="row">
                    <div className="col-9" style={{ }}>
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col xs lg="6">
                                    <Nav className="tabNav" justify variant="tabs" defaultActiveKey="/platform" >
                                        <Nav.Item>
                                            <Link to="/platform"><Nav.Link id="asdf" href="/platform" ><i class="bi bi-house-door" style={{ fontSize: "1.5rem" }}></i></Nav.Link></Link>

                                        </Nav.Item>
                                        <Nav.Item>
                                            <Link to="/platform"><Nav.Link href="/platform/members" eventKey="link-1"><i class="bi bi-people" style={{ fontSize: "1.5rem" }}></i></Nav.Link></Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                            </Row>
                        </Container>

                        <Home></Home>
                    </div>
                    <div className="col" style={{ }}>
                        leaderboard goes here
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Platform;
