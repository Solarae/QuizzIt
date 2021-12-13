import React from 'react'
import { useSelector } from 'react-redux'


function Banner({ q = {} }) {
    const quiz = useSelector((state) => state.quiz.quiz)
    return (
            <div style={{ height: "100px" }} className="position-relative">
                <div className="h-75 position-relative overflow-hidden p-3 p-md-5 text-center" style={{ background: "#227093" }}>
                    <h2 align="start" className="font-weight-bold" style={{ color: "white" }}>{quiz ? quiz.name : q.name}</h2>
                </div>
            </div>
        )
}
export default Banner;
