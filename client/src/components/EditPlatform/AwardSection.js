import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col, } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import AwardCard from './AwardCard.js'
import CreateAward from './CreateAward.js'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function AwardSection({ platform }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const auth = useSelector((state) => state.auth)

    const [showCreateAward, setShowCreateAward] = useState(false);

    return (
        <Container>
            <h4 style={{ marginBottom: "20px" }}>Platform Awards</h4>
            <Row xs={1} md={4} className="g-4">
                {platform.awardsData.map((award, idx) => (
                    <Col align="center">
                        <AwardCard award={award}></AwardCard>
                    </Col>
                ))}
                <Col style={{ minHeight: "220px" }} align="center">
                    <div className="position-relative top-50 start-50 translate-middle" >
                        <i className="bi bi-plus-circle" style={{ fontSize: "2.0rem", cursor: "pointer" }} onClick={()=>{ setShowCreateAward(true) }}></i>
                    </div>
                </Col>
            </Row>
            <CreateAward show={showCreateAward} handleClose={()=>{ setShowCreateAward(false) }}></CreateAward>
        </Container >

    )
}
export default AwardSection;
