import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import GlobalLB from '../components/Leaderboards/GlobalLB.js'

function GlobalLeaderboard() {
    return (
        <div className="justify-content-between">
            <div style={{ height: "50px" }}></div>
            <Container>
                <GlobalLB></GlobalLB>
            </Container >
        </div >
    )
}
export default GlobalLeaderboard;
