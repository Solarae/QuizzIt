import React, { useState } from 'react'
import { Nav, Navbar, Container, Form, Button, Image, Row, Col, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import EditProfile from '../components/EditProfile';

function Profile() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory()

    const [values, setValues] = useState({
        showEditModal: false
    })

    const handleCloseEditModal = () => { setValues({ ...values, showEditModal: false }) };
    const handleShowEditModal = () => { setValues({ ...values, showEditModal: true }) };

    return (
        <Container>
            <h2 className='text-center m-3'>{auth.user.username}'s Profile page</h2>
            <Button onClick={handleShowEditModal} variant="outline-primary">Edit Profile</Button>

            <EditProfile show={values.showEditModal} handleClose={handleCloseEditModal}></EditProfile>
        </Container>
    )
}
export default Profile
