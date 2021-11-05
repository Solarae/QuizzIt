import React, { useContext, useState, useRef, useEffect } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createQuiz } from "../../actions/quizActions";

// custom hook for getting reference to previous values/props
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function CreateQuiz({ show, handleClose }) {
  //   const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const quizErrors = useSelector((state) => state.quiz.errors);
  const isCreateLoading = useSelector((state) => state.quiz.isCreateLoading);
  const prev_isCreateLoading = usePrevious(isCreateLoading);

  let { id } = useParams(); // get the platform id from the url

  const [values, setValues] = useState({
    quizName: "",
    description: "",
    time: "",
  });

  // reset state values when the modal is opened/closed
  useEffect(() => {
    setValues({ quizName: "" });
    setErrors({});
  }, [show]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // waits for DELETE PLATFORM request to update redux store
  useEffect(() => {
    if (!prev_isCreateLoading) {
      return;
    }

    console.log("Create quiz loading: " + isCreateLoading);
    // check if there were errors
    if (quizErrors) {
      setErrors({ ...quizErrors });
      return;
    }

    // close the modal and redirect user to the edit quiz page
    handleClose();
    // history.push(`/`);
  }, [isCreateLoading, history, handleClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createQuiz({
        userId: auth.user.id,
        name: values.quizName,
        description: values.description,
        platformId: id,
        time: "20",
      })
    );
  };

  return (
    <Modal style={{ color: "black" }} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Quiz</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formQuizName">
            <Form.Label>Quiz Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Quiz Name"
              name="quizName"
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Quiz Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder="Quiz Description"
              name="description"
              onChange={onChange}
            />
          </Form.Group>
        </Modal.Body>
        {Object.keys(errors).length > 0 && (
          <Form.Text className="text-muted">
            <Alert variant={"danger"}>
              <ul className="list">
                {Object.values(errors).map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </Alert>
          </Form.Text>
        )}
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateQuiz;
