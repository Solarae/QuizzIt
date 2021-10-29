import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Nav, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Banner from '../components/Platform/Banner.js'
import Home from '../components/Platform/Home.js'
import MemberList from '../components/Platform/MemberList.js'
import { getPlatform } from '../actions/platformActions'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function Platform() {
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const platforms = useSelector((state) => state.platforms)
    const history = useHistory()


    let { id } = useParams();  // get the platform ID from the url
   
    const [platform, setPlatform] = useState({});

    // dispatch the GET_PLATFORM request on initial render
    useEffect(() => {
        dispatch(getPlatform({
            id: id
        }))
    }, [ id, dispatch ]);

    // waits for GET_PLATFORM request to update redux store with the platform data 
    useEffect(() => {
        console.log("GET_PLATFORM.loading: " + platforms.GET_PLATFORM.loading)
        if (!platforms.GET_PLATFORM.loading && platforms.GET_PLATFORM.platform) {
            const platform = platforms.GET_PLATFORM.platform;
            setPlatform(platform);
            console.log(platform);
            // check if there were errors
            if (platform.errors) {
                setErrors({ ...platform.errors });
                return;
            }

        }
    }, [platforms.GET_PLATFORM]);


    // used to determine whether to show the home or memberlist based on which tab is selected 
    const [showHome, setShowHome] = useState(true);
    const handleHideHome = () => { setShowHome(false) };
    const handleShowHome = () => { setShowHome(true) };

    return (
        <div className="justify-content-between">
            <Banner platform={platform}></Banner>

            <div style={{ height: "50px" }}></div>

            <div >
                <div className="row">
                    <div className="col-9" style={{}}>
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col xs lg="6">
                                    <Nav className="tabNav" justify variant="tabs" defaultActiveKey="/platform" >
                                        <Nav.Item>
                                            <Link to={`/platform/${id}`} onClick={handleShowHome}><Nav.Link href="/platform" ><i class="bi bi-house-door" style={{ fontSize: "1.5rem" }}></i></Nav.Link></Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Link to={`/platform/${id}`} onClick={handleHideHome}><Nav.Link href="/platform" eventKey="link-1"><i class="bi bi-people" style={{ fontSize: "1.5rem" }}></i></Nav.Link></Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                            </Row>
                        </Container>

                        { showHome ? <Home platform={platform}></Home> : <MemberList platform={platform}></MemberList>}

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
