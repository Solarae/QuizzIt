import React, { useState, useCallback } from 'react'
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import DeletePlatform from './DeletePlatform.js'
import EditSetting from './EditSetting.js'
import { editPlatform, uploadImage } from '../../actions/platformActions.js'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import UploadImage from '../UploadImage';

function Settings({ platform }) {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    let { id } = useParams();  // get the platform ID from the url

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = useCallback(() => { setShowDelete(false) }, []);
    const handleShowDelete = () => { setShowDelete(true) };

    const [showEditName, setShowEditName] = useState(false);
    const [showEditDesc, setShowEditDesc] = useState(false);


    const [showIconModal, setShowIconModal] = useState(false);
    const [showBannerModal, setShowBannerModal] = useState(false);

    const handleEditIcon = (image) => {
        dispatch(uploadImage(id, image, 'icon', auth.user.id))
    }

    const handleEditBanner = (image) => {
        dispatch(uploadImage(id, image, 'banner', auth.user.id))
    }

    return (
        <Container>
            <h4 style={{ marginBottom: "20px" }}>Platform Settings</h4>

            <Row className="justify-content-md-center">
                <Col md={4}>
                    <Form.Label>Platform Name</Form.Label>
                    <InputGroup className="mb-3">

                        <FormControl
                            placeholder={platform.name}
                            aria-label="name"
                            readOnly
                        />
                        <Button variant="outline-primary" onClick={() => setShowEditName(true)}>Edit</Button>
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
                        <Button variant="outline-primary" onClick={() => setShowEditDesc(true)}>Edit</Button>
                    </InputGroup>
                </Col>
            </Row>

            <br />

            <Row className="justify-content-md-center">
                <Col align='center' md={4}>
                    <Button onClick={() => setShowIconModal(true)} variant="outline-primary">Change Icon</Button>
                </Col>
            </Row>

            <br />

            <Row className="justify-content-md-center">
                <Col align='center' md={4}>
                    <Button onClick={() => setShowBannerModal(true)} variant="outline-primary">Change Banner</Button>
                </Col>
            </Row>

            <br />

            <Row className="justify-content-md-center">
                <Col align='center' md={4} className="justify-content-center">
                    <Button onClick={handleShowDelete} variant="outline-danger">Delete Platform</Button>
                </Col>
            </Row>


            <DeletePlatform show={showDelete} handleClose={handleCloseDelete}></DeletePlatform>
            <EditSetting type="Name" show={showEditName} handleClose={() => setShowEditName(false)}></EditSetting>
            <EditSetting type="Description" show={showEditDesc} handleClose={() => setShowEditDesc(false)}></EditSetting>
            <UploadImage type="platformIcon" handleUpload={handleEditIcon} show={showIconModal} handleClose={() => setShowIconModal(false)} defaultImageUrl={platform.icon && platform.icon !== "" ? platform.icon : "/quizzit_logo.png"}></UploadImage>
            <UploadImage type="banner" handleUpload={handleEditBanner} show={showBannerModal} handleClose={() => setShowBannerModal(false)} defaultImageUrl={platform.banner && platform.banner !== "" ? platform.banner : "/quizzit_logo.png"}></UploadImage>

        </Container>

    )
}
export default Settings;
