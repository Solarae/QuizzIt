import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col, Nav, FloatingLabel, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import DeletePlatform from './DeletePlatform.js'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function EditInfo({ platform }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const auth = useSelector((state) => state.auth)

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = useCallback(() => { setShowDelete(false) }, []);
    const handleShowDelete = () => { setShowDelete(true) };

    return (
        <div className="row">
            <div className="col" style={{}}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={4}>
                            <Form.Label>Platform Name</Form.Label>
                            <InputGroup className="mb-3">

                                <FormControl
                                    placeholder={platform.name}
                                    aria-label="name"
                                    readOnly
                                />
                                <Button variant="outline-primary">Edit</Button>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col md={4}>
                            <Form.Label>Platform Description</Form.Label>
                            <InputGroup className="mb-3">

                                <FormControl
                                    placeholder={platform.description}
                                    aria-label="description"
                                    readOnly
                                />
                                <Button variant="outline-primary">Edit</Button>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col md={4}>
                            <Form.Label>Banner Image</Form.Label>
                            <InputGroup className="mb-3">

                                <FormControl
                                    placeholder="image.jpeg"
                                    aria-label="bannerImage"
                                    readOnly
                                />
                                <Button variant="outline-primary">Edit</Button>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col md={4}>
                            <Form.Label>Platform Icon</Form.Label>
                            <InputGroup className="mb-3">

                                <FormControl
                                    placeholder="icon.jpeg"
                                    aria-label="platformIcon"
                                    readOnly
                                />
                                <Button variant="outline-primary">Edit</Button>
                            </InputGroup>
                        </Col>
                    </Row>
                    <br />

                    <Row className="justify-content-md-center">
                        <Col md={4} className="justify-content-center">
                            <Button onClick={handleShowDelete} variant="outline-danger">Delete Platform</Button>
                        </Col>
                    </Row>
                </Container>

            </div>
            <DeletePlatform show={showDelete} handleClose={handleCloseDelete}></DeletePlatform>
        </div>
    )
}
export default EditInfo;
