// import Close from "./times-solid.svg";
import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { editQuiz } from '../../../actions/quizActions';

const EditQuestionModal = ({ quiz, show, setShow }) => {
  const [values, setValues] = useState({
    name: quiz.name,
    description: quiz.description,
    time: quiz.time,
  })
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const closeModal = (err) =>{
    console.log(show)
    setShow(!show)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    setShow(!show)

    console.log(values)

    dispatch(editQuiz({ 
      id: quiz._id, 
      name: values.name, 
      description: values.description, 
      time: values.time, 
    }))
  }


 
  return (
    <Modal show={show} onHide = {closeModal}>
      <Modal.Header closeButton> <Modal.Title>Edit Question</Modal.Title> </Modal.Header>
      <Form onSubmit={handleSubmit}>
          <Modal.Body>
              <Form.Group className="mb-3">
                  <Form.Label>Quiz Name</Form.Label>
                  <Form.Control type="text" defaultValue={values.name} name="name" onChange={onChange} />
              </Form.Group>
                  {/* {optionList} */}
              <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" defaultValue={values.description} name="description" onChange={onChange}  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="text" defaultValue={values.time} name="time" onChange={onChange}  />
              </Form.Group>
          </Modal.Body>
          <Modal.Footer className="justify-content-between"> 
              <Button variant="primary" type="submit"> Save </Button> 
          </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditQuestionModal;