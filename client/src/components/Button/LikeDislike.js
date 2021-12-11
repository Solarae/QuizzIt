import React from 'react'
import { useSelector } from 'react-redux'

function LikeDislike({ handleLike, handleDislike, style }) {
    const user = useSelector((state) => state.auth.user)
    const quiz = useSelector((state) => state.quiz.quiz)
    console.log(quiz)
    return user ? 
        <span style={style}>
            <i className={quiz.likes.likedBy.includes(user.id) ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"} onClick={handleLike} style={{ cursor: "pointer" }}>
                {quiz.likes && quiz.likes.totalLikes ? quiz.likes.totalLikes : 0}</i> 
            <i className={quiz.likes.dislikedBy.includes(user.id) ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"} onClick={handleDislike} style={{ marginLeft: "10px", cursor: "pointer" }}>
            {quiz.likes && quiz.likes.totalDislikes ? quiz.likes.totalDislikes : 0}</i> 
        </span>
        : <span style={style}>
            <i className= "bi bi-hand-thumbs-up" onClick={handleLike} style={{cursor: "pointer" }}>
            {quiz.likes && quiz.likes.totalLikes ? quiz.likes.totalLikes : 0}</i> 
            <i className= "bi bi-hand-thumbs-down" onClick={handleDislike} style={{ marginLeft: "30px", cursor: "pointer" }}>
            {quiz.likes && quiz.likes.totalDislikes ? quiz.likes.totalDislikes : 0}</i> 
        </span>
}

export default LikeDislike