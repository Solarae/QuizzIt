import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { uploadImage } from '../actions/profileActions.js'

import Banner from '../components/Profile/Banner';
import EditProfileModal from '../components/Profile/EditProfile';
import UploadImage from '../components/UploadImage';
import DeleteProfile from '../components/Profile/DeleteProfile';

import { getProfile } from '../actions/profileActions'

function EditProfile() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const { profile, isGetProfileLoading } = useSelector((state) => state.profile)

    let { id } = useParams()
    useEffect(() => {
        dispatch(getProfile({
            id: id
        }))
    }, [id, auth.user, dispatch]);

    const [showUsernameModal, setShowUsernameModal] = useState(false);
    const handleCloseUsernameModal = () => { setShowUsernameModal(false) };
    const handleShowUsernameModal = () => { setShowUsernameModal(true) };

    const [showEmailModal, setShowEmailModal] = useState(false);
    const handleCloseEmailModal = () => { setShowEmailModal(false) };
    const handleShowEmailModal = () => { setShowEmailModal(true) };

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const handleClosePasswordModal = () => { setShowPasswordModal(false) };
    const handleShowPasswordModal = () => { setShowPasswordModal(true) };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => { setShowDeleteModal(false) };
    const handleShowDeleteModal = () => { setShowDeleteModal(true) };

    const [showIconModal, setShowIconModal] = useState(false);

    const handleEditThumbnail = (image) => {
        dispatch(uploadImage(id, image))
    }

    if (!auth.user || isGetProfileLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="justify-content-between">

            <Banner user={profile}></Banner>

            <Container>
                <h2 className='text-center m-3'>Profile Settings</h2>

                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <Form.Label>Username</Form.Label>
                        <InputGroup className="mb-3">

                            <FormControl
                                placeholder={auth.user.username}
                                aria-label="username"
                                readOnly
                            />
                            <Button onClick={handleShowUsernameModal} variant="outline-primary">Edit</Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <Form.Label>Email Address</Form.Label>
                        <InputGroup className="mb-3">

                            <FormControl
                                placeholder={auth.user.email}
                                aria-label="email"
                                readOnly
                            />
                            <Button onClick={handleShowEmailModal} variant="outline-primary">Edit</Button>
                        </InputGroup>
                    </Col>
                </Row>

                <br />
                
                <Row className="justify-content-md-center">
                    <Col align='center' md={4}>
                        <Button onClick={setShowIconModal} variant="outline-primary">Change Icon</Button>
                    </Col>
                </Row>

                <br />

                <Row className="justify-content-md-center">
                    <Col align='center' md={4}>
                        <Button onClick={handleShowPasswordModal} variant="outline-primary">Change Password</Button>
                    </Col>
                </Row>

                <br />

                <Row className="justify-content-md-center">
                    <Col align='center' md={4}>
                        <Button onClick={handleShowDeleteModal} variant="outline-danger">Delete Profile</Button>
                    </Col>
                </Row>

                <EditProfileModal type="Username" show={showUsernameModal} handleClose={handleCloseUsernameModal}></EditProfileModal>
                <EditProfileModal type="Email" show={showEmailModal} handleClose={handleCloseEmailModal}></EditProfileModal>
                <EditProfileModal type="Password" show={showPasswordModal} handleClose={handleClosePasswordModal}></EditProfileModal>
                <DeleteProfile show={showDeleteModal} handleClose={handleCloseDeleteModal}></DeleteProfile>
                <UploadImage type="circle" handleUpload={handleEditThumbnail} show={showIconModal} handleClose={()=>setShowIconModal(false)} defaultImageUrl={auth.user.icon && auth.user.icon !== "" ? auth.user.icon : "/quizzit_logo.png" }></UploadImage>
            </Container>
        </div>
    )
}
export default EditProfile
