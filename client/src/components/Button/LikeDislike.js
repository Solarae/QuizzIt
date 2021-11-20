import React from 'react'
import { useSelector } from 'react-redux'

function LikeDislike({ handleLike, handleDislike, likedKey, dislikedKey, object, style }) {
    const user = useSelector((state) => state.auth.user)
    // const liked = auth.user.likes[likedKey]
    // const disliked = auth.user.likes[dislikedKey]
    return user ? 
        <span style={style}>
            <i className={user.likes[likedKey].some(e => e === object._id) ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"} onClick={handleLike} style={{ cursor: "pointer" }}>
                {object.likes && object.likes.totalLikes ? object.likes.totalLikes : 0}</i> 
            <i className={user.likes[dislikedKey].some(e => e === object._id) ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"} onClick={handleDislike} style={{ marginLeft: "10px", cursor: "pointer" }}>
            {object.likes && object.likes.totalDislikes ? object.likes.totalDislikes : 0}</i> 
        </span>
        : <span style={style}>
            <i className= "bi bi-hand-thumbs-up" onClick={handleLike} style={{cursor: "pointer" }}>
            {object.likes && object.likes.totalLikes ? object.likes.totalLikes : 0}</i> 
            <i className= "bi bi-hand-thumbs-down" onClick={handleDislike} style={{ marginLeft: "30px", cursor: "pointer" }}>
            {object.likes && object.likes.totalDislikes ? object.likes.totalDislikes : 0}</i> 
        </span>
}

export default LikeDislike