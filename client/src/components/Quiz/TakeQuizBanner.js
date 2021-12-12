import React from 'react'
import { useSelector } from 'react-redux'


function Banner() {
    const quiz = useSelector((state) => state.quiz.quiz)
    return (
        <div style={{ height: "100px" }} className="position-relative">
            <div className="h-75 position-relative overflow-hidden p-3 p-md-5 text-center bg-danger" style={{ backgroundImage: `url(${quiz.thumbnail})`, opacity: 0.5 }}></div>
        </div>
    )
}
export default Banner;
