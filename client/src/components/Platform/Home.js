import React, { useState } from 'react'
import { Row, Col, Dropdown } from 'react-bootstrap';
import QuizCardMini from '../Cards/QuizCardMini.js';
import mongoose from 'mongoose'

function Home({ quizzesData }) {

    // available sorts (oldest, newest)
    const [sort, setSort] = useState("newest");

    // compares the creation time of mongo documents a and b
    const compareDates = (a, b) => {
        if (sort === "oldest") {
            return mongoose.Types.ObjectId(a._id).getTimestamp() - mongoose.Types.ObjectId(b._id).getTimestamp()
        }
        else if (sort === "newest") {
            return mongoose.Types.ObjectId(b._id).getTimestamp() - mongoose.Types.ObjectId(a._id).getTimestamp()
        }
        else {
            return 0;
        }
    }

    return (
        <div className="position-relative container justify-content-center" style={{ marginTop: "13px" }}>

            <Dropdown >
                <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
                    <i class="bi bi-arrow-down"></i>Sort
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="" onClick={() => { setSort("oldest") }}>Oldest {sort === "oldest" && <i class="bi bi-check"></i>}</Dropdown.Item>
                    <Dropdown.Item href="" onClick={() => { setSort("newest") }}>Newest {sort === "newest" && <i class="bi bi-check"></i>}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <div>
                {quizzesData && quizzesData.length > 0 ?
                    (
                        <Row xs={1} md={4} className="g-4 me-auto">
                            {quizzesData.sort(compareDates).map((quiz, idx) => (
                                <Col align="center">
                                    <QuizCardMini quiz={quiz} showPlatform={false}></QuizCardMini>
                                </Col>
                            ))}
                        </Row>
                    )
                    :
                    (
                        <div className="position-relative container d-flex justify-content-center" style={{ marginTop: "13px" }}>
                            This platform does not have any quizzes yet
                        </div>
                    )

                }
            </div>

        </div>
    )
}
export default Home;
