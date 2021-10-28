import React, { useState } from 'react'
import { Container, Row, Col, Nav, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Banner from '../components/Platform/Banner.js'
import Home from '../components/Platform/Home.js'
import MemberList from '../components/Platform/MemberList.js'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function Platform({ platformId }) {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory()

    // used to determine whether to show the home or memberlist based on which tab is selected 
    const [showHome, setShowHome] = useState(true);
    const handleHideHome = () => { setShowHome(false) };
    const handleShowHome = () => { setShowHome(true) };


    return (
        <div className="justify-content-between">
            <Banner></Banner>

            <div style={{ height: "50px" }}></div>

            <div >
                <div className="row">
                    <div className="col-9" style={{}}>
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col xs lg="6">
                                    <Nav className="tabNav" justify variant="tabs" defaultActiveKey="/platform" >
                                        <Nav.Item>
                                            <Link to="/platform" onClick={handleShowHome}><Nav.Link href="/platform" ><i class="bi bi-house-door" style={{ fontSize: "1.5rem" }}></i></Nav.Link></Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Link to="/platform" onClick={handleHideHome}><Nav.Link href="/platform" eventKey="link-1"><i class="bi bi-people" style={{ fontSize: "1.5rem" }}></i></Nav.Link></Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                            </Row>
                        </Container>

                        { showHome ? <Home platformId={platformId}></Home> : <MemberList platformId={platformId}></MemberList> }
                        
                    </div>
                    <div className="col" style={{}}>
                        leaderboard goes here
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Platform;
