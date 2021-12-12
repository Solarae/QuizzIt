import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Banner from '../components/Platform/Banner.js'
import Home from '../components/Platform/Home.js'
import AwardSection from '../components/EditPlatform/AwardSection.js'
import MemberList from '../components/Platform/MemberList.js'
import MiniLeaderboard from '../components/Leaderboards/MiniLeaderboard.js'
import { getPlatform, getPlatformLeaderboard } from '../actions/platformActions'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

function Platform() {
    const dispatch = useDispatch()
    const platform = useSelector((state) => state.platforms.platform)
    const quizzesData = useSelector((state) => state.platforms.quizzesData)
    const awardsData = useSelector((state) => state.platforms.awardsData)
    const memberList = useSelector((state) => state.platforms.memberList)
    const isGetLoading = useSelector((state) => state.platforms.isGetLoading);
    const isEditRoleLoading = useSelector((state) => state.platforms.isEditRoleLoading)

    const { isGetPlatLeaderboardLoading, leaderboard, errors } = useSelector((state) => state.platforms)

    const { id } = useParams();  // get the platform ID from the url
    const url = `/platform/${id}/leaderboard`

    const leaderboardProps = {
        doc: 'Platform',
        id,
        url,
        isGetLeaderboardLoading: isGetPlatLeaderboardLoading,
        leaderboard,
        errors,
        getLeaderboard: getPlatformLeaderboard
    }

    // dispatch the GET_PLATFORM request on initial render
    useEffect(() => {
        dispatch(getPlatform({
            id: id
        }))
    }, [id, isEditRoleLoading, dispatch]);

    // used to determine whether to show the home or memberlist based on which tab is selected 
    const [tab, setTab] = useState('home');

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
                                    <Nav className="tabNav" justify variant="tabs" activeKey={tab}>
                                        <Nav.Item>
                                            <Link to={`/platform/${id}`} onClick={() => setTab('home')}><Nav.Link href="/platform" eventKey="home" ><i class="bi bi-house-door" style={{ fontSize: "1.5rem" }}></i></Nav.Link></Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Link to={`/platform/${id}`} onClick={() => setTab('awards')}><Nav.Link href="/platform/awards" eventKey="awards"><i class="bi bi-award" style={{ fontSize: "1.5rem" }}></i></Nav.Link></Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Link to={`/platform/${id}`} onClick={() => setTab('memberlist')}><Nav.Link href="/platform/memberlist" eventKey="memberlist"><i class="bi bi-people" style={{ fontSize: "1.5rem" }}></i></Nav.Link></Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                            </Row>
                        </Container>

                        {tab === 'home' && <Home quizzesData={quizzesData}></Home>}
                        {tab === 'awards' && (awardsData.length!==0 ? <AwardSection showEdit={false} awardsData={awardsData}></AwardSection> : <Col align='center'><br/><p>This platform does not have any awards</p></Col>)}
                        {tab === 'memberlist' && <MemberList platform={platform} memberList={memberList}></MemberList>}

                    </div>

                    <MiniLeaderboard {...leaderboardProps}></MiniLeaderboard>

                </div>
            </div>
        </div >
    )
}
export default Platform;
