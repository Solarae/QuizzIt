import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Banner from '../components/Platform/Banner.js'
import Leaderboard from '../components/Leaderboards/Leaderboard.js'
import { getPlatform } from '../actions/platformActions'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function GlobalLeaderboard() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const platform = useSelector((state) => state.platforms.platform)
    const isGetLoading = useSelector((state) => state.platforms.isGetLoading);

    const id = "" // id for platform that contains global leaderboards 

    // dispatch the GET_PLATFORM request on initial render
    useEffect(() => {
        dispatch(getPlatform({
            id: id
        }))
    }, [id, dispatch]);

    if (isGetLoading || !platform) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="justify-content-between">
            <Container>
                <Row style={{}}>
                    <Col className="justify-content-md-center" style={{}}>
                        <Row>
                            <Col align="center">
                                <h3 >Global Leaderboard</h3>
                            </Col>
                        </Row>
                        <Leaderboard></Leaderboard>
                    </Col>
                </Row>
            </Container >

        </div >
    )
}
export default GlobalLeaderboard;
