import { React, useEffect, useState, createRef, useRef } from 'react'
import { Container, Col, Button, Row, Card } from 'react-bootstrap';

import Banner from '../components/Quiz/Banner'
import EditQuestionCard from '../components/Question/EditQuestionCard'
import AddQuestion from '../components/Question/AddQuestion'
import EditQuestion from '../components/Question/EditQuestion'
import NotFound from '../components/NotFound';
import { deleteQuizQuestion, getQuiz } from '../actions/quizActions'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'

// custom hook for getting reference to previous values/props
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function EditQuiz() {
    // ref to div that has scrollbar for quesiton button list 
    const btnListRef = createRef()

    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const isLoading = useSelector((state) => state.quiz.isLoading)
    const quiz = useSelector((state) => state.quiz.quiz)
    const [qno, setqno] = useState(quiz && quiz.questions.length !== 0 ? 0 : -1)
    const prevQuizLength = usePrevious(quiz ? quiz.questions.length : 0)
    const [question, setQuestion] = useState(null)
    // const platform = useSelector((state) => state.platform.platform)

    let { qid } = useParams()

    useEffect(() => {
        dispatch(getQuiz(qid, {
            expand: 'platformId(select=name,owner,icon,banner,subscribers)'
        }))
    }, [dispatch, qid])


    console.log(quiz)
    // useEffect(() => {
    //     if (!platform) dispatch(getQuiz(id))
    // }, [dispatch, platform])

    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const handleShowAddQuestion = () => { setShowAddQuestion(true) };
    const handleCloseAddQuestion = () => { setShowAddQuestion(false) };
    const [showEditQuestion, setShowEditQuestion] = useState(false);
    const handleShowEditQuestion = () => { setShowEditQuestion(true) };
    const handleCloseEditQuestion = () => { setShowEditQuestion(false) };

    const handlePrev = () => {
        setqno(qno - 1)
        setQuestion(quiz.questions[qno - 1])
        btnListRef.current.scrollTop = 20 * (qno - 1) // scrolls to the button in the button list
    }

    const handleNext = () => {
        setqno(qno + 1)
        setQuestion(quiz.questions[qno + 1])
        btnListRef.current.scrollTop = 20 * (qno + 1) // scrolls to the button in the button list
    }

    const handleJumpto = (idx) => {
        setqno(idx)
        setQuestion(quiz.questions[idx])
    }

    // jumps to last question when this page loads
    useEffect(() => {
        if (!quiz) return;

        if (quiz.questions.length === 0) {
            setqno(-1)
            setQuestion(null)
            return
        }
        if (quiz.questions.length !== prevQuizLength) {
            handleJumpto(quiz.questions.length - 1)
        }
    }, [dispatch, quiz])

    if (isLoading) {
        return (<Loading />)
    }

    const hasWritePermissions = (id) => {
        return id === quiz.owner || id === quiz.platformId.owner
            || quiz.platformId.subscribers.find(s => s.userId === id && s.role === 'Moderator') !== undefined
            ? true : false
    }

    const handleDeleteQuestion = (e) =>{
        console.log(question)

        dispatch(deleteQuizQuestion({

            quizId:qid,
            questionId:question._id

        }))



    }

    if (user == null || !hasWritePermissions(user.id))
        return <NotFound />

    return (
        <div className="justify-content-between">
            <Banner isEdit={true}></Banner>
            <div style={{ height: "10vh" }}></div>

            <Container style={{ width: "100%" }}>
                <Row style={{ 'height': '40vw' }}>
                    <Col className="my-auto" xs={2} style={{ height: "80%" }} >
                        <div ref={btnListRef} className="overflow-auto my-auto questionScroll" style={{ height: "100%", borderRight: 'solid', borderWidth: "1px", borderColor: '#bfbfbf', display: 'inline-block', paddingRight: '3vw', paddingTop: '1vw', paddingBottom: '1vw' }}>

                            {quiz.questions.map((question, idx) => (
                                <>
                                    <Col>
                                        <Button disabled={idx === qno} variant={idx === qno ? 'secondary' : 'primary'} onClick={() => { handleJumpto(idx) }}>{idx + 1}</Button>
                                    </Col>
                                    <div style={{ height: '20px' }}></div>
                                </>
                            ))}
                        </div>
                    </Col>
                    <Col align='center' xs={8} style={{ height: "90%" }}>
                        <Row style={{ height: '40%' }}>
                            <Col className='justify-content-between'>
                                {quiz.status === 'draft' && <Button onClick={handleShowAddQuestion} variant="primary btn-lg" style={{}}>Add Question</Button>}
                            </Col>
                            <Col className='justify-content-between'>
                                {quiz.status === 'draft' && <Button disabled={!question} onClick={handleShowEditQuestion} variant="outline-primary btn-lg" style={{}}>Edit Question</Button>}
                            </Col>
                            <Col className='justify-content-between'>
                                {quiz.status === 'draft' && <Button onClick={handleDeleteQuestion} variant="danger btn-lg" style={{}}>Delete Question</Button>}
                            </Col>
                            {question && <h2>Question {qno + 1}</h2>}
                            <hr />
                            <Card
                                border="dark"
                                bg='Light'
                            >
                                <Card.Body>
                                    <Card.Text>
                                        <h4>{question && question.question}</h4>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>

                        <br />
                        <Row style={{ height: "20%" }}>
                            <Col xs={6}>
                                <Option selected={question && question.answer === 'a'} text={question && question.choices[0]} ></Option>
                            </Col>
                            <Col xs={6}>
                                <Option selected={question && question.answer === 'b'} text={question && question.choices[1]} ></Option>
                            </Col>
                        </Row>
                        <Row style={{ height: "25%" }}>
                            <Col xs={6}>
                                <Option selected={question && question.answer === 'c'} text={question && question.choices[2]} ></Option>
                            </Col>
                            <Col xs={6}>
                                <Option selected={question && question.answer === 'd'} text={question && question.choices[3]} ></Option>
                            </Col>
                        </Row>

                        <Row align='center' style={{ height: '10%' }}>
                            <Col xs={4} ></Col>
                            <Col className="d-flex justify-content-between" xs={4} >
                                <Button variant="primary" onClick={handlePrev} disabled={qno <= 0} style={{ width: "45%" }}><i class="bi bi-caret-left-fill"></i> Previous</Button>
                                <Button variant="primary" onClick={handleNext} disabled={qno === quiz.questions.length - 1} style={{ width: "45%" }} >Next <i class="bi bi-caret-right-fill"></i></Button>
                            </Col>
                            <Col xs={4} ></Col>
                        </Row>

                        <div style={{ height: "4vw" }}></div>

                    </Col>

                    <Col xs={2} >
                    </Col>
                </Row>
            </Container>

            <AddQuestion quizId={qid} show={showAddQuestion} handleClose={handleCloseAddQuestion} ></AddQuestion>

            {question && <EditQuestion quizId={qid} show={showEditQuestion} handleClose={handleCloseEditQuestion} question={question} ></EditQuestion>}
        </div>
    )
}

function Option({ text, selected, onClick }) {
    return (
        <span onClick={(e) => { e.preventDefault(); onClick() }}>
            <Card
                className=""
                border={selected ? "success" : ""}
                bg='Light'
                style={{ marginBottom: "1vw", borderWidth: '3px' }}
            >
                <Card.Body>
                    <Card.Text>
                        {text}
                    </Card.Text>
                </Card.Body>
            </Card>
        </span>
    )

}

/*

        <>
            <Banner isEdit={true}></Banner>

            <div style={{ height: "10vh" }}></div>

            <Container className="row justify-content-center">
                <Col xs={1} md={4} className="g-4">
                    {quiz.status === 'draft' && <Button onClick={handleShowAddQuestion} variant="primary btn-lg" style={{ marginLeft: "10px" }}>Add Question</Button>}
                    <div style={{ height: "3vh" }}></div>
                    {quiz.questions.map((question, idx) => (
                        <>
                            <Col>
                            </Col>
                            <div style={{ height: '20px'}}></div>
                        </>
                        ))}
                </Col>
            </Container>

        </>
*/

export default EditQuiz