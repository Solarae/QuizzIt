import React from 'react'
import { useSelector } from 'react-redux'


function Banner() {
    const quiz = useSelector((state) => state.quiz.quiz)
    return (
        <div style={{ height: "300px" }} className="position-relative">
            <div className="h-75 position-relative overflow-hidden p-3 p-md-5 text-center bg-danger">
                <div className="col-md-5 p-lg-5 mx-auto my-3">
                </div>
            </div>
        </div>
    )
}
export default Banner;
