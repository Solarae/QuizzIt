import React, { useState, useEffect } from 'react'
import { Container, Image, Button } from 'react-bootstrap';
import { joinPlatform, leavePlatform } from '../../actions/platformActions'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


function Banner({ platform, setPlatform }) {
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const platforms = useSelector((state) => state.platforms)
    const history = useHistory();

    // waits for JOIN_PLATFORM request to update redux store with any response data 
    useEffect(() => {
        console.log("JOIN_PLATFORM.loading: " + platforms.JOIN_PLATFORM.loading)
        if (!platforms.JOIN_PLATFORM.loading && platforms.JOIN_PLATFORM.platform) {
            setPlatform(platforms.JOIN_PLATFORM.platform);
        }
    }, [platforms.JOIN_PLATFORM, setPlatform]);

    // waits for LEAVE_PLATFORM request to update redux store with any response data 
    useEffect(() => {
        console.log("LEAVE_PLATFORM.loading: " + platforms.LEAVE_PLATFORM.loading)
        if (!platforms.LEAVE_PLATFORM.loading && platforms.LEAVE_PLATFORM.platform) {
            setPlatform(platforms.LEAVE_PLATFORM.platform);
        }
    }, [platforms.LEAVE_PLATFORM, setPlatform]);

    const handleJoin = () => {
        dispatch(joinPlatform({
            userId: auth.user.id,
            platformId: platform._id
        }))
    }

    const handleLeave = () => {
        dispatch(leavePlatform({
            userId: auth.user.id,
            platformId: platform._id
        }))
    }

    return (
        <div style={{ height: "300px" }} className="position-relative">
            <div className="h-75 position-relative overflow-hidden p-3 p-md-5 text-center bg-danger">
                <div className="col-md-5 p-lg-5 mx-auto my-3">
                    <p className="lead fw-normal">Banner image goes here</p>
                </div>
            </div>
            <div className="h-25 position-relative p-3 p-md-1 bg-light" style={{ overflowWrap: "break-word" }} >
                <div className="row">
                    <div className="col-6 d-flex justify-content-start" >
                        <Image style={{ width: "150px", height: "150px", marginTop: "-82px" }} className="position-relative ms-5 bg-dark" src="/quizzit_logo.png" thumbnail />
                        <div style={{ marginLeft: "2%" }}>
                            <p className="lead fw-normal" style={{ marginBottom: "10px" }}>
                                5.8k subscribers
                                <i className="bi bi-hand-thumbs-up" style={{ marginLeft: "30px" }}></i> 1.7k
                                <i className="bi bi-hand-thumbs-down" style={{ marginLeft: "10px" }}></i> 80
                            </p>
                            <p className="lead fw-normal">
                                {platform.description}
                            </p>
                        </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end" >
                        <div className="mt-2 justify-content-center" style={{ marginRight: "3%" }}>
                            <div className="position-relative" >
                                <p className="lead fw-normal justify-content-between">
                                    <Button variant="primary btn-lg" >Edit</Button>
                                    {platform.subscribers.includes(auth.user.id) ?
                                        <Button onClick={handleLeave} variant="secondary btn-lg" style={{ marginLeft: "10px" }}>Unsubscribe</Button>
                                        : <Button onClick={handleJoin} variant="primary btn-lg" style={{ marginLeft: "10px" }}>Subscribe</Button>}
                                    <i className="bi bi-share" style={{ marginLeft: "25px" }}></i>
                                    <i className="bi bi-flag-fill" style={{ marginLeft: "20px" }}></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h4 className="ms-5 mt-1">{platform.name}</h4>
            </div>
        </div>
    )
}
export default Banner;
