import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col, } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import AwardCard from './AwardCard.js'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function AwardSection({ platform }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const auth = useSelector((state) => state.auth)

    return (
        <Container>
            <h4 style={{ marginBottom: "20px" }}>Platform Awards</h4>
            <Row xs={1} md={4} className="g-4">
                {Array.from({ length: 9 }).map((_, idx) => (
                    <Col align="center">
                        <AwardCard></AwardCard>
                    </Col>
                ))}
                <Col align="center" className="my-auto">
                    <i className="bi bi-plus-circle" style={{fontSize:"2.0rem"}}></i>
                </Col>
            </Row>
        </Container >

    )
}
export default AwardSection;
