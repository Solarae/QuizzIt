import React from 'react'
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux'

function Subscribe({ handleLeave, handleJoin, platform }) {
    const user = useSelector((state) => state.auth.user)
  
    return (
        <React.Fragment>
            {user && platform.subscribers.some((s) => s.userId === user.id) ?
            <Button onClick={handleLeave} variant="secondary btn-lg" style={{ marginLeft: "10px" }}>Unsubscribe</Button>
            : <Button onClick={handleJoin} variant="primary btn-lg" style={{ marginLeft: "10px" }}>Subscribe</Button>}
        </React.Fragment>
    )
}

export default Subscribe