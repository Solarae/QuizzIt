// import Close from "./times-solid.svg";
import { Form, Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteQuiz } from '../../../actions/quizActions';
import { useHistory } from 'react-router-dom'

const DeleteQuizModal = ({ quiz, show, setShow }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const closeModal = (err) =>{
    setShow(!show)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    setShow(!show)
    let id = quiz.platformId
    dispatch(deleteQuiz({ id:quiz._id }))
    history.push(`/platform/${id}`)
  }

  return (
    <Modal show={show} onHide = {closeModal}>
      <Modal.Header closeButton> <Modal.Title>Edit Question</Modal.Title> </Modal.Header>
      <Form onSubmit={handleSubmit}>
          <Modal.Body>
              Are you sure you want to delete this quiz? This action cannot be undone!
          </Modal.Body>
          <Modal.Footer className="justify-content-between"> 
              <Button variant="primary" type="submit"> Delete </Button> 
          </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeleteQuizModal;