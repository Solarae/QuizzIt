import React, { useState } from 'react'
import { Card, Popover, OverlayTrigger } from 'react-bootstrap';
import EditAward from './EditAward.js'

function AwardCard({ award, showEditControls = true }) {
    const [showEdit, setShowEdit] = useState(false);

    const popover = (showEditControls ? <span></span> :
        <Popover id="popover-basic">
            <Popover.Header as="h3">Description</Popover.Header>
            <Popover.Body>
                {award.description}
                <hr />
                <span className="text-muted">Requirement: {award.requirementCount + ' ' + (award.requirementType === 'Point' ? "Points" : "Quizzes")}</span>
            </Popover.Body>
        </Popover>

    );

    return (
        <OverlayTrigger placement="bottom" overlay={popover}>
            <Card bg="white" style={{ width: "220px" }} >
                {showEditControls && <i className="bi bi-pencil-square position-absolute top-0 start-100 translate-middle" style={{ fontSize: "1.3rem", cursor: "pointer" }} onClick={() => { setShowEdit(true) }}></i>}
                <Card.Img variant="top" src={award.icon} style={{ width: "220px", height: "175px", background: "transparent" }} />
                <Card.Footer className="text-center bg-light" >
                    <small className="text-muted text-center">{award.title}</small>
                </Card.Footer>

                <EditAward award={award} show={showEdit} handleClose={() => { setShowEdit(false) }}></EditAward>
            </Card>
        </OverlayTrigger>
    )
}
export default AwardCard;