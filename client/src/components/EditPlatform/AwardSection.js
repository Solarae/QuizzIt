import React, { useState } from 'react'
import { Container, Row, Col, } from 'react-bootstrap';
import AwardCard from './AwardCard.js'
import CreateAward from './CreateAward.js'

function AwardSection({ awardsData, showEdit = true }) {
    const [showCreateAward, setShowCreateAward] = useState(false);

    return (
        <Container>
            <h4 style={{ marginBottom: "20px" }}>Platform Awards</h4>
            <Row xs={1} md={4} className="g-4">
                {showEdit && (
                    <Col style={{ minHeight: "220px" }} align="center">
                        <div className="position-relative top-50 start-50 translate-middle" >
                            <i className="bi bi-plus-circle" style={{ fontSize: "2.0rem", cursor: "pointer" }} onClick={() => { setShowCreateAward(true) }}></i>
                        </div>
                    </Col>
                )}
                {awardsData.map((award, idx) => (
                    <Col align="center">
                        <AwardCard showEditControls={showEdit} award={award}></AwardCard>
                    </Col>
                ))}
            </Row>
            <CreateAward show={showCreateAward} handleClose={() => { setShowCreateAward(false) }}></CreateAward>
        </Container >

    )
}
export default AwardSection;
