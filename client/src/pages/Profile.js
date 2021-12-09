import React, { useState } from 'react'
import { Container, Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import EditProfile from '../components/Profile/EditProfile';
import DeleteProfile from '../components/Profile/DeleteProfile';

function Profile() {
    const auth = useSelector((state) => state.auth)

    if(!auth.user){
        return (
            <div>Loading...</div>
        )
    }

    return (
        <Container>
            <h2 className='text-center m-3'>{auth.user.username}'s Profile page</h2>

        </Container>
    )
}
export default Profile
