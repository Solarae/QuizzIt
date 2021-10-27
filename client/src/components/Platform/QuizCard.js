import React from 'react'
import { Container, Image, Button, Card } from 'react-bootstrap';

function QuizCard({ quizId }) {
    return (
        <Card bg="white" style={{ width: "220px" }} >
            <Card.Header style={{fontSize: "11pt"}}>Quiz Title</Card.Header>
            <Card.Img variant="top" src="/quizzit_logo.png" style={{ width: "220px", height: "175px", background: "black" }} />
            <Card.Footer style={{background:"white"}}>
                <small className="text-muted"><i class="bi bi-people-fill"></i> 4.1k Taken<i class="bi bi-dot"></i>5d ago</small>
            </Card.Footer>
        </Card>
    )
}
export default QuizCard;