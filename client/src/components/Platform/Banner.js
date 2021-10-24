import React from 'react'
import { Container, Image, Button } from 'react-bootstrap';

function Banner({ platformId }) {
    return (
        <div style={{ height: "300px" }} class="position-relative">
            <div class="h-75 position-relative overflow-hidden p-3 p-md-5 text-center bg-danger">
                <div class="col-md-5 p-lg-5 mx-auto my-3">
                    <p class="lead fw-normal">Banner image goes here</p>
                </div>
            </div>
            <div class="h-25 position-relative overflow-hidden p-3 p-md-1 bg-light">
                <div className="" >
                    <div className="position-absolute" style={{ marginLeft: "210px" }}>
                        <p class="lead fw-normal">5.8k subscribers</p>
                    </div>
                    <div className="position-absolute top-50" style={{ marginLeft: "210px" }}>
                        <p class="lead fw-normal">Platform Description</p>
                    </div>
                </div>
                <div className="" style={{ marginLeft: "410px"}}  >
                    <div className="position-absolute" >
                        <p className="lead fw-normal justify-content-between">
                            <i class="bi bi-hand-thumbs-up"></i> 1.7k
                            <i class="bi bi-hand-thumbs-down" style={{marginLeft: "10px"}}></i> 80 
                        </p>
                    </div>
                </div>
                <div className="" style={{ marginLeft: "78%"}} className="mt-2 justify-content-center">
                    <div className="position-absolute" >
                        <p className="lead fw-normal justify-content-between">
                            <Button variant="primary btn-lg" >Edit</Button>
                            <Button variant="primary btn-lg" style={{marginLeft: "10px"}}>Subscribe</Button>
                            <i class="bi bi-share" style={{marginLeft: "25px"}}></i> 
                            <i class="bi bi-flag-fill" style={{marginLeft: "20px"}}></i> 
                        </p>
                    </div>
                </div>
            </div>
            <Image style={{ width: "150px", height: "150px" }} className="position-absolute top-50 start-0 ms-5 bg-dark" src="/quizzit_logo.png" roundedCircle thumbnail />
            <div>
                <h4 className="ms-5 mt-1">Platform Name</h4>
            </div>
        </div>
    )
}
export default Banner;
