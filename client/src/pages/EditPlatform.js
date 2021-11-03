import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col, Nav, FloatingLabel, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Banner from '../components/Platform/Banner.js'
import EditInfo from '../components/EditPlatform/EditInfo.js'
import AwardSection from '../components/EditPlatform/AwardSection.js'
import { getPlatform } from '../actions/platformActions'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

function EditPlatform() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const auth = useSelector((state) => state.auth)
    const platform = useSelector((state) => state.platforms.platform)
    const isGetLoading = useSelector((state) => state.platforms.isGetLoading);

    let { id } = useParams();  // get the platform ID from the url

    // dispatch the GET_PLATFORM request on initial render
    useEffect(() => {
        dispatch(getPlatform({
            id: id
        }))
    }, [id, dispatch]);


    if (isGetLoading) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="justify-content-between">
            {Object.keys(platform).length !== 0 ? <Banner platform={platform} ></Banner> : <div></div>}

            <div style={{ height: "50px" }}></div>

            <div >
                <h2 className='text-center m-3'>Platform Edit page</h2>
                <AwardSection platform={platform}></AwardSection>
                <hr/>
                <EditInfo platform={platform}></EditInfo>
            </div>

        </div >
    )
}
export default EditPlatform;
