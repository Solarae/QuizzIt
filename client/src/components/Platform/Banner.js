import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Container, Image, Button, OverlayTrigger, Overlay, Tooltip } from 'react-bootstrap';
import { joinPlatform, leavePlatform } from '../../actions/platformActions'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import Report from './Report.js'

function Banner({ platform }) {
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory();

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

    const [showReport, setShowReport] = useState(false);
    const handleCloseReport = useCallback(() => { setShowReport(false) }, []);
    const handleShowReport = () => { setShowReport(true) };

    // used to show tooltip after clicking "share" button
    const [showTooltip, setShowTooltip] = useState(false);
    const targetTooltip = useRef(null);

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
                                    <Link to={`/platform/${platform._id}/edit`}><Button variant="primary btn-lg" >Edit</Button></Link>
                                    {platform.subscribers.includes(auth.user.id) ?
                                        <Button onClick={handleLeave} variant="secondary btn-lg" style={{ marginLeft: "10px" }}>Unsubscribe</Button>
                                        : <Button onClick={handleJoin} variant="primary btn-lg" style={{ marginLeft: "10px" }}>Subscribe</Button>
                                    }

                                    <CopyToClipboard text={window.location.href}>
                                        <i className="bi bi-share"
                                            ref={targetTooltip}
                                            onMouseLeave={() => setShowTooltip(false)}
                                            onClick={() => setShowTooltip(true)}
                                            style={{ marginLeft: "25px", cursor: "pointer" }}></i>
                                    </CopyToClipboard>
                                    <Overlay target={targetTooltip.current} show={showTooltip} placement="top">
                                        {(props) => (
                                            <Tooltip id="overlay-example" {...props}>
                                                Link copied
                                            </Tooltip>
                                        )}
                                    </Overlay>
                                    <i className="bi bi-flag-fill" style={{ marginLeft: "20px", cursor: "pointer" }} onClick={handleShowReport}></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h4 className="ms-5 mt-1">{platform.name}</h4>
            </div>

            <Report platformId={platform._id} show={showReport} handleClose={handleCloseReport}></Report>
        </div>
    )
}
export default Banner;
