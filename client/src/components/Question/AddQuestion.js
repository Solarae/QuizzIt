import React, { useState } from 'react'
import { Form, Button, Modal, Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addQuizQuestion } from '../../actions/quizActions'

function AddQuizQuestion({ quizId, show, handleClose }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        question: "",
        option1:"",
        option2:"",
        option3:"",
        option4:"",
        answer:""
    });
    const [optionState,setOptionState] = useState("a")
    
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
        setError()
    }
    const [error,setError] = useState()
    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let optionValues = [] // Currently options exsist as individual k:v pairs in values, get a list of them instead
        options.forEach(x => optionValues.push(values[x]))
        console.log(optionValues)
        let set = new Set()
        if ((values.question === '') || (optionValues.includes(''))) {
            return;
        }

        var bool = true
        optionValues.forEach((choice)=>{
            if(set.has(choice)){
                setError("Choices cannot have the same value")
                bool=false
            }
            set.add(choice)
        })

        if(bool===true)
            dispatch(addQuizQuestion({ id: quizId, question: values.question, choices: optionValues, answer: optionState, callback: closeModal }))
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
                        <Form.Label>Answer:</Form.Label>
                        {/* <Form.Control type="text" placeholder="Answer" name="answer" onChange={onChange} /> */}
                        <Form.Control as="select" value={optionState} onChange={e=> setOptionState(e.target.value)}>
                            <option value="a">Option 1</option>
                            <option value="b">Option 2</option>
                            <option value="c">Option 3</option>
                            <option value="d">Option 4</option>
                        </Form.Control>
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
                {error ? <Form.Text className="text-muted">
                            <Alert variant={'danger'}>
                                {error}
                            </Alert>
                          </Form.Text>:
                          <></>
                }
                <Modal.Footer className="justify-content-between"> 
                    <Button variant="primary" type="submit"> Add </Button> 
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddQuizQuestion;