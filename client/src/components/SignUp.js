import React, { useState } from 'react'
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useDispatch } from 'react-redux'
import { signup } from '../actions/authActions'
import { useHistory } from 'react-router-dom';

function SignUp({ show, handleClose }) {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
  const history = useHistory()

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const closeModal = (err) => {
    if (err) {
      setErrors({ ...err });
      return;
    }
    setValues({ ...values, username: "", email: "", password: "" });
    setErrors({});
    handleClose();
  }

  const handleSubmit = ((e) => {
    e.preventDefault();

    dispatch(signup({
      username: values.username,
      email: values.email,
      password: values.password,
      history: history,
      callback: closeModal
    }))
  })

  return (
    <Modal style={{ color: "black" }} show={show} onHide={closeModal} >
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Username" name="username" onChange={onChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="field" placeholder="Email" name="email" onChange={onChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} />
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
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );

}


export default SignUp;