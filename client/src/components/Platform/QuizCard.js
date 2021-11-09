import React from 'react'
import { Container, Image, Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import mongoose from 'mongoose'
import moment from 'moment'

function QuizCard({ quiz }) {
    let location = useLocation();
    const history = useHistory()


    const routeToQuiz = () => {
        if (location.pathname.endsWith('edit')) {
            history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}/edit`);
        }
        else {
            history.push(`/platform/${quiz.platformId}/quiz/${quiz._id}`);
        }
    }
    
    const createdAt = mongoose.Types.ObjectId(quiz._id).getTimestamp();

    return (
        <Card bg="white" style={{ width: "250px", cursor: "pointer" }} onClick={routeToQuiz} >

            {location.pathname.endsWith("edit") && (<i className="bi bi-pencil-square position-absolute top-0 start-100 translate-middle" style={{ fontSize: "1.3rem" }}></i>)}

            <Card.Header style={{ fontSize: "11pt" }}>{quiz.name}</Card.Header>
            <Card.Img variant="top" src="/quizzit_logo.png" style={{ width: "250px", height: "175px", background: "black" }} />
            <Card.Footer style={{ background: "white", fontSize: "0.9rem" }}>
                <small className="text-muted"><i class="bi bi-people-fill"></i> {quiz.submissions.length} Taken<i class="bi bi-dot"></i>{moment(createdAt).fromNow()}</small>
            </Card.Footer>
        </Card>
    )
}
export default QuizCard;