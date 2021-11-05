import React, { useState } from 'react'
import { Card, Image, Row, Col, Button } from 'react-bootstrap';

function PlatformCard() {

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col md={3} className="my-auto" align="center" style={{  }}>
                        <Image style={{ width: "150px", height: "150px" }} className="bg-dark" src="/quizzit_logo.png" thumbnail />
                    </Col>
                    <Col md={6} style={{ }}>
                        <Row style={{ height: "25%" }}>
                            <p className="fs-4 text">Platform Name</p>
                        </Row>
                        <Row style={{ height: "25%" }}>
                            <p>150 Subscribers<i class="bi bi-dot" />10 Quizzes</p>
                        </Row>
                        <Row style={{ height: "25%" }}>
                            <p>Platform Description here</p>
                        </Row>
                        <Row style={{ height: "25%" }}>
                            <p>
                                <i className="bi bi-hand-thumbs-up"></i> 1.7k
                                <i className="bi bi-hand-thumbs-down" style={{ marginLeft: "10px" }}></i> 80
                            </p>
                        </Row>

                    </Col >
                    <Col md={3} align="center" className="my-auto" style={{ }}>
                        <Button size="lg" variant="primary">Subscribe</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
export default PlatformCard;