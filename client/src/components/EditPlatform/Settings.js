import React, { useState, useCallback } from 'react'
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import DeletePlatform from './DeletePlatform.js'
import EditSetting from './EditSetting.js'
import { editPlatform, uploadImage } from '../../actions/platformActions.js'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

function Settings({ platform }) {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    let { id } = useParams();  // get the platform ID from the url

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = useCallback(() => { setShowDelete(false) }, []);
    const handleShowDelete = () => { setShowDelete(true) };
    
    const [showEditName, setShowEditName] = useState(false);
    const [showEditDesc, setShowEditDesc] = useState(false);

    const handleEditIcon = (e) => {
        e.preventDefault();
        dispatch(uploadImage(id, e.target.files[0], 'icon', auth.user.id))
    }

    const handleEditBanner = (e) => {
        e.preventDefault();
        dispatch(uploadImage(id, e.target.files[0], 'banner', auth.user.id))
    }

    return (
        <Container>
            <h4 style={{ marginBottom: "20px" }}>Platform Details</h4>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <Form.Group controlId="formIconFile" className="mb-3">
                        <Form.Label>Platform Icon</Form.Label>
                        <Form.Control type="file" onChange={handleEditIcon} />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-md-center">
                <Col md={4}>
                    <Form.Group controlId="formBannerFile" className="mb-3">
                        <Form.Label>Platform Banner</Form.Label>
                        <Form.Control type="file" onChange={handleEditBanner} />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-md-center">
                <Col md={4}>
                    <Form.Label>Platform Name</Form.Label>
                    <InputGroup className="mb-3">

                        <FormControl
                            placeholder={platform.name}
                            aria-label="name"
                            readOnly
                        />
                        <Button variant="outline-primary" onClick={()=>setShowEditName(true)}>Edit</Button>
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
                        <Button variant="outline-primary" onClick={()=>setShowEditDesc(true)}>Edit</Button>
                    </InputGroup>
                </Col>
            </Row>

            <br />

            <Row className="justify-content-md-center">
                <Col md={4} className="justify-content-center">
                    <Button onClick={handleShowDelete} variant="outline-danger">Delete Platform</Button>
                </Col>
            </Row>


            <DeletePlatform show={showDelete} handleClose={handleCloseDelete}></DeletePlatform>
            <EditSetting type="Name" show={showEditName} handleClose={()=>setShowEditName(false)}></EditSetting>
            <EditSetting type="Description" show={showEditDesc} handleClose={()=>setShowEditDesc(false)}></EditSetting>

        </Container>

    )
}
export default Settings;
