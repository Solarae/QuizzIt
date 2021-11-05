import React, { useState } from 'react'
import { Card, Image, Row, Col, Button } from 'react-bootstrap';

function QuizCard() {

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col md={3} className="my-auto" align="center" style={{  }}>
                        <Image style={{ width: "150px", height: "150px" }} className="bg-dark" src="/quizzit_logo.png" thumbnail />
                    </Col>
                    <Col style={{ }}>
                        <Row style={{ height: "20%" }}>
                            <p className="fs-4 text">Quiz Title</p>
                        </Row>
                        <Row style={{ height: "20%" }}>
                            <p>3.8k Submissions<i class="bi bi-dot" />5d ago</p>
                        </Row>
                        <Row style={{ height: "20%" }}>
                            <p>Platform icon and platform name here</p>
                        </Row>
                        <Row style={{ height: "20%" }}>
                            <p>Quiz Description here</p>
                        </Row>
                        <Row style={{ height: "20%" }}>
                            <p>
                                <i className="bi bi-hand-thumbs-up"></i> 1.7k
                                <i className="bi bi-hand-thumbs-down" style={{ marginLeft: "10px" }}></i> 80
                            </p>
                        </Row>

                    </Col >
                </Row>
            </Card.Body>
        </Card>
    )
}
export default QuizCard;