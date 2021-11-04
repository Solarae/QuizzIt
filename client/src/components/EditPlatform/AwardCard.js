import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import EditAward from './EditAward.js'

function AwardCard({ award }) {
    const [showEdit, setShowEdit] = useState(false);

    return (
        <Card bg="white" style={{ width: "220px" }} >
            <i className="bi bi-pencil-square position-absolute top-0 start-100 translate-middle" style={{ fontSize: "1.3rem", cursor:"pointer" }} onClick={() => { setShowEdit(true) }}></i>
            <Card.Img variant="top" src={award.icon} style={{ width: "220px", height: "175px", background: "transparent" }} />
            <Card.Footer className="text-center bg-light" >
                <small className="text-muted text-center">{award.title}</small>
            </Card.Footer>

            <EditAward award={award} show={showEdit} handleClose={() => { setShowEdit(false) }}></EditAward>
        </Card>
    )
}
export default AwardCard;