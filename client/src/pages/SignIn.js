import React, { useState } from 'react'
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux'
import { login } from '../actions/authActions'
import { useHistory, Link } from 'react-router-dom';

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const handleSubmit = ((e) => {
        e.preventDefault();
    
        if (!email || !password) return 
        dispatch(login({ email: email, password: password, history: history }))
    })

    return (
        <Container style={{width:"30%"}} className='mt-5 shadow-sm rounded-lg'>
            <h2 className='text-center m-3'>Sign In</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        onChange={handleEmailChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        onChange={handlePasswordChange}
                    />
                </Form.Group>
                <Button variant="primary" style={{width:"100%"}} className='mb-3' type="submit">
                    Login
                </Button>
            </Form>
            <Link to='/signup'>Don't have an account? Sign Up</Link>
        </Container>
            
    )
}

export default SignIn;