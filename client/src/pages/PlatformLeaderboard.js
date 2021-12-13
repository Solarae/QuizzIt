import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Banner from '../components/Platform/Banner.js'
import Leaderboard from '../components/Leaderboards/Leaderboard.js'
import { getPlatform, searchLeaderboard, getPlatformLeaderboard } from '../actions/platformActions'
import Loading from '../components/Loading'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function Platform() {
    const dispatch = useDispatch()
    const history = useHistory()

    const platform = useSelector((state) => state.platforms.platform)
    const isGetLoading = useSelector((state) => state.platforms.isGetLoading);

    const { isGetPlatLeaderboardLoading, leaderboard, leaderboardPage, leaderboardPages, errors } = useSelector((state) => state.platforms);

    const { id } = useParams();  // get the platform ID from the url
    const url = `/platform/${id}/leaderboard`

    const leaderboardProps = {
        doc: 'Platform',
        id,
        url,
        isGetLeaderboardLoading: isGetPlatLeaderboardLoading,
        leaderboard,
        apiPage: leaderboardPage,
        pages: leaderboardPages,
        errors,
        searchLeaderboard,
        getLeaderboard: getPlatformLeaderboard
    }
    
    // dispatch the GET_PLATFORM request on initial render
    useEffect(() => {
        dispatch(getPlatform({
            id: id
        }))
    }, [id, dispatch]);

    if (isGetLoading || !platform) {
        return (<Loading />)
    }
    return (
        <div className="justify-content-between">
            {Object.keys(platform).length !== 0 ? <Banner platform={platform} ></Banner> : <div></div>}

            <div style={{ height: "50px" }}></div>

            <Container>
                <p style={{ cursor: 'pointer', }} onClick={() => { history.push(`/platform/${id}`) }}><i class="bi bi-arrow-left"></i> Back to platform page</p>
                <Leaderboard {...leaderboardProps}></Leaderboard>
            </Container >

        </div >
    )
}
export default Platform;
