import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import Banner from '../components/Profile/Banner';

import { getProfile } from '../actions/profileActions'

function Profile() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const { profile, isGetProfileLoading } = useSelector((state) => state.profile) 
    
    let { id } = useParams();  // get the user ID from the url
    
    useEffect(() => {
        dispatch(getProfile({
            id: id
        }))
    }, [id, dispatch]);


    if (isGetProfileLoading || !profile) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="justify-content-between">
            <Banner user={profile}></Banner>
            <h2 className='text-center m-3'>{profile.username}'s Profile page</h2>

        </div>
    )
}
export default Profile
