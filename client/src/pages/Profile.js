import React, { useState } from 'react'
import { Container, Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import EditProfile from '../components/Profile/EditProfile';
import DeleteProfile from '../components/Profile/DeleteProfile';

function Profile() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory()

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

    return (
        <Container>
            <h2 className='text-center m-3'>{auth.user.username}'s Profile page</h2>
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
                <Col md={4}>
                    <Button onClick={handleShowPasswordModal} variant="outline-primary">Edit Password</Button>
                </Col>
            </Row>

            <br />

            <Row className="justify-content-md-center">
                <Col md={4}>
                    <Button onClick={handleShowDeleteModal} variant="outline-danger">Delete Profile</Button>
                </Col>
            </Row>

            <EditProfile type="Username" show={showUsernameModal} handleClose={handleCloseUsernameModal}></EditProfile>
            <EditProfile type="Email" show={showEmailModal} handleClose={handleCloseEmailModal}></EditProfile>
            <EditProfile type="Password" show={showPasswordModal} handleClose={handleClosePasswordModal}></EditProfile>
            <DeleteProfile show={showDeleteModal} handleClose={handleCloseDeleteModal}></DeleteProfile>

        </Container>
    )
}
export default Profile
