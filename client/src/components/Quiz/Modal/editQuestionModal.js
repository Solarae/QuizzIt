// import Close from "./times-solid.svg";
import { useEffect, useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { editQuiz } from '../../../actions/quizActions';




const EditQuestionModal = ({ quiz,show,setShow }) => {



  let curr_name = quiz.name
  let curr_description = quiz.description
  const [name,setName] = useState(curr_name)
  const [description,setDescription] = useState(curr_description)
  const dispatch = useDispatch();

  const closeModal = (err) =>{
    console.log(show)
    setShow(!show)

  }

  const handleSubmit = (e) =>{

    e.preventDefault()
    setShow(!show)

    console.log(name)
    console.log(description)

    dispatch(editQuiz({ id: quiz._id,description:description,name: name }))

  }


 
  return (
    <Modal show={show} onHide = {closeModal}>
      <Modal.Header closeButton> <Modal.Title>Edit Question</Modal.Title> </Modal.Header>
      <Form onSubmit={handleSubmit}>
          <Modal.Body>
              <Form.Group className="mb-3">
                  <Form.Label>Quiz Name</Form.Label>
                  <Form.Control type="text" defaultValue={curr_name} name="question" onChange={(e)=> setName(e.target.value)} />
              </Form.Group>
                  {/* {optionList} */}
              <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" defaultValue={curr_description} name="answer" onChange={(e)=> setDescription(e.target.value)}  />
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