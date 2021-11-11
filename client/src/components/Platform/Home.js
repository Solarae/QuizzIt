import React from "react";
import { Container, Image, Button, Row, Col } from "react-bootstrap";
import QuizCard from "./QuizCard.js";

function Home({ platform }) {
  return (
    <div
      className="position-relative container justify-content-center"
      style={{ marginTop: "13px" }}
    >
      {platform.quizzesData && platform.quizzesData.length > 0 ? (
        <Row xs={1} md={4} className="g-4 me-auto">
          {platform.quizzesData.map((quiz, idx) => (
            <Col align="center">
              <QuizCard quiz={quiz}></QuizCard>
            </Col>
          ))}
        </Row>
      ) : (
        <div>This platform does not have any quizzes yet</div>
      )}
    </div>
  );
}
export default Home;
