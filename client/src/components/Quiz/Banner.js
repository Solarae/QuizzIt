import React,{useState, useEffect} from 'react'
import { Container, Image, Button, ToggleButton } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getPlatform } from '../../actions/platformActions';
import { downvoteQuiz, upvoteQuiz } from '../../actions/quizActions';
import Modal from "./Modal/editQuestionModal"


function Banner() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const quiz = useSelector((state) => state.quiz.quiz)
    const platform = useSelector((state) => state.platforms.platform)
    const isGetLoading = useSelector((state) => state.platforms.isGetLoading);

    console.log(auth)
    console.log(quiz)

    useEffect(() => {
        console.log(quiz.platformId)
        if (!platform) dispatch(getPlatform({ id: quiz.platformId}))
    }, [dispatch, platform])

    console.log(platform)
    
    const [modal, setModal] = useState(false);
    const ToggleModal = () => setModal(!modal)

    
    if (isGetLoading || !platform) {
        return (<div>Loading...</div>)
    }
    
    const handleLike = () => {
        console.log(auth.user.id)
        console.log(quiz._id)
        dispatch(upvoteQuiz({
            userId: auth.user.id,
            id: quiz._id
        }))
    }

    const handleDislike = () => {
        dispatch(downvoteQuiz({
            userId: auth.user.id,
            id: quiz._id
        }))
    }
    return (
        <div style={{ height: "300px" }} className="position-relative">
            <div className="h-75 position-relative overflow-hidden p-3 p-md-5 text-center bg-danger">
                <div className="col-md-5 p-lg-5 mx-auto my-3">
                    <p className="lead fw-normal">Banner image goes here</p>
                </div>
            </div>
            <div className="h-25 position-relative p-3 p-md-1 bg-light" style={{overflowWrap: "break-word"}} >
                <div className="row">
                    <div className="col-6 d-flex justify-content-start" >
                        <Image style={{ width: "150px", height: "150px", marginTop: "-82px" }} className="position-relative ms-5 bg-dark" src="/quizzit_logo.png" roundedCircle />
                        <div style={{ marginLeft: "2%"}}>
                            <p className="lead fw-normal" style={{marginBottom:"10px"}}> {quiz.name} </p>
                            <p className="lead fw-normal" style={{marginBottom:"10px"}}>
                                {quiz.submissions.length} submissions
                                <i className={auth.isAuthenticated && auth.user.likes.likedQuizzes.some(e => e === quiz._id) ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"} onClick={handleLike} style={{ marginLeft: "30px", cursor: "pointer" }}></i> {quiz.likes && quiz.likes.totalLikes ? quiz.likes.totalLikes : 0}
                                <i className={auth.isAuthenticated && auth.user.likes.dislikedQuizzes.some(e => e === quiz._id) ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"} onClick={handleDislike} style={{ marginLeft: "10px", cursor: "pointer" }}></i> {quiz.likes && quiz.likes.totalDislikes ? quiz.likes.totalDislikes : 0}

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
                                    {(auth.isAuthenticated && auth.user.id == platform.owner)?<Button variant="primary btn-lg" style={{ marginLeft: "10px" }} onClick={()=>ToggleModal()}>Edit</Button>:<div></div>}
                                    <Button variant="primary btn-lg" style={{ marginLeft: "10px" }}>Subscribe</Button>
                                    <Modal show={modal} setShow = {setModal} quiz = {quiz} />
                                    <i className="bi bi-share" style={{ marginLeft: "25px" }}></i>
                                    <i className="bi bi-flag-fill" style={{ marginLeft: "20px" }}></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h5 className="ms-5">Platform Name</h5>
            </div>
        </div>
    )
}
export default Banner;
