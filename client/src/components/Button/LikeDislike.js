import React from 'react'
import { useSelector } from 'react-redux'

function LikeDislike({ handleLike, handleDislike, likedKey, dislikedKey, object }) {
    const auth = useSelector((state) => state.auth)
    // const liked = auth.user.likes[likedKey]
    // const disliked = auth.user.likes[dislikedKey]
    return auth.user ? 
        <React.Fragment>
            <i className={auth.user.likes[likedKey].some(e => e === object._id) ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"} onClick={handleLike} style={{ marginLeft: "30px", cursor: "pointer" }}>
                {object.likes && object.likes.totalLikes ? object.likes.totalLikes : 0}</i> 
            <i className={auth.user.likes[dislikedKey].some(e => e === object._id) ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"} onClick={handleDislike} style={{ marginLeft: "10px", cursor: "pointer" }}>
            {object.likes && object.likes.totalDislikes ? object.likes.totalDislikes : 0}</i> 
        </React.Fragment>
        : <React.Fragment>
            <i className= "bi bi-hand-thumbs-up" onClick={handleLike} style={{ marginLeft: "30px", cursor: "pointer" }}>
            {object.likes && object.likes.totalLikes ? object.likes.totalLikes : 0}</i> 
            <i className= "bi bi-hand-thumbs-down" onClick={handleDislike} style={{ marginLeft: "30px", cursor: "pointer" }}>
            {object.likes && object.likes.totalDislikes ? object.likes.totalDislikes : 0}</i> 
        </React.Fragment>
}

export default LikeDislike