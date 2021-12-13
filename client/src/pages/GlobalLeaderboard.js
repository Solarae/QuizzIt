import React from 'react'
import { Container } from 'react-bootstrap';
import Leaderboard from '../components/Leaderboards/Leaderboard.js'
import { searchLeaderboard, getLeaderboard } from '../actions/globalActions'

import { useSelector } from 'react-redux'

function GlobalLeaderboard() {
    const { isGetGlobalLeaderboardLoading, leaderboard, leaderboardPage, leaderboardPages, errors } = useSelector((state) => state.global);

    const url = `/leaderboard`

    const leaderboardProps = {
        doc: 'Global',
        url,
        isGetLeaderboardLoading: isGetGlobalLeaderboardLoading,
        leaderboard,
        apiPage: leaderboardPage,
        pages: leaderboardPages,
        errors,
        searchLeaderboard,
        getLeaderboard
    }

    return (
        <div className="justify-content-between">
            <div style={{ height: "50px" }}></div>
            <Container>
                <Leaderboard {...leaderboardProps}></Leaderboard>
            </Container >
        </div >
    )
}
export default GlobalLeaderboard;
