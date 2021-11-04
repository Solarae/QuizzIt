import React, { useState } from 'react'
import { Form, Button, Modal, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addQuizQuestion } from '../../actions/quizActions'
import { useHistory, useParams } from 'react-router-dom'

function AddQuizQuestion({ quizId, show, handleClose }) {
    const dispatch = useDispatch();
    const quiz = useSelector((state) => state.quiz.quiz)
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        question: "",
        option1:"",
        option2:"",
        option3:"",
        option4:"",
        answer:""
    });
    const history = useHistory()

    
    const closeModal = (err) => {
        if (err) {
            setErrors({ ...err })
            return;
        }
        setValues({ 
            ...values, 
            question: "", 
            option1:"", 
            option2:"", 
            option3:"", 
            option4:"", 
            answer:"" 
        });
        setErrors({});
        handleClose();
    }
    
    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(quizId)
        console.log(values)

        let optionValues = [] // Currently options exsist as individual k:v pairs in values, get a list of them instead
        options.forEach(x => optionValues.push(values[x]))
        console.log(optionValues)


        dispatch(addQuizQuestion({ id: quizId, question: values.question, choices: optionValues, answer: values.answer }))
    }
    
    let options = ['option1', 'option2', 'option3', 'option4']
    let optionList = []
    options.forEach((option, index) => {
        optionList.push( 
            <Form.Group className="mb-3">
                <Form.Label>Option {index+1} </Form.Label>
                <Form.Control type="text" placeholder="Option" name={option} onChange={onChange} />
            </Form.Group>
        )
    })
    
    console.log('modal add question')
    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton> <Modal.Title>Add Question</Modal.Title> </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Question</Form.Label>
                        <Form.Control type="text" placeholder="Quesiton" name="question" onChange={onChange} />
                    </Form.Group>
                        {optionList}
                    <Form.Group className="mb-3">
                        <Form.Label>Answer</Form.Label>
                        <Form.Control type="text" placeholder="Answer" name="answer" onChange={onChange} />
                    </Form.Group>
                </Modal.Body>
                {Object.keys(errors).length > 0 && (
                    <Form.Text className="text-muted">
                        <Alert variant={'danger'}>
                            <ul className='list'>
                                {Object.values(errors).map(v => (
                                    <li key={v}>{v}</li>
                                ))}
                            </ul>
                        </Alert>
                    </Form.Text>
                )}
                <Modal.Footer className="justify-content-between"> 
                    <Button variant="primary" type="submit"> Add </Button> 
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddQuizQuestion;