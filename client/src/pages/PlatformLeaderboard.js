import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Banner from '../components/Platform/Banner.js'
import Leaderboard from '../components/Leaderboards/Leaderboard.js'
import { getPlatform } from '../actions/platformActions'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function Platform() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const platform = useSelector((state) => state.platforms.platform)
    const isGetLoading = useSelector((state) => state.platforms.isGetLoading);

    let { id } = useParams();  // get the platform ID from the url

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
            {Object.keys(platform).length !== 0 ? <Banner platform={platform} ></Banner> : <div></div>}

            <div style={{ height: "50px" }}></div>

            <Container>
                <p style={{ cursor: 'pointer', }} onClick={() => { history.push(`/platform/${id}`) }}><i class="bi bi-arrow-left"></i> Back to platform page</p>
                <Leaderboard></Leaderboard>
            </Container >

        </div >
    )
}
export default Platform;
