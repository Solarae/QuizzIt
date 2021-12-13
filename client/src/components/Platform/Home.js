import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row, Col, Dropdown } from 'react-bootstrap';
import QuizCardMini from '../Cards/QuizCardMini.js';
import { getQuizzes } from '../../actions/platformActions.js';
import Loading from '../Loading'

function Home() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const platform = useSelector((state) => state.platforms.platform)
    const { isGetQuizzesLoading, quizzes } = useSelector((state) => state.platforms);
    const pages = useSelector((state) => state.platforms.quizPages)
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('submissionCount desc')

    useEffect(() => {
        console.log("CALLING API")
        dispatch(getQuizzes(
            {
                platformId: platform._id,
                'expand' : "platformId(select=name,icon)",
                sort,
                offset: 0,
                limit: 4 * page
            }
        ))
    }, [sort, page, platform, dispatch]);
    
    const showMoreQuizzes = () => {
        if (page < pages)
            setPage(page + 1)
    }
    if (isGetQuizzesLoading && !quizzes) {
        return (
            <Loading />
        )
    }

    return (
        <div className="position-relative container justify-content-center" style={{ marginTop: "13px" }}>

            <Dropdown >
                <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
                    <i class="bi bi-arrow-down"></i>Sort
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item href="" onClick={() => { setSort("submissionCount desc") }}>Popular {sort === "submissionCount desc" && <i class="bi bi-check"></i>}</Dropdown.Item>
                    <Dropdown.Item href="" onClick={() => { setSort("_id desc") }}>Oldest {sort === "_id desc" && <i class="bi bi-check"></i>}</Dropdown.Item>
                    <Dropdown.Item href="" onClick={() => { setSort("_id asc") }}>Newest {sort === "_id asc" && <i class="bi bi-check"></i>}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {console.log(quizzes)}
            {quizzes && quizzes.length > 0 ?
                (
                    <div>
                        <Row xs={1} md={4} className="g-4 me-auto">
                        {quizzes.map((quiz, idx) => (
                            <Col align="center">
                                <QuizCardMini quiz={quiz} showPlatform={false}></QuizCardMini>
                            </Col>
                        ))}
                        </Row>
                        <Row >
                            {page < pages && <Button variant="outline-light" onClick={showMoreQuizzes} style={{ color: "black", marginTop: "10px" }}>View More</Button>}
                        </Row>
                    </div>
                )
                :
                (
                    <div className="position-relative container d-flex justify-content-center" style={{ marginTop: "13px" }}>
                        This platform does not have any quizzes yet
                    </div>
                )

            }
          

        </div>
    )
}
export default Home;
