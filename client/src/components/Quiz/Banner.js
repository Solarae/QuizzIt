import React from 'react'
import { Container, Image, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'


function Banner({ quizId }) {
    const quiz = useSelector((state) => state.quiz.quiz)
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
                                5.8k submissions
                                <i className="bi bi-hand-thumbs-up" style={{ marginLeft: "30px" }}></i> 1.7k
                                <i className="bi bi-hand-thumbs-down" style={{ marginLeft: "10px" }}></i> 80
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
                                    <Button variant="primary btn-lg" style={{ marginLeft: "10px" }}>Subscribe</Button>
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
