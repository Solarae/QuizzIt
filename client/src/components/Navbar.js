import React, { useState } from 'react'
import { Nav, Navbar, Container, Image, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/authActions'
import { useHistory } from 'react-router-dom'

import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import CreatePlatform from './CreatePlatform.js';

function AppNavbar() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const history = useHistory()


  const [showSignIn, setShowSignIn] = useState(false);
  const handleCloseSignIn = () => { setShowSignIn(false) };
  const handleShowSignIn = () => { setShowSignIn(true) };

  const [showSignUp, setShowSignUp] = useState(false);
  const handleCloseSignUp = () => { setShowSignUp(false) };
  const handleShowSignUp = () => { setShowSignIn(false); setShowSignUp(true) };

  const [showCreatePlatform, setShowCreatePlatform] = useState(false);
  const handleCloseCreatePlatform = () => { setShowCreatePlatform(false) };
  const handleShowCreatePlatform = () => { setShowCreatePlatform(true) };

  return (
    <Navbar className="navbar-custom" collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ minWidth: "1300px !important;" }}>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand >
            <img
              alt=""
              src="/quizzit_logo.png"
              width="30px"
              height="30px"
              className="d-inline-block align-top"
            />{' '}
            Quizzit
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Collapse id="responsive-navbar-nav" class='ml-auto'>
          {auth.isAuthenticated ?
            (

              <Nav justify>
                <NavDropdown
                  id="nav-dropdown"
                  title={
                    <div>
                      <Image roundedCircle
                        src="/favicon.ico"
                        alt="user pic"
                        style={{ height: "40px", width: "40px" }}
                      />
                      {auth.user.username}
                    </div>

                  }
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="#"><LinkContainer to='/profile'><Nav.Link className="text-white">View Profile</Nav.Link></LinkContainer></NavDropdown.Item>
                  <NavDropdown.Item href="#"><Nav.Link onClick={handleShowCreatePlatform} className="text-white">Create Platform</Nav.Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className="text-light" onClick={() => dispatch(logout(history))} href="#">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (<Nav.Link onClick={handleShowSignIn} href="">Sign In</Nav.Link>)}
        </Navbar.Collapse>

        <SignIn show={showSignIn} handleShowSignUp={handleShowSignUp} handleClose={handleCloseSignIn} />
        <SignUp show={showSignUp} handleClose={handleCloseSignUp} />
        <CreatePlatform show={showCreatePlatform} handleClose={handleCloseCreatePlatform} />

      </Container>
    </Navbar>
  )
}

export default AppNavbar;

// {auth.isAuthenticated ? (<Button onClick={() => dispatch(logout(history))}>Logout</Button>) 
//                     : <NavbarCollapse id='responsive-navbar-nav'>
//                         <LinkContainer to='/signin'><Nav.Link>Sign In</Nav.Link></LinkContainer>
//                       </NavbarCollapse>}