import React, { useState } from 'react'
import { Container, Form, Button, Modal, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { editProfile } from '../../actions/profileActions'
import { useHistory } from 'react-router-dom';

function EditProfile({ type, show, handleClose }) {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const history = useHistory()

  const [values, setValues] = useState({
    field: "",
    currentPassword: "" // used if password confirmation needed
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const closeModal = (err) => {
    // check if our request sent back any input errors and display it to user
    if (err) {
      setErrors({ ...err });
      return;
    }

    // else reset state values and close modal 
    setValues({ ...values, field: "", currentPassword: "" });
    setErrors({});
    handleClose();
  }

  const handleSubmit = ((e) => {
    e.preventDefault();

    console.log(type + ", " + values.field);

    if (type === "Username") {
      dispatch(editProfile({
        id: auth.user.id,
        username: values.field,
        history: history,
        callback: closeModal
      }))

    }
    else if (type === "Email") {
      dispatch(editProfile({
        id: auth.user.id,
        email: values.field,
        history: history,
        callback: closeModal
      }))

    }
    else if (type === "Password") {
      dispatch(editProfile({
        id: auth.user.id,
        password: values.field,
        currentPassword: values.currentPassword,
        history: history,
        callback: closeModal
      }))
    }
    else {
      console.log("Error")
    }

  })

  return (
    <Modal style={{ color: "black" }} show={show} onHide={closeModal} >
      <Modal.Header closeButton>
        <Modal.Title>Edit {type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {type === "Password" && (
            <Form.Group className="mb-3" controlId="formBasicField">
              <Form.Label>Current {type} </Form.Label>
              <Form.Control type="password" defaultValue="" placeholder="Current Password" name="currentPassword" onChange={onChange} />
            </Form.Group>

          )}
          <Form.Group className="mb-3" controlId="formBasicField">
            <Form.Label>New {type} </Form.Label>
            <Form.Control type={type==="Password" ? "password" : "field"} defaultValue="" placeholder={type} name="field" onChange={onChange} />
          </Form.Group>
        </Form>
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
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );

}


export default EditProfile;