import React,{useState, useEffect, useCallback, useRef } from 'react'
import { Image, Button, Overlay, Tooltip, Toast } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { getPlatform } from '../../actions/platformActions';
import { downvoteQuiz, upvoteQuiz } from '../../actions/quizActions';
import EditQuizModal from "./Modal/editQuizModal"
import DeleteQuizModal from './Modal/deleteQuizModal';
import PublishQuizModal from './Modal/publishQuizModal'
import Loading from '../Loading'

import SignUp from '../SignUp.js';
import SignIn from '../SignIn.js';
import LikeDislike from '../Button/LikeDislike';
import { useHistory,Link } from 'react-router-dom';
import Report from './Report';
import axios from "axios"
import { URL } from '../../config';

function Banner({ isEdit }) {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const quiz = useSelector((state) => state.quiz.quiz)
    const platform = useSelector((state) => state.platforms.platform)
    const isGetLoading = useSelector((state) => state.platforms.isGetLoading);
    const history = useHistory()

    const [showSignIn, setShowSignIn] = useState(false);
    const handleCloseSignIn = () => { setShowSignIn(false) };
    const handleShowSignIn = () => { setShowSignIn(true) };

    const [showSignUp, setShowSignUp] = useState(false);
    const handleCloseSignUp = () => { setShowSignUp(false) };
    const handleShowSignUp = () => { setShowSignIn(false); setShowSignUp(true) };

    const [deleteModal, setDeleteModal] = useState(false);
    const ToggleDeleteModal = () => setDeleteModal(!deleteModal)

    const [editModal, setEditModal] = useState(false);
    const ToggleEditModal = () => setEditModal(!editModal)

    const [publishModal, setPublishModal] = useState(false);
    const TogglePublishModal = () => setPublishModal(!publishModal)

    const [showReport, setShowReport] = useState(false);
    const handleCloseReport = useCallback(() => { setShowReport(false) }, []);
    const handleShowReport = () => { setShowReport(true) };

    // used to show tooltip after clicking "share" button
    const [showTooltip, setShowTooltip] = useState(false);
    const targetTooltip = useRef(null);
    const [isModerator,setIsModerator] = useState(false)
    useEffect(() => {

        // const fetchRole = async () =>{
        //     if(auth.user && platform){
        //         //check if user is moderator of platform
        //         console.log(platform)
        //         let res = await axios.get(`${URL}/api/users/checkIfModeratorOfPlatform/${auth.user.id}/${platform._id}`)
        //         console.log(res.data)
        //         if (res.data && res.data.user){
        //             setIsModerator(true)
        //         }
        //     }
        // }
        // fetchRole()
        console.log(quiz.platformId)
        dispatch(getPlatform({ id: quiz.platformId}))
    }, [dispatch, quiz,auth.user])    

    const [showReportToast, setShowReportToast] = useState(false);
    if (isGetLoading || !platform) {
        return (
            <Loading />
        )
    }
    
    const handleLike = () => {
        if (auth.user === null) {
            handleShowSignIn()
            return 
        }
        dispatch(upvoteQuiz({
            userId: auth.user.id,
            id: quiz._id
        }))
    }

    const handleDislike = () => {
        if (auth.user === null) {
            handleShowSignIn()
            return 
        }
        dispatch(downvoteQuiz({
            userId: auth.user.id,
            id: quiz._id
        }))
    }

    const redirectEdit = () => {
        history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}/edit`)
    }
    console.log(platform)
    return (
        <div style={{ height: "300px" }} className="position-relative">
            <div className="h-75 position-relative overflow-hidden p-3 p-md-5 text-center" style={{ background: "#227093"  }}>
            </div>
            <div className="h-25 position-relative p-3 p-md-1 bg-light" style={{overflowWrap: "break-word"}} >
                <div className="row">
                    <div className="col-6 d-flex justify-content-start" style={{}} >
                        <Image style={{ width: "220px", height: "150px", marginTop: "-82px"}}  className="position-relative ms-5 bg-dark" src={quiz.thumbnail ? quiz.thumbnail : "/quizzit_logo.png"} thumbnail />
                        <div style={{ marginLeft: "2%"}}>
                            <p className="lead fw-normal" style={{marginBottom:"10px"}}> {quiz.name} </p>
                            <p className="lead fw-normal" style={{marginBottom:"10px"}}>
                                {quiz.submissionCount} submissions
                                <LikeDislike handleLike={handleLike} handleDislike={handleDislike}> </LikeDislike>
                            </p>
                            <p className="lead fw-normal">
                                {quiz.description}
                            </p>
                        </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end" >
                        <div className="mt-2 justify-content-center" style={{ marginRight: "3%" }}>
                            <div className="position-relative" >
                                <p className="lead fw-normal justify-content-between">
                                    {(auth.isAuthenticated && auth.user.id === platform.owner) && (isEdit?<Button variant="primary btn-lg" style={{ marginLeft: "10px" }} onClick={()=>ToggleEditModal()}>Edit</Button>:<Button variant="primary btn-lg" style={{ marginLeft: "10px" }} onClick={()=>redirectEdit()}>Edit</Button>)}
                                    {(auth.isAuthenticated && auth.user.id === platform.owner && quiz.status === 'draft') && <Button variant="primary btn-lg" style={{ marginLeft: "10px" }} onClick={()=>TogglePublishModal()}>Publish</Button>}
                                    {(auth.isAuthenticated && auth.user.id === platform.owner) && <Button variant="primary btn-lg" style={{ marginLeft: "10px" }} onClick={()=>ToggleDeleteModal()}>Delete</Button>}
                                    <EditQuizModal show={editModal} setShow = {setEditModal} quiz = {quiz} />
                                    <PublishQuizModal show={publishModal} setShow = {setPublishModal} quiz={quiz} />
                                    <DeleteQuizModal show={deleteModal} setShow = {setDeleteModal} quiz={quiz} />
                                    {/* { isModerator == true ? <Link to={`/viewQuizReport/${platform._id}`}> <Button >View Quiz Reports</Button></Link> : <></> } */}
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
            <div className="ms-5 mt-1" style={{ width: '220px', textAlign: "center"}}>
                <h4>{quiz.name}</h4>
            </div>
            <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} />
            <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
            
            <Report setShowReportToast={setShowReportToast} quizId={quiz._id} show={showReport} handleClose={handleCloseReport}></Report>
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



        </div>
    )
}
export default Banner;
