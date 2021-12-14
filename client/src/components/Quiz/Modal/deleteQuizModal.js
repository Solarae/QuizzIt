// import Close from "./times-solid.svg";
import { Form, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteQuiz } from '../../../actions/quizActions';
import { useHistory } from 'react-router-dom'
import { deleteManyPlatformReport, deleteManyQuizReport } from '../../../actions/reportActions';

const DeleteQuizModal = ({ quiz, show, setShow,user,page }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const closeModal = (err) =>{
    setShow(!show)
  }
  
  const id = quiz.platformId._id
  const auth = useSelector((state)=>state.auth)
  const handleSubmit = (e) =>{
    e.preventDefault()
    setShow(!show)


    //delete all reports associated with quiz
    dispatch(deleteManyQuizReport(
      {
          userId: auth.user.id,
          quizId: quiz._id,
      }
    ))
    dispatch(deleteQuiz({ 
      id:quiz._id,
      query:{
        userId: user.id,
        expand: 'platformId(select=name),quizId(select=name),submittedBy(select=username)',
        sort: 'timeSubmitted desc',
        offset: 10 * (page - 1),
        limit: 10
      },
      history:history,
      platformId:id
    }))
  }

  return (
    <Modal show={show} onHide = {closeModal}>
      <Modal.Header closeButton> <Modal.Title>Delete Quiz</Modal.Title> </Modal.Header>
      <Form onSubmit={handleSubmit}>
          <Modal.Body>
              Are you sure you want to delete this quiz? This action cannot be undone!
              Deleting this quiz deletes all submissions associated with this quiz.
          </Modal.Body>
          <Modal.Footer className="justify-content-between"> 
              <Button variant="danger" type="submit"> Delete </Button> 
          </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeleteQuizModal;