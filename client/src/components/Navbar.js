import React, { useState } from 'react'
import { Nav, Navbar, Container, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/authActions'
import { useHistory } from 'react-router-dom'

import SignUp from './SignUp.js';
import SignIn from './SignIn.js';


function AppNavbar() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory()

    const [values, setValues] = useState({
      showSignIn: false,
      showSignUp: false
    });
  
    const handleCloseSignIn = () => { setValues({ ...values, showSignIn: false }) };
    const handleShowSignIn = () => { setValues({ ...values, showSignIn: true }) };
    const handleCloseSignUp = () => { setValues({ ...values, showSignUp: false }) };
    const handleShowSignUp = () => { setValues({ ...values, showSignUp: true, showSignIn: false }) }; 
    
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to='/'><Navbar.Brand>QuizzIt</Navbar.Brand></LinkContainer>
                <Navbar.Collapse id="responsive-navbar-nav" class='ml-auto'>
                    {auth.isAuthenticated ? 
                    (<Nav.Link onClick={() => dispatch(logout(history))}>Logout</Nav.Link>) 
                    : <Nav.Link onClick={handleShowSignIn} href="">Sign In</Nav.Link>}
                </Navbar.Collapse>
                
                <SignIn show={values.showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} />
                <SignUp show={values.showSignUp} handleClose={handleCloseSignUp} />

            </Container>
        </Navbar>
    )
}

export default AppNavbar;

// {auth.isAuthenticated ? (<Button onClick={() => dispatch(logout(history))}>Logout</Button>) 
//                     : <NavbarCollapse id='responsive-navbar-nav'>
//                         <LinkContainer to='/signin'><Nav.Link>Sign In</Nav.Link></LinkContainer>
//                       </NavbarCollapse>}