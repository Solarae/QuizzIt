import React, { useState } from 'react'
import { Nav, Navbar, Container, Form, Button, Image, Row, Col, NavDropdown, InputGroup, FormControl } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import EditProfile from '../components/EditProfile';

function Profile() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory()

    const [values, setValues] = useState({
        showUsernameModal: false,
        showEmailModal: false,
        showPasswordModal: false,
    })

    const handleCloseUsernameModal = () => { setValues({ ...values, showUsernameModal: false }) };
    const handleShowUsernameModal = () => { setValues({ ...values, showUsernameModal: true }) };
    
    const handleCloseEmailModal = () => { setValues({ ...values, showEmailModal: false }) };
    const handleShowEmailModal = () => { setValues({ ...values, showEmailModal: true }) };

    const handleClosePasswordModal = () => { setValues({ ...values, showPasswordModal: false }) };
    const handleShowPasswordModal = () => { setValues({ ...values, showPasswordModal: true }) };

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

            <Row className="justify-content-md-center">
                <Col md={4}>
                    <Button onClick={handleShowPasswordModal} variant="outline-primary">Edit Password</Button>
                </Col>
            </Row>

            <EditProfile type="Username" show={values.showUsernameModal} handleClose={handleCloseUsernameModal}></EditProfile>
            <EditProfile type="Email" show={values.showEmailModal} handleClose={handleCloseEmailModal}></EditProfile>
            <EditProfile type="Password" show={values.showPasswordModal} handleClose={handleClosePasswordModal}></EditProfile>
        </Container>
    )
}
export default Profile
