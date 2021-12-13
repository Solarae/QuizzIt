// import Close from "./times-solid.svg";
import { Form, Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { editQuiz } from '../../../actions/quizActions';

const EditQuizModal = ({ quiz, show, setShow,user,page }) => {
  const dispatch = useDispatch()
 
  const closeModal = (err) =>{
    setShow(!show)
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    setShow(!show)

    dispatch(editQuiz({ 
        id: quiz._id,
        status: 'published'
      }))
  }

  return (
    <Modal show={show} onHide = {closeModal}>
      <Modal.Header closeButton> <Modal.Title>Publish Quiz</Modal.Title> </Modal.Header>
      <Form onSubmit={handleSubmit}>
          <Modal.Body>
              Publishing this quiz will prevent you from editing the quiz timer, adding and deleting questions
          </Modal.Body>
          <Modal.Footer className="justify-content-between"> 
              <Button variant="primary" type="submit"> Publish </Button> 
          </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditQuizModal;