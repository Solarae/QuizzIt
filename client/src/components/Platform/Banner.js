import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Container, Image, Button, OverlayTrigger, Overlay, Tooltip } from 'react-bootstrap';
import { joinPlatform, leavePlatform, editPlatform } from '../../actions/platformActions'
import { updateUser } from '../../actions/profileActions'
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

    const handleLike = () => {
        let likes = auth.user.likes
        let platform_likes = platform.likes

        


        dispatch(updateUser({
            newValue: { likes: likes },
            userId: auth.user.id
        }))
        dispatch(editPlatform(
            {
                newValue: {
                    likes: platform_likes
                },
                userId: auth.user.id,
                platformId: platform._id,
                confirmPassword: ""
            }))
    }

    const handleDislike = () => {
        let likes = auth.user.likes
        let platform_likes = platform.likes

  

        dispatch(updateUser({
            newValue: { likes: likes },
            userId: auth.user.id
        }))
        dispatch(editPlatform(
            {
                newValue: {
                    likes: platform_likes
                },
                userId: auth.user.id,
                platformId: platform._id,
                confirmPassword: ""
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
            <div className="h-75 position-relative overflow-hidden p-3 p-md-5 text-center bg-danger" style={{ backgroundImage: `url(${platform.banner})` }}>
            </div>
            <div className="h-25 position-relative p-3 p-md-1 bg-light" style={{ overflowWrap: "break-word" }} >
                <div className="row">
                    <div className="col-6 d-flex justify-content-start" >
                        <Image style={{ width: "150px", height: "150px", marginTop: "-82px" }} className="position-relative ms-5 bg-dark" src={platform.icon && platform.icon !== "" ? platform.icon : "/quizzit_logo.png"} thumbnail />
                        <div style={{ marginLeft: "2%" }}>
                            <p className="lead fw-normal" style={{ marginBottom: "10px" }}>
                                <i class="bi bi-people-fill"></i> {platform.subscribers.length} Subscribers
                                <i className={auth.user.likes.likedPlatforms.some(e => e === platform._id) ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"} onClick={handleLike} style={{ marginLeft: "30px", cursor: "pointer" }}></i> {platform.likes && platform.likes.totalLikes ? platform.likes.totalLikes : 0}
                                <i className={auth.user.likes.dislikedPlatforms.some(e => e === platform._id) ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"} onClick={handleDislike} style={{ marginLeft: "10px", cursor: "pointer" }}></i> {platform.likes && platform.likes.totalDislikes ? platform.likes.totalDislikes : 0}
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
                                    {platform.subscribers.some((s) => s.userId===auth.user.id) ?
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
        </div >
    )
}
export default Banner;
