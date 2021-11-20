// import Close from "./times-solid.svg";
import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { editQuiz, uploadImage } from '../../../actions/quizActions';

const EditQuestionModal = ({ quiz, show, setShow }) => {
  const [values, setValues] = useState({
    name: quiz.name,
    description: quiz.description,
    time: quiz.time,
  })
  const [image, setImage] = useState()

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const onImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const closeModal = (err) =>{
    console.log(show)
    setShow(!show)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    setShow(!show)

    dispatch(editQuiz({ 
      id: quiz._id, 
      name: values.name, 
      description: values.description, 
      time: values.time, 
    }))
    if (image) dispatch(uploadImage(quiz._id, image))
  }
 
  return (
    <Modal show={show} onHide = {closeModal}>
      <Modal.Header closeButton> <Modal.Title>Edit Question</Modal.Title> </Modal.Header>
      <Form onSubmit={handleSubmit}>
          <Modal.Body>
              <Form.Group className="mb-3">
                  <Form.Label>Quiz Name</Form.Label>
                  <Form.Control type="text" defaultValue={values.name} name="name" onChange={onChange} required/>
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" defaultValue={values.description} name="description" onChange={onChange} required/>
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="text" defaultValue={values.time} name="time" onChange={onChange}  required/>
              </Form.Group>
              <Form.Group controlId="formBannerFile" className="mb-3">
                  <Form.Label>Quiz Banner</Form.Label>
                  <Form.Control type="file" onChange={onImageChange}/>
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