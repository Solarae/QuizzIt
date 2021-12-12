import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Image, Button, Overlay, Tooltip, Toast } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import SignUp from '../SignUp.js';
import SignIn from '../SignIn.js';
import Report from './Report.js'
import Subscribe from '../Button/Subscribe';
import CreateQuiz from '../EditPlatform/CreateQuiz'
import { URL } from '../../config.js';

function Banner({ platform }) {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    let location = useLocation();

    const [showSignIn, setShowSignIn] = useState(false);
    const handleCloseSignIn = () => { setShowSignIn(false) };
    const handleShowSignIn = () => { setShowSignIn(true) };

    const [showSignUp, setShowSignUp] = useState(false);
    const handleCloseSignUp = () => { setShowSignUp(false) };
    const handleShowSignUp = () => { setShowSignIn(false); setShowSignUp(true) };

    const [showReport, setShowReport] = useState(false);
    const handleCloseReport = useCallback(() => { setShowReport(false) }, []);
    const handleShowReport = () => {
        if (auth.user === null) {
            handleShowSignIn()
            return
        }
        setShowReport(true)
    };

    const [showCreateQuiz, setShowCreateQuiz] = useState(false);

    // used to show tooltip after clicking "share" button
    const [showTooltip, setShowTooltip] = useState(false);
    const targetTooltip = useRef(null);

    const [showReportToast, setShowReportToast] = useState(false);


    const [isModerator,setIsModerator] = useState(false)
    useEffect(() => {

        const fetchRole = async () =>{
            if(auth.user){
                //check if user is moderator of platform
                console.log(platform)
                let res = await axios.get(`${URL}/api/users/checkIfModeratorOfPlatform/${auth.user.id}/${platform._id}`)
                console.log(res.data)
                if (res.data && res.data.user){
                    setIsModerator(true)
                }
            }
        }
        fetchRole()
    }, [dispatch,platform,auth.user])    

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
                                    {(auth.user && auth.user.id === platform.owner && !location.pathname.endsWith("edit")) ? <Link to={`/platform/${platform._id}/edit`}><Button variant="primary btn-lg" style={{marginRight: "10px"}} >Edit</Button></Link> : <span></span>}
                                    { isModerator == true ? <Link to={`/viewQuizReport/${platform._id}`}> <Button >View Quiz Reports</Button></Link> : <></> }{' '}
                                    <Subscribe platform={platform} />
                                    <Button onClick={() => { setShowCreateQuiz(true) }} >Create Quiz</Button>
                                    <CreateQuiz show={showCreateQuiz} handleClose={() => { setShowCreateQuiz(false) }}></CreateQuiz>
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

            <Report setShowReportToast={setShowReportToast} platformId={platform._id} show={showReport} handleClose={handleCloseReport}></Report>
            <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} />
            <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
            <Toast
                show={showReportToast}
                animation
                autohide={true}
                delay={2500}
                onClose={()=>{setShowReportToast(false)}}
                className="position-absolute top-0 end-0"
                style={{ marginRight: "5px", marginTop: "5px", width:"auto", fontSize:"12pt" }}
            >
                <Toast.Body>Report Submitted</Toast.Body>
            </Toast>
        </div >
    )
}
export default Banner;
