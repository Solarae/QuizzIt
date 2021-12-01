import { React, useState } from 'react'
import { Col, Card } from 'react-bootstrap';

function ReportCard({ report }) {
    return (
        <Card style={{ width: "70vw" }} >
            <Card.Header>Platform Reported : {report.platformId}  </Card.Header>
            <Card.Body>
                <h6 className="ml-5">Description : </h6>
                <br/>
                <Card.Title style={{fontSize: "16pt"}}>{report.description}</Card.Title>

            </Card.Body>
            <h6> Reported by : {report.submittedBy} </h6>
        </Card>
    )
}
export default ReportCard;