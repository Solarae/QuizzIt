import React from 'react'
import { Nav, Navbar, Container, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/authActions'
import { useHistory } from 'react-router-dom'

function AppNavbar() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const history = useHistory()

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to='/'><Navbar.Brand>QuizzIt</Navbar.Brand></LinkContainer>
                <Navbar.Collapse id="responsive-navbar-nav" class='ml-auto'>
                    {auth.isAuthenticated ? 
                    (<Nav.Link onClick={() => dispatch(logout(history))}>Logout</Nav.Link>) 
                    : <LinkContainer to='/signin'><Nav.Link>Sign In</Nav.Link></LinkContainer>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar;

// {auth.isAuthenticated ? (<Button onClick={() => dispatch(logout(history))}>Logout</Button>) 
//                     : <NavbarCollapse id='responsive-navbar-nav'>
//                         <LinkContainer to='/signin'><Nav.Link>Sign In</Nav.Link></LinkContainer>
//                       </NavbarCollapse>}