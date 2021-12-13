import { React, useEffect, useState } from 'react'
import { Container, Col, Button } from 'react-bootstrap';

import Banner from '../components/Quiz/Banner'
import EditQuestionCard from '../components/Question/EditQuestionCard'
import AddQuestion from '../components/Question/AddQuestion'
import NotFound from '../components/NotFound';
import { getQuiz } from '../actions/quizActions'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'


function EditQuiz() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const isLoading = useSelector((state) => state.quiz.isLoading)
    const quiz = useSelector((state) => state.quiz.quiz)
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
        
    if (isLoading) {
        return (<Loading/>)
    }

    const hasWritePermissions = (id) => {
        return id === quiz.owner || id === quiz.platformId.owner 
            || quiz.platformId.subscribers.find(s => s.userId === id && s.role === 'Moderator') !== undefined
            ? true : false  
    }

    if (user == null || !hasWritePermissions(user.id)) 
        return <NotFound/>

    return (
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
                                <EditQuestionCard key={idx} quizId={qid} question={question}></EditQuestionCard>
                            </Col>
                            <div style={{ height: '20px'}}></div>
                        </>
                        ))}
                </Col>
            </Container>

            <AddQuestion quizId={qid} show={showAddQuestion} handleClose={handleCloseAddQuestion}></AddQuestion>
        </>
    )
}

export default EditQuiz