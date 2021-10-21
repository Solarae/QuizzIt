import React, { useState } from 'react'
import { Container, Form, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { signup } from '../actions/authActions'
import { useHistory } from 'react-router-dom';

function SignUp({ show, handleClose }) {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const history = useHistory()

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const closeModal = () => {
    setValues({ ...values, username: "", email: "", password: "" });
    handleClose();
  }

  const handleSubmit = ((e) => {
    e.preventDefault();

    console.log(values.username);
    if (!values.username || !values.email || !values.password) return;

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
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Username" name="username" onChange={onChange} />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Email" name="email" onChange={onChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );

}


export default SignUp;