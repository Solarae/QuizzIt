import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col, Nav, FloatingLabel, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Banner from '../components/Platform/Banner.js'
import DeletePlatform from '../components/EditPlatform/DeletePlatform.js'
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

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = useCallback(() => { setShowDelete(false) }, []);
    const handleShowDelete = () => { setShowDelete(true) };

    if (isGetLoading) {
        return (<div>Loading...</div>)
    }
    return (
        <div className="justify-content-between">
            {Object.keys(platform).length !== 0 ? <Banner platform={platform} ></Banner> : <div></div>}

            <div style={{ height: "50px" }}></div>

            <div >
                <div className="row">
                    <div className="col" style={{}}>
                        <Container>

                            <h2 className='text-center m-3'>Platform Edit page</h2>
                            <Row className="justify-content-md-center">
                                <Col md={4}>
                                    <Button onClick={handleShowDelete} variant="outline-danger">Delete Platform</Button>
                                </Col>
                            </Row>
                        </Container>

                    </div>
                </div>
            </div>

            <DeletePlatform show={showDelete} handleClose={handleCloseDelete}></DeletePlatform>
        </div >
    )
}
export default EditPlatform;
