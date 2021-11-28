import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Banner from '../components/Platform/Banner.js'
import Home from '../components/Platform/Home.js'
import MemberList from '../components/Platform/MemberList.js'
import MiniLeaderboard from '../components/Leaderboards/MiniLeaderboard.js'
import { getPlatform } from '../actions/platformActions'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

function Platform() {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({});
    const platform = useSelector((state) => state.platforms.platform)
    const quizzesData = useSelector((state) => state.platforms.quizzesData)
    const memberList = useSelector((state) => state.platforms.memberList)
    const isGetLoading = useSelector((state) => state.platforms.isGetLoading);
    const isEditRoleLoading = useSelector((state) => state.platforms.isEditRoleLoading);

    let { id } = useParams();  // get the platform ID from the url

    // dispatch the GET_PLATFORM request on initial render
    useEffect(() => {
        dispatch(getPlatform({
            id: id
        }))
    }, [id, isEditRoleLoading, dispatch]);

    // used to determine whether to show the home or memberlist based on which tab is selected 
    const [showHome, setShowHome] = useState(true);
    const handleHideHome = () => { setShowHome(false) };
    const handleShowHome = () => { setShowHome(true) };

    if (isGetLoading || !platform) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="justify-content-between">
            {Object.keys(platform).length !== 0 ? <Banner platform={platform} ></Banner> : <div></div>}

            <div style={{ height: "50px" }}></div>

            <div >
                <div className="row">
                    <div className="col-9" style={{}}>
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col xs lg="6">
                                    <Nav className="tabNav" justify variant="tabs" activeKey={showHome ? "home" : "memberlist"}>
                                        <Nav.Item>
                                            <Link to={`/platform/${id}`} onClick={handleShowHome}><Nav.Link href="/platform" eventKey="home" ><i class="bi bi-house-door" style={{ fontSize: "1.5rem" }}></i></Nav.Link></Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Link to={`/platform/${id}`} onClick={handleHideHome}><Nav.Link href="/platform/memberlist" eventKey="memberlist"><i class="bi bi-people" style={{ fontSize: "1.5rem" }}></i></Nav.Link></Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                            </Row>
                        </Container>

                        {showHome && Object.keys(platform).length !== 0 ? <Home quizzesData={quizzesData}></Home> : <MemberList platform={platform} memberList={memberList}></MemberList>}

                    </div>
                    <div className="col" style={{}}>
                        <Row>
                            <Col align="center">
                                <h3 >Platform Leaderboard</h3>
                            </Col>
                        </Row>
                        <MiniLeaderboard doc={platform}></MiniLeaderboard>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Platform;
