import React, { useContext, useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../actions/authActions'
import { useHistory, Link } from 'react-router-dom';

function SignIn({ show, handleShowSignUp, handleClose }) {
    //   const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory()

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const closeModal = () => {
        setValues({ ...values, email: "", password: "" });
        handleClose();
    }

    const handleSubmit = ((e) => {
        e.preventDefault();

        console.log(values.email);
        if (!values.email || !values.password) return;

        dispatch(login({ email: values.email, password: values.password, history: history, callback: closeModal }))
    })

    const onClickSignUp = () =>{
        setValues({ ...values, email: "", password: "" });
        handleShowSignUp();
    }


    return (
        <Modal style={{ color: "black" }} show={show} onHide={closeModal} >
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" name="email" onChange={onChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} />
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
            <Modal.Footer className="justify-content-between">
            <a href="#" onClick={onClickSignUp} class="link-secondary">Don't have an account? Sign Up</a>
                <Button variant="primary" onClick={handleSubmit}>
                    Sign In
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default SignIn;