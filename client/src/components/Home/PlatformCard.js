import React, { useState } from 'react'
import { Card, Image, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

import Subscribe from '../Button/Subscribe'

function PlatformCard({ platform, showSubscribe=true }) {
    const history = useHistory()

    const routeToPlatform = () => {
        history.push(`/platform/${platform._id}`);
    }

    return (
        <Card border="">
            <Card.Body>
                <Row>
                    <Col className="my-auto" align="center" style={{  }} >
                        <Image onClick={routeToPlatform} style={{ width: "75px", height: "75px", cursor: "pointer" }} className="bg-dark" src={platform.icon ? platform.icon : '/quizzit_logo.png'} thumbnail />
                        <Row style={{ marginBottom: "-10px" }}>
                            <p className="fs-5 text" onClick={routeToPlatform} style={{ cursor: "pointer", whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{platform.name}</p>
                        </Row>
                        <Row style={{}}>
                            <p className="text-muted" style={{ fontSize: "9pt" }}><i className="bi bi-people-fill"></i> {platform.subscribers.length} Subscribers</p>
                        </Row>

                        {showSubscribe && <Subscribe size="sm" platform={platform} style={{ width: "100%" }} />}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
export default PlatformCard;